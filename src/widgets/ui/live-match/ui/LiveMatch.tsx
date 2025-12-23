import './LiveMatch.scss';
import { useLiveStore } from '@/entities/live/model/liveStore.ts';
import AvatarWithName from '@/shared/ui/AvatarWithName';
import { useEffect } from 'react';
const LiveMatch = () => {
  const webRTCUrl = useLiveStore((state) => state.liveLink);
  const hlsUrl = `${webRTCUrl.replace(/\/$/, '')}/index.m3u8`;
  const fetchLiveStats = useLiveStore((s) => s.fetchLiveStats);
  const liveStats = useLiveStore((s) => s.liveStats);

  useEffect(() => {
    // первый запрос сразу
    fetchLiveStats();

    // дальше — по интервалу
    const intervalId = setInterval(() => {
      fetchLiveStats();
    }, 1000); // 5 секунд

    // cleanup — ОБЯЗАТЕЛЕН
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchLiveStats]);

  return (
    <div className="live-match">
      <div className="live-match__translation">
        <h2 className="text-lg-medium">Трансляция матча</h2>
        <video controls autoPlay muted playsInline width="100%" height="auto">
          <source src={hlsUrl} type="application/x-mpegURL" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>
      <div className="live-match__match-info">
        <div className="live-match__match-info__title">
          <h2 className="text-lg-medium">Любительский матч</h2>
          <div className="live-match__match-info__title__live-label text-xs-medium">
            live
          </div>
        </div>
        <div className="live-match__match-info__set-info">
          <h3 className="text-md-semibold">{liveStats?.set?.label}</h3>
          <div className="live-match__match-info__set-info__players-score">
            <AvatarWithName
              name={liveStats?.player1?.fullName ?? ''}
              namePosition="bottom"
              avatarSize="small"
              textStyle="sm-medium"
              src={liveStats?.player1?.avatar?.path}
              alter={liveStats?.player1?.avatar?.alter}
            />
            <div className="live-match__match-info__set-info__players-score__score text-lg-medium">
              {liveStats?.set?.score}
            </div>
            <AvatarWithName
              name={liveStats?.player2.fullName ?? ''}
              namePosition="bottom"
              avatarSize="small"
              textStyle="sm-medium"
              src={liveStats?.player2?.avatar?.path}
              alter={liveStats?.player2?.avatar?.alter}
            />
          </div>
        </div>
        <div className="live-match__match-info__match-score">
          <h2 className="text-lg-medium">Общий счет</h2>
          <div className="live-match__match-info__match-score__players-score text-xl-bold">
            {liveStats?.score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;
