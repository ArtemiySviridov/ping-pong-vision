import './MatchStatistics.scss';
import StatsProgressBar from '@/shared/ui/stats-progress-bar';
import AvatarWithName from '@/shared/ui/AvatarWithName';

const data = [
  {
    id: '1',
    title: 'Общее количество ударов',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '2',
    title: 'Количество форхенд ударов',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '3',
    title: 'Количество бэкхенд ударов',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '4',
    title: 'Количество виннеров',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '5',
    title: 'Общее количество ошибок',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '6',
    title: 'Ошибок в сетку',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '7',
    title: 'Ошибок в аут',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '8',
    title: 'Количество пропусков',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '9',
    title: 'Касание стола',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '10',
    title: 'Общее количество розыгрышей',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '11',
    title: 'Количество длинных розыгрышей',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
  },
  {
    id: '12',
    title: 'Максимальная длина розыгрыша',
    firstPlayerScore: 17,
    secondPlayerScore: 40,
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
