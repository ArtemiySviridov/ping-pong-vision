import './TournamentParticipantsPicker.scss';
import Input from '@/shared/ui/Input';
import AvatarWithName from '@/shared/ui/AvatarWithName';
import Button from '@/shared/ui/Button';
import MessagePanel from '@/shared/ui/MessagePanel';
import { useState } from 'react';

interface Participant {
  id: string;
  fullName: string;
  avatar: {
    path: null;
    alter: string;
  };
}

interface TournamentParticipantsPickerProps {
  participants: Participant[];
  onChange: (participants: Participant[]) => void;
}

const TournamentParticipantsPicker = ({
  participants,
  onChange,
}: TournamentParticipantsPickerProps) => {
  const allPlayers = {
    name: 'Осенний турнир 2025 | Профессионалы',
    status: {
      id: 'active',
      name: 'Активен',
    },
    dates: '14.01.2025 - 16.01.2025',
    winner: {
      id: '1',
      fullName: 'Иванов Иван Иванович',
      avatar: {
        path: null,
        alter: 'ИИ',
      },
    },
    players: [
      {
        id: '1',
        fullName: 'Смирнов Алексей Петрович',
        avatar: {
          path: null,
          alter: 'СА',
        },
      },
      {
        id: '2',
        fullName: 'Кузнецова Анна Сергеевна',
        avatar: {
          path: null,
          alter: 'КА',
        },
      },
      {
        id: '3',
        fullName: 'Попов Дмитрий Владимирович',
        avatar: {
          path: null,
          alter: 'ПД',
        },
      },
      {
        id: '4',
        fullName: 'Васильева Екатерина Игоревна',
        avatar: {
          path: null,
          alter: 'ВЕ',
        },
      },
      {
        id: '5',
        fullName: 'Новиков Максим Александрович',
        avatar: {
          path: null,
          alter: 'НМ',
        },
      },
      {
        id: '6',
        fullName: 'Федорова Ольга Дмитриевна',
        avatar: {
          path: null,
          alter: 'ФО',
        },
      },
      {
        id: '7',
        fullName: 'Морозов Сергей Викторович',
        avatar: {
          path: null,
          alter: 'МС',
        },
      },
      {
        id: '8',
        fullName: 'Волкова Мария Алексеевна',
        avatar: {
          path: null,
          alter: 'ВМ',
        },
      },
      {
        id: '9',
        fullName: 'Лебедев Павел Олегович',
        avatar: {
          path: null,
          alter: 'ЛП',
        },
      },
      {
        id: '10',
        fullName: 'Соколова Татьяна Юрьевна',
        avatar: {
          path: null,
          alter: 'СТ',
        },
      },
      {
        id: '11',
        fullName: 'Козлов Андрей Николаевич',
        avatar: {
          path: null,
          alter: 'КА',
        },
      },
      {
        id: '12',
        fullName: 'Павлова Ирина Васильевна',
        avatar: {
          path: null,
          alter: 'ПИ',
        },
      },
      {
        id: '13',
        fullName: 'Семенов Артем Геннадьевич',
        avatar: {
          path: null,
          alter: 'СА',
        },
      },
      {
        id: '14',
        fullName: 'Голубева Надежда Романовна',
        avatar: {
          path: null,
          alter: 'ГН',
        },
      },
      {
        id: '15',
        fullName: 'Киселев Владимир Михайлович',
        avatar: {
          path: null,
          alter: 'КВ',
        },
      },
    ],
  };

  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [selectedParticipantId, setSelectedParticipantId] = useState<
    string | null
  >(null);

  const handleAddPlayer = () => {
    if (!selectedPlayerId) return;

    const playerToAdd = allPlayers.players.find(
      (p) => p.id === selectedPlayerId,
    );

    if (playerToAdd && !participants.some((p) => p.id === playerToAdd.id)) {
      onChange([...participants, playerToAdd]);
    }

    setSelectedPlayerId(null);
  };

  const handleRemoveParticipant = () => {
    if (!selectedParticipantId) return;

    onChange(participants.filter((p) => p.id !== selectedParticipantId));
    setSelectedParticipantId(null);
  };

  const handleSelectPlayer = (playerId: string) => {
    setSelectedPlayerId((prev) => (prev === playerId ? null : playerId));
  };

  const handleSelectParticipant = (participantId: string) => {
    setSelectedParticipantId((prev) =>
      prev === participantId ? null : participantId,
    );
  };

  const availablePlayers = allPlayers.players.filter(
    (player) => !participants.some((p) => p.id === player.id),
  );

  return (
    <div className="tournament-participants-picker">
      <div className="tournament-participants-picker__picker">
        <div className="tournament-participants-picker__all-users">
          <h2 style={{ marginBottom: '16px' }} className="text-lg-medium">
            Все пользователи
          </h2>
          <Input type="search" placeholder="Поиск" />
          {availablePlayers.length > 0 ? (
            <div className="tournament-participants-picker__all-users__users-list">
              {availablePlayers.map((player) => (
                <div
                  key={player.id}
                  className={`tournament-participants-picker__all-users__users-list__user ${
                    selectedPlayerId === player.id ? 'selected' : ''
                  }`}
                  onClick={() => handleSelectPlayer(player.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <AvatarWithName
                    name={player.fullName}
                    namePosition="right"
                    avatarSize="small"
                    textStyle="sm-medium"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="tournament-participants-picker__all-users__no-content-message">
              <MessagePanel
                message="Нет игроков зарегестрированных в системе"
                iconMood="sad"
              />
            </div>
          )}
          <Button
            size="small"
            variant="secondary"
            text="Добавить"
            onClick={handleAddPlayer}
            disabled={!selectedPlayerId}
          />
        </div>

        <div className="tournament-participants-picker__participants">
          <h2 style={{ marginBottom: '16px' }} className="text-lg-medium">
            Участники ({participants.length})
          </h2>
          <Input type="search" placeholder="Поиск" />
          {participants.length !== 0 ? (
            <div className="tournament-participants-picker__participants__participants-list">
              {participants.map((player) => (
                <div
                  key={player.id}
                  className={`tournament-participants-picker__all-users__users-list__user ${
                    selectedParticipantId === player.id ? 'selected' : ''
                  }`}
                  onClick={() => handleSelectParticipant(player.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <AvatarWithName
                    name={player.fullName}
                    namePosition="right"
                    avatarSize="small"
                    textStyle="sm-medium"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="tournament-participants-picker__participants__no-content-message">
              <MessagePanel
                message="Нет игроков зарегестрированных в системе"
                iconMood="sad"
              />
            </div>
          )}

          <Button
            size="small"
            variant="primary"
            text="Удалить"
            onClick={handleRemoveParticipant}
            disabled={!selectedParticipantId}
          />
        </div>
      </div>
    </div>
  );
};

export default TournamentParticipantsPicker;
