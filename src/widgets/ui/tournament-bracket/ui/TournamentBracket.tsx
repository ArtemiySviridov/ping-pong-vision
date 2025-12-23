import './TournamentBracket.scss';
import BracketRound from '@/entities/tournament-bracket/ui/round/BracketRound.tsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  type BracketPlayer,
  useTournamentBracketStore,
} from '@/entities/tournament-bracket/model/tournamentBracketStore.ts';
import { useTournamentStore } from '@/entities/tournament/model/tournamentStore.ts';
// const rounds = [
//   // {
//   //   id: 1,
//   //   name: '1/16 финала',
//   //   matches: [
//   //     {
//   //       id: 1,
//   //       players: [
//   //         { id: 1, avatar: 'A', playerName: 'Player 1', score: 2 },
//   //         { id: 2, avatar: 'B', playerName: 'Player 2', score: 1 },
//   //       ],
//   //     },
//   //     {
//   //       id: 2,
//   //       players: [
//   //         { id: 3, avatar: 'C', playerName: 'Player 3', score: 3 },
//   //         { id: 4, avatar: 'D', playerName: 'Player 4', score: 0 },
//   //       ],
//   //     },
//   //     {
//   //       id: 3,
//   //       players: [
//   //         { id: 5, avatar: 'E', playerName: 'Player 5', score: 4 },
//   //         { id: 6, avatar: 'F', playerName: 'Player 6', score: 2 },
//   //       ],
//   //     },
//   //     {
//   //       id: 4,
//   //       players: [
//   //         { id: 7, avatar: 'G', playerName: 'Player 7', score: 1 },
//   //         { id: 8, avatar: 'H', playerName: 'Player 8', score: 3 },
//   //       ],
//   //     },
//   //     {
//   //       id: 5,
//   //       players: [
//   //         { id: 9, avatar: 'I', playerName: 'Player 9', score: 0 },
//   //         { id: 10, avatar: 'J', playerName: 'Player 10', score: 1 },
//   //       ],
//   //     },
//   //     {
//   //       id: 6,
//   //       players: [
//   //         { id: 11, avatar: 'K', playerName: 'Player 11', score: 2 },
//   //         { id: 12, avatar: 'L', playerName: 'Player 12', score: 4 },
//   //       ],
//   //     },
//   //     {
//   //       id: 7,
//   //       players: [
//   //         { id: 13, avatar: 'M', playerName: 'Player 13', score: 3 },
//   //         { id: 14, avatar: 'N', playerName: 'Player 14', score: 1 },
//   //       ],
//   //     },
//   //     {
//   //       id: 8,
//   //       players: [
//   //         { id: 15, avatar: 'O', playerName: 'Player 15', score: 2 },
//   //         { id: 16, avatar: 'P', playerName: 'Player 16', score: 3 },
//   //       ],
//   //     },
//   //
//   //     {
//   //       id: 9,
//   //       players: [
//   //         { id: 17, avatar: 'Q', playerName: 'Player 17', score: 1 },
//   //         { id: 18, avatar: 'R', playerName: 'Player 18', score: 4 },
//   //       ],
//   //     },
//   //     {
//   //       id: 10,
//   //       players: [
//   //         { id: 19, avatar: 'S', playerName: 'Player 19', score: 3 },
//   //         { id: 20, avatar: 'T', playerName: 'Player 20', score: 2 },
//   //       ],
//   //     },
//   //     {
//   //       id: 11,
//   //       players: [
//   //         { id: 21, avatar: 'U', playerName: 'Player 21', score: 0 },
//   //         { id: 22, avatar: 'V', playerName: 'Player 22', score: 1 },
//   //       ],
//   //     },
//   //     {
//   //       id: 12,
//   //       players: [
//   //         { id: 23, avatar: 'W', playerName: 'Player 23', score: 2 },
//   //         { id: 24, avatar: 'X', playerName: 'Player 24', score: 3 },
//   //       ],
//   //     },
//   //     {
//   //       id: 13,
//   //       players: [
//   //         { id: 25, avatar: 'Y', playerName: 'Player 25', score: 4 },
//   //         { id: 26, avatar: 'Z', playerName: 'Player 26', score: 2 },
//   //       ],
//   //     },
//   //     {
//   //       id: 14,
//   //       players: [
//   //         { id: 27, avatar: 'AA', playerName: 'Player 27', score: 1 },
//   //         { id: 28, avatar: 'AB', playerName: 'Player 28', score: 3 },
//   //       ],
//   //     },
//   //     {
//   //       id: 15,
//   //       players: [
//   //         { id: 29, avatar: 'AC', playerName: 'Player 29', score: 0 },
//   //         { id: 30, avatar: 'AD', playerName: 'Player 30', score: 1 },
//   //       ],
//   //     },
//   //     {
//   //       id: 16,
//   //       players: [
//   //         { id: 31, avatar: 'AE', playerName: 'Player 31', score: 2 },
//   //         { id: 32, avatar: 'AF', playerName: 'Player 32', score: 4 },
//   //       ],
//   //     },
//   //   ],
//   // },
//
//   {
//     id: 2,
//     name: '1/8 финала',
//     matches: [
//       {
//         id: 1,
//         players: [
//           { id: 2, avatar: 'B', playerName: 'Player 2', score: 1 },
//           { id: 3, avatar: 'C', playerName: 'Player 3', score: 3 },
//         ],
//       },
//       {
//         id: 2,
//         players: [
//           { id: 5, avatar: 'E', playerName: 'Player 5', score: 2 },
//           { id: 8, avatar: 'H', playerName: 'Player 8', score: 4 },
//         ],
//       },
//       {
//         id: 3,
//         players: [
//           { id: 10, avatar: 'J', playerName: 'Player 10', score: 1 },
//           { id: 12, avatar: 'L', playerName: 'Player 12', score: 2 },
//         ],
//       },
//       {
//         id: 4,
//         players: [
//           { id: 13, avatar: 'M', playerName: 'Player 13', score: 3 },
//           { id: 16, avatar: 'P', playerName: 'Player 16', score: 1 },
//         ],
//       },
//
//       {
//         id: 5,
//         players: [
//           { id: 18, avatar: 'R', playerName: 'Player 18', score: 2 },
//           { id: 19, avatar: 'S', playerName: 'Player 19', score: 3 },
//         ],
//       },
//       {
//         id: 6,
//         players: [
//           { id: 22, avatar: 'V', playerName: 'Player 22', score: 1 },
//           { id: 24, avatar: 'X', playerName: 'Player 24', score: 4 },
//         ],
//       },
//       {
//         id: 7,
//         players: [
//           { id: 25, avatar: 'Y', playerName: 'Player 25', score: 0 },
//           { id: 28, avatar: 'AB', playerName: 'Player 28', score: 2 },
//         ],
//       },
//       {
//         id: 8,
//         players: [
//           { id: 30, avatar: 'AD', playerName: 'Player 30', score: 1 },
//           { id: 32, avatar: 'AF', playerName: 'Player 32', score: 3 },
//         ],
//       },
//     ],
//   },
//
//   {
//     id: 3,
//     name: '1/4 финала',
//     matches: [
//       {
//         id: 1,
//         players: [
//           { id: 3, avatar: 'C', playerName: 'Player 3', score: 2 },
//           { id: 8, avatar: 'H', playerName: 'Player 8', score: 3 },
//         ],
//       },
//       {
//         id: 2,
//         players: [
//           { id: 12, avatar: 'L', playerName: 'Player 12', score: 1 },
//           { id: 13, avatar: 'M', playerName: 'Player 13', score: 4 },
//         ],
//       },
//       {
//         id: 3,
//         players: [
//           { id: 19, avatar: 'S', playerName: 'Player 19', score: 3 },
//           { id: 24, avatar: 'X', playerName: 'Player 24', score: 2 },
//         ],
//       },
//       {
//         id: 4,
//         players: [
//           { id: 28, avatar: 'AB', playerName: 'Player 28', score: 1 },
//           { id: 32, avatar: 'AF', playerName: 'Player 32', score: 3 },
//         ],
//       },
//     ],
//   },
//
//   {
//     id: 4,
//     name: '1/2 финала',
//     matches: [
//       {
//         id: 1,
//         players: [
//           { id: 8, avatar: 'H', playerName: 'Player 8', score: 2 },
//           { id: 13, avatar: 'M', playerName: 'Player 13', score: 3 },
//         ],
//       },
//       {
//         id: 2,
//         players: [
//           { id: 19, avatar: 'S', playerName: 'Player 19', score: 0 },
//           { id: 32, avatar: 'AF', playerName: 'Player 32', score: 4 },
//         ],
//       },
//     ],
//   },
//
//   {
//     id: 5,
//     name: 'Финал',
//     matches: [
//       {
//         id: 1,
//         players: [
//           { id: 13, avatar: 'M', playerName: 'Player 13', score: 2 },
//           { id: 32, avatar: 'AF', playerName: 'Player 32', score: 3 },
//         ],
//       },
//     ],
//   },
//
//   {
//     id: 6,
//     name: 'Победитель',
//     matches: [
//       {
//         id: 1,
//         players: [{ id: 32, avatar: 'AF', playerName: 'Player 32', score: 3 }],
//       },
//     ],
//   },
// ];

// const players: BracketPlayer[] = Array.from({ length: 16 }, (_, i) => ({
//   id: `${i + 1}`,
//   playerName: `Игрок ${i + 1}`,
//   avatar: `I${i + 1}`,
//   score: 1,
// }));

const TournamentBracket = () => {
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { rounds, generateBracket } = useTournamentBracketStore();
  const { tournamentInfo } = useTournamentStore();
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsGrabbing(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  useEffect(() => {
    if (!tournamentInfo?.players?.length) return;

    const bracketPlayers: BracketPlayer[] = tournamentInfo.players.map(
      (player) => ({
        id: player.id,
        playerName: player.fullName,
        avatar: player.avatar.alter,
        score: 0, // стартовый счёт
      }),
    );

    generateBracket(bracketPlayers);
  }, [tournamentInfo, generateBracket]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isGrabbing || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };

  const handleMouseLeave = () => {
    setIsGrabbing(false);
  };

  let prevGap = 0;
  const getOffset = (baseMargin: number) => {
    const margin = prevGap * 2 + 80;
    if (prevGap === 0) {
      prevGap = baseMargin;
      return baseMargin;
    }
    prevGap = margin;
    return margin;
  };

  return (
    <div
      className="tournament-bracket"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: isGrabbing ? 'grabbing' : 'grab',
        userSelect: 'none',
        scrollBehavior: 'auto',
      }}
    >
      {rounds.map((round, index) => (
        <Fragment key={round.id}>
          <BracketRound {...round} offset={getOffset(20)} />
          {index < rounds.length - 1 && (
            <BracketConnector
              matchesCount={round.matches.length}
              matchHeight={80}
              gap={prevGap}
              pairIndex={index}
              roundIndex={index}
              roundsCount={rounds.length}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default TournamentBracket;

interface BracketConnectorProps {
  matchHeight: number; // высота одного матча
  gap: number; // вертикальный промежуток между матчами
  pairIndex: number; // индекс пары (0,1,2…)
  lineLength?: number; // длина горизонтальных линий
  matchesCount: number; // количество матчей в паре
  roundIndex: number; // индекс раунда
  roundsCount: number; // количество раундов
}

export const BracketConnector: React.FC<BracketConnectorProps> = ({
  matchHeight,
  gap,
  pairIndex,
  lineLength = 30,
  matchesCount,
  roundIndex,
  roundsCount,
}) => {
  // Центр верхнего матча
  const topCenter = pairIndex * (matchHeight + gap) + matchHeight / 2;

  // Центр нижнего матча
  const bottomCenter = topCenter + matchHeight + gap;

  // Центр итоговой вертикальной линии
  const midCenter = (topCenter + bottomCenter) / 2;

  // SVG высота = от верхнего центра до нижнего центра
  const svgHeight = bottomCenter - topCenter;

  const nextRoundMatches = matchesCount / 2;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      <h2 style={{ height: '20px' }}></h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: `${matchHeight + gap}px`,
        }}
      >
        {Array.from({ length: nextRoundMatches }).map((_, i) => {
          const isLast = roundIndex === roundsCount - 1;

          if (isLast) {
            // Только горизонтальная линия
            return (
              <svg
                key={i}
                width={lineLength + 20}
                height={matchHeight}
                style={{ overflow: 'visible' }}
              >
                <line
                  x1={0}
                  y1={matchHeight / 2}
                  x2={lineLength + 20}
                  y2={matchHeight / 2}
                  stroke="#d7dce6"
                  strokeWidth="2"
                />
              </svg>
            );
          }
          return (
            <svg
              key={i}
              width={lineLength + 20}
              height={svgHeight}
              style={{ overflow: 'visible' }}
            >
              {/* Горизонтальная линия от верхнего матча */}
              <line
                x1={0}
                y1={topCenter - topCenter} // нормализуем относительно svg
                x2={lineLength}
                y2={topCenter - topCenter}
                stroke="var(--color-border)"
                strokeWidth="2"
              />

              {/* Горизонтальная линия от нижнего матча */}
              <line
                x1={0}
                y1={bottomCenter - topCenter}
                x2={lineLength}
                y2={bottomCenter - topCenter}
                stroke="var(--color-border)"
                strokeWidth="2"
              />

              {/* Вертикальная линия между верхним и нижним центрами */}
              <line
                x1={lineLength}
                y1={topCenter - topCenter}
                x2={lineLength}
                y2={bottomCenter - topCenter}
                stroke="var(--color-border)"
                strokeWidth="2"
              />

              {/* Горизонтальная линия от вертикальной — в текущий матч */}
              <line
                x1={lineLength}
                y1={midCenter - topCenter}
                x2={lineLength + 20}
                y2={midCenter - topCenter}
                stroke="var(--color-border)"
                strokeWidth="2"
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
};
