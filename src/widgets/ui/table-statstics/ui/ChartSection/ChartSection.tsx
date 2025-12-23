import './ChartSection.scss';
import ButtonGroup from '@/shared/ui/ButtonGroup';
import Chart from '@/shared/ui/Chart';
import Card from '@/shared/ui/Card';
import { useEffect, useState } from 'react';
import { useTableAvailabilityStore } from '@/entities/match/model/tableAvailabilityStore.ts';
import Loader from '@/shared/ui/loader';

export const ChartSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('day');
  const fetchMatchesInPeriod = useTableAvailabilityStore(
    (state) => state.fetchMatchesInPeriod,
  );
  const matchesInPeriod = useTableAvailabilityStore(
    (state) => state.matchesInPeriod,
  );

  const fetchExtraStats = useTableAvailabilityStore(
    (state) => state.fetchExtraStats,
  );

  const isMatchesInPeriodLoading = useTableAvailabilityStore(
    (state) => state.isMatchesInPeriodLoading,
  );
  const extraStats = useTableAvailabilityStore((state) => state.extraStats);

  useEffect(() => {
    fetchMatchesInPeriod(selectedPeriod);
    fetchExtraStats();
  }, [selectedPeriod, fetchMatchesInPeriod]);

  const periodOptions = [
    { value: 'year', label: 'Г' },
    { value: 'month', label: 'М' },
    { value: 'week', label: 'Н' },
    { value: 'day', label: 'Д' },
  ];

  // if (isExtraStatsLoading) {
  //   return (
  //     <div className="chart-section__info-cards__card">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className="chart-section">
      <h3 className="text-lg-medium">Статистика загруженности стола</h3>
      <div className="chart-section__chart-settings">
        <ButtonGroup
          options={periodOptions}
          value={selectedPeriod}
          onChange={setSelectedPeriod}
        />
      </div>
      <div className="chart-section__chart-wrapper">
        {isMatchesInPeriodLoading ? (
          <div className="chart-section__chart loading">
            <Loader />
          </div>
        ) : (
          <div className="chart-section__chart">
            <Chart
              key={selectedPeriod}
              data={matchesInPeriod?.data}
              labels={matchesInPeriod?.labels}
            />
          </div>
        )}
        <div className="chart-section__info-cards">
          <div className="chart-section__info-cards__card">
            <Card
              type="stats-l"
              title="Топ самых загруженных дней недели"
              text={extraStats?.topDays.join(', ') || 'Нет данных'}
            />
          </div>

          <div className="chart-section__info-cards__card">
            <Card
              type="stats-l"
              title="Пиковая нагрузка"
              text={extraStats?.topPeriod || 'Нет данных'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
