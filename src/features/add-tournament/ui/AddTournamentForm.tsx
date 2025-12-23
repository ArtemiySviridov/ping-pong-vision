import './AddTournamentForm.scss';
import AddTournamentFields, {
  type TournamentFormData,
} from '@/features/add-tournament/ui/AddTournamentFields.tsx';
import TournamentParticipantsPicker from '@/features/add-tournament/ui/TournamentParticipantsPicker.tsx';
import { useTournamentStore } from '@/entities/tournament/model/tournamentStore.ts';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Button from '@/shared/ui/Button';
import { toast } from 'react-toastify';

interface Participant {
  id: string;
  fullName: string;
  avatar: {
    path: null;
    alter: string;
  };
}

// Вспомогательная функция для парсинга даты в формате dd.mm.yyyy
const parseRuDate = (dateStr: string): Date | undefined => {
  if (!dateStr) return undefined;
  const trimmed = dateStr.trim();
  const parts = trimmed.split('.');
  if (parts.length !== 3) return undefined;

  const [day, month, year] = parts.map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return undefined;

  // month в Date начинается с 0
  const date = new Date(year, month - 1, day);

  // Проверка на валидность (избежание переполнения, например 32.13.2025)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
};

const AddTournamentForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { addTournament, updateTournament, getTournamentById } =
    useTournamentStore();

  const tournament = id ? getTournamentById(id) : null;

  const [formData, setFormData] = useState<TournamentFormData>({
    tournamentName: '',
    dates: undefined,
    category: 'newbie',
    status: 'planned',
  });
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleFormDataChange = (newData: Partial<TournamentFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleParticipantsChange = (newParticipants: Participant[]) => {
    setParticipants(newParticipants);
  };

  const handleSubmit = () => {
    if (
      !formData.tournamentName ||
      !formData.dates?.from ||
      !formData.dates?.to
    ) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    if (![4, 8, 16, 32].includes(participants.length)) {
      toast.error('Количество участников должно быть 4, 8, 16 или 32');
      return;
    }

    const formattedDates = `${formData.dates.from.toLocaleDateString(
      'ru-RU',
    )} - ${formData.dates.to.toLocaleDateString('ru-RU')}`;

    const tournamentData = {
      id: isEditMode && id ? id : crypto.randomUUID(),
      tournamentName: formData.tournamentName,
      dates: formattedDates,
      playersValue: participants.length,
      status: {
        id: formData.status,
        name:
          formData.status === 'planned'
            ? 'запланирован'
            : formData.status === 'active'
              ? 'активен'
              : formData.status === 'over'
                ? 'завершен'
                : 'отменен',
      },
      category: formData.category === 'newbie' ? 'Любители' : 'Профессионалы',
      participants,
    };

    if (isEditMode) {
      updateTournament(tournamentData);
    } else {
      addTournament(tournamentData);
    }

    navigate('/tournament-calendar');
  };

  useEffect(() => {
    if (!isEditMode || !tournament) return;

    const [fromStr, toStr] = tournament.dates.split(' - ');

    const from = parseRuDate(fromStr);
    const to = parseRuDate(toStr);

    setFormData({
      tournamentName: tournament.tournamentName,
      dates: {
        from: from || undefined,
        to: to || undefined,
      },
      category: tournament.category === 'Любители' ? 'newbie' : 'pro',
      status: tournament.status.id,
    });

    setParticipants(tournament.participants ?? []);
  }, [isEditMode, tournament]);

  return (
    <div className="add-tournament-form">
      <AddTournamentFields
        formData={formData}
        onChange={handleFormDataChange}
      />
      <TournamentParticipantsPicker
        participants={participants}
        onChange={handleParticipantsChange}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '20px',
        }}
        className="add-tournament-form__actions"
      >
        <Button
          size="small"
          variant="secondary"
          text="Отмена"
          onClick={() => navigate('/tournament-calendar')}
        />
        <Button
          size="small"
          variant="primary"
          text={isEditMode ? 'Сохранить турнир' : 'Добавить турнир'}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddTournamentForm;
