import './PlayerRoleSelect.scss';
import { usePlayerStore } from '@/entities/player/model/playerStore.ts';
import { useSelectStore } from '@/shared/ui/select/model/selectStore.ts';
import SimpleSelect from '@/shared/ui/select';

interface PlayerRoleSelectProps {
  playerId: number;
  roleId: string;
}

const PlayerRoleSelect = ({ playerId, roleId }: PlayerRoleSelectProps) => {
  const updatePlayerRole = usePlayerStore((state) => state.updatePlayerRole);
  const { options } = useSelectStore();

  const handleRoleChange = (selectedRoleId: string | number | null) => {
    if (!selectedRoleId) return;

    const newRole = options.find((role) => role.id === selectedRoleId);
    if (!newRole) return;

    updatePlayerRole(playerId, newRole);
  };
  return (
    <SimpleSelect
      value={roleId}
      options={options}
      onChange={handleRoleChange}
    />
  );
};

export default PlayerRoleSelect;
