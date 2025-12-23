import './MatchStatistics.scss';
import StatsProgressBar from '@/shared/ui/stats-progress-bar';
import AvatarWithName from '@/shared/ui/AvatarWithName';

const data = [
  {
    id: '1',
    title: 'Общее количество ударов',
    firstPlayerScore: 23,
    secondPlayerScore: 40,
  },
  {
    id: '2',
    title: 'Количество форхенд ударов',
    firstPlayerScore: 15,
    secondPlayerScore: 33,
  },
  {
    id: '3',
    title: 'Количество бэкхенд ударов',
    firstPlayerScore: 28,
    secondPlayerScore: 12,
  },
  {
    id: '4',
    title: 'Количество виннеров',
    firstPlayerScore: 33,
    secondPlayerScore: 15,
  },
  {
    id: '5',
    title: 'Общее количество ошибок',
    firstPlayerScore: 20,
    secondPlayerScore: 40,
  },
  {
    id: '6',
    title: 'Ошибок в сетку',
    firstPlayerScore: 14,
    secondPlayerScore: 35,
  },
  {
    id: '7',
    title: 'Ошибок в аут',
    firstPlayerScore: 21,
    secondPlayerScore: 44,
  },
  {
    id: '8',
    title: 'Количество пропусков',
    firstPlayerScore: 22,
    secondPlayerScore: 16,
  },
  {
    id: '9',
    title: 'Касание стола',
    firstPlayerScore: 17,
    secondPlayerScore: 45,
  },
  {
    id: '10',
    title: 'Общее количество розыгрышей',
    firstPlayerScore: 12,
    secondPlayerScore: 33,
  },
  {
    id: '11',
    title: 'Количество длинных розыгрышей',
    firstPlayerScore: 25,
    secondPlayerScore: 10,
  },
  {
    id: '12',
    title: 'Максимальная длина розыгрыша',
    firstPlayerScore: 20,
    secondPlayerScore: 4,
  },
];

const MatchStatistics = () => {
  return (
    <div className="match-statistics">
      <div className="match-statistics__opponents">
        <AvatarWithName
          name="Дмитриева Екатерина Сергеевна"
          namePosition="bottom"
          avatarContent="ДС"
          avatarSize="small"
          textStyle="sm-medium"
        />
        <AvatarWithName
          name="Медведева Ольга Викторовна"
          namePosition="bottom"
          avatarContent="ОМ"
          avatarSize="small"
          textStyle="sm-medium"
        />
      </div>
      <div className="match-statistics__stats">
        {data.map((item) => (
          <div className="match-statistics__stats-item" key={item.id}>
            <StatsProgressBar
              title={item.title}
              firstPlayerScore={item.firstPlayerScore}
              secondPlayerScore={item.secondPlayerScore}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchStatistics;
