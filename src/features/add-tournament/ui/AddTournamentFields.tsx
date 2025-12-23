import './AddTournamentFields.scss';
import Input from '@/shared/ui/Input';
import SimpleSelect from '@/shared/ui/select';
import DatePicker from '@/shared/ui/date-picker/DatePicker';
import type { DateRange } from 'react-day-picker';

export type StatusVariant =
  | 'active'
  | 'cancelled'
  | 'planned'
  | 'over'
  | 'win'
  | 'lose'
  | 'pending'
  | 'blocked';

export type TournamentFormData = {
  tournamentName: string;
  dates?: DateRange;
  category: string;
  status: string;
};

interface AddTournamentFieldsProps {
  formData: TournamentFormData;
  onChange: (data: Partial<TournamentFormData>) => void;
}

const AddTournamentFields = ({
  formData,
  onChange,
}: AddTournamentFieldsProps) => {
  const categoriesOptions = [
    { id: 'newbie', name: 'Любители' },
    { id: 'pro', name: 'Профессионалы' },
  ];

  const statusesOptions = [
    { id: 'active', name: 'Активен' },
    { id: 'planned', name: 'Запланирован' },
    { id: 'over', name: 'Завершен' },
    { id: 'cancelled', name: 'Отменен' },
  ];

  return (
    <div className="add-tournament-fields">
      <Input
        type="text"
        value={formData.tournamentName}
        name="name"
        onChange={(e) => onChange({ tournamentName: e.target.value })}
        label="Количество матчей"
        placeholder="Зимний турнир 2026"
      />
      <DatePicker
        mode="range"
        value={formData.dates}
        onChange={(range) => onChange({ dates: range })}
      />
      <SimpleSelect
        value={formData.category}
        label="Категория"
        options={categoriesOptions}
        onChange={(value) => onChange({ category: value as string })}
      />
      <SimpleSelect
        value={formData.status}
        label="Статус"
        options={statusesOptions}
        onChange={(value) => onChange({ status: value as string })}
      />
    </div>
  );
};

export default AddTournamentFields;
