import './AddTournamentWidget.scss';
import BreadCrumbs from '@/widgets/ui/bread-crumbs';
import { CircleAlert } from 'lucide-react';
import AddTournamentForm from '@/features/add-tournament';
import { useParams } from 'react-router';

const AddTournamentWidget = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  return (
    <div className="add-tournament-widget">
      <BreadCrumbs
        items={[
          { label: 'Турнирный календарь', href: '/tournament-calendar' },
          {
            label: isEditMode ? 'Редактирование турнира' : 'Добавление турнира',
          },
        ]}
      />
      <div className="add-tournament-widget__form">
        <h2 className="text-lg-medium">
          {isEditMode
            ? 'Форма редактирование турнира'
            : 'Форма добавления турнира'}
        </h2>
        <span className="add-tournament-widget__form__users-count-warn">
          <CircleAlert size={18} strokeWidth={1.9} />
          Для добавления турнира необходимо добавить 4/8/16/32 участника
        </span>
        <AddTournamentForm />
      </div>
    </div>
  );
};

export default AddTournamentWidget;
