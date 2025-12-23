import './LineColumn.scss';

const LineColumn = ({
  matchesCount, // количество матчей в ТЕКУЩЕМ раунде (слева)
  matchHeight = 80,
  gap,
  roundIndex,
}: {
  matchesCount: number;
  matchHeight?: number;
  gap: number;
  roundIndex: number;
}) => {
  // В следующем раунде матчей в 2 раза меньше
  const nextRoundMatches = matchesCount / 2;

  // Высота одного матча + отступ снизу
  const blockHeight = matchHeight + gap;

  return (
    <div className="lines-column-wrapper">
      <div className="round-label"></div>
      <div className="lines-column">
        {Array.from({ length: nextRoundMatches }).map((_, i) => {
          // Индекс пары матчей: 0-1, 2-3, 4-5 и т.д.
          const pairIndex = i * 2;

          let topMatchCenter = 0;
          let bottomMatchCenter = 0;

          if (roundIndex === 0) {
            topMatchCenter = pairIndex * blockHeight + matchHeight / 2;
            bottomMatchCenter = (pairIndex + 1) * blockHeight + matchHeight / 2;
          } else {
            topMatchCenter =
              pairIndex * blockHeight + matchHeight / 2 + gap / 2 - 10;
            bottomMatchCenter = blockHeight + topMatchCenter;
          }

          const lineTop = topMatchCenter;
          const lineHeight = bottomMatchCenter - topMatchCenter;

          const horizontalTop = topMatchCenter + lineHeight / 2 - 1; // -1 чтобы центрировать по высоте

          return (
            <div key={i} className="connector-group">
              {/* Вертикальная линия между двумя матчами */}
              <div
                className="line-connector vertical"
                style={{
                  top: `${lineTop}px`,
                  height: `${lineHeight}px`,
                }}
              />

              {/* Горизонтальная линия вправо к следующему раунду */}
              <div
                className="line-connector horizontal"
                style={{
                  top: `${horizontalTop}px`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LineColumn;
