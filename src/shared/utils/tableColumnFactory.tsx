import AvatarWithName from '@/shared/ui/AvatarWithName';
import type { Column, ServerColumn } from '@/shared/types/tables/column.ts';
import Status from '@/shared/ui/status';
import PlayerRoleSelect from '@/features/change-player-role';

export const createTableColumns = <T,>(schema: ServerColumn[]): Column<T>[] => {
  return schema.map((column) => {
    const baseColumn = {
      key: column.key as keyof T,
      title: column.title,
    };

    switch (column.type) {
      case 'player':
        return {
          ...baseColumn,
          render: (value: any) => {
            if (!value) return null;
            const src = value.avatar?.path || null;
            const alter = value.avatar?.alter;
            return (
              <AvatarWithName
                playerId={value.id}
                name={value.fullName}
                src={src}
                alter={alter}
                namePosition="right"
                avatarSize="small"
                textStyle="sm-medium"
              />
            );
          },
        };
      case 'roleSelect':
        return {
          ...baseColumn,
          render: (_: any, row: any) => (
            <PlayerRoleSelect playerId={row.id} roleId={row.role.id} />
          ),
        };
      case 'status':
        return {
          ...baseColumn,
          render: (value: any) => {
            if (!value) return null;

            if (typeof value === 'object') {
              return <Status variant={value.id} text={value.name} />;
            }
          },
        };
      default:
        return baseColumn;
    }
  });
};
