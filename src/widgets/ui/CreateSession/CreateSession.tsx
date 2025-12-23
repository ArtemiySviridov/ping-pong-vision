import './CreateSession.scss';
import MessagePanel from '@/shared/ui/MessagePanel';
import SimpleSelect from '@/shared/ui/select';
import Button from '@/shared/ui/Button';
import { usePlayerStore } from '@/entities/player/model/playerStore.ts';
import { useEffect, useState } from 'react';
import { useLiveStore } from '@/entities/live/model/liveStore.ts';

const CreateSession = () => {
  const { players, fetchPlayers } = usePlayerStore();

  const [selectedOpponent, setSelectedOpponent] = useState<
    string | number | null
  >(null);
  const [selectedSetFormat, setSelectedSetFormat] = useState<
    string | number | null
  >(null);

  const { createSession } = useLiveStore();

  useEffect(() => {
    fetchPlayers(1, 20);
  }, [fetchPlayers]);

  const opponentsOptions = players.map((player) => ({
    id: player.id.toString(),
    name: player.player.fullName,
  }));

  const setsOptions = [
    { id: '3', name: 'BO3' },
    { id: '5', name: 'BO5' },
  ];

  const handleChoseOpponent = (selectedOpponent: string | number | null) => {
    setSelectedOpponent(selectedOpponent);
  };

  const handleChoseSet = (selectedSet: string | number | null) => {
    setSelectedSetFormat(selectedSet);
  };

  const handleCreateSession = () => {
    if (selectedOpponent && selectedSetFormat) {
      createSession(Number(selectedOpponent), Number(selectedSetFormat));
    }
  };

  return (
    <div className="create-session">
      <MessagePanel
        iconMood="happy"
        message="Стол свободен! Для начала игры сгенерируйте код и озвучьте его системе / нажмите “Начать игру”.
Для просмотреа результатов перейдите в историю матчей."
      />
      <div className="create-session__settings-block">
        <SimpleSelect
          label="Выберите соперника"
          options={opponentsOptions}
          onChange={handleChoseOpponent}
          value={selectedOpponent}
        />
        <SimpleSelect
          label="Выберите формат"
          options={setsOptions}
          onChange={handleChoseSet}
          value={selectedSetFormat}
        />
        <Button
          size="small"
          variant="primary"
          text="Начать игру"
          onClick={handleCreateSession}
        />
      </div>
    </div>
  );
};

export default CreateSession;
