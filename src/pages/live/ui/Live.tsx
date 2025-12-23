import './Live.scss';
import CreateSession from '@/widgets/ui/CreateSession';
import { useLiveStore } from '@/entities/live/model/liveStore.ts';
import { useEffect } from 'react';
import LiveMatch from '@/widgets/ui/live-match';

const Live = () => {
  const { isLive, fetchLiveStatus } = useLiveStore();
  useEffect(() => {
    if (!isLive) {
      fetchLiveStatus();
    }
  }, [isLive]);
  return <div>{isLive ? <LiveMatch /> : <CreateSession />}</div>;
};

export default Live;
