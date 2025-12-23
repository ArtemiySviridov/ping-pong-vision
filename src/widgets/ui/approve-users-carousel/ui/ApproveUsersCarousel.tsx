import './ApproveUsersCarousel.scss';
import Carousel from '@/shared/ui/carusel';
import { useEffect } from 'react';
import ApproveUserCard from '@/features/approve-user-card';
import { usePlayerStore } from '@/entities/player/model/playerStore.ts';
import Loader from '@/shared/ui/loader';

const ApproveUsersCarousel = () => {
  const isPendingUsersLoading = usePlayerStore(
    (state) => state.isPendingUsersLoading,
  );
  const pendingUsers = usePlayerStore((state) => state.pendingUsers);
  const fetchPendingUsers = usePlayerStore((state) => state.fetchPendingUsers);
  const approvePendingUser = usePlayerStore(
    (state) => state.approvePendingUser,
  );
  const rejectPendingUser = usePlayerStore((state) => state.rejectPendingUser);

  useEffect(() => {
    fetchPendingUsers();
  }, [fetchPendingUsers]);

  const users = Array.isArray(pendingUsers) ? pendingUsers : [];

  if (isPendingUsersLoading) {
    return (
      <div className="approva-users-carusel">
        <div className="approva-users-carusel__loading">
          <Loader />
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div style={{ marginTop: '20px' }} className="approva-users-carusel">
        <div className="approva-users-carusel__empty">
          Нет заявок на регистрацию
        </div>
      </div>
    );
  }

  return (
    <div className="approva-users-carusel">
      <Carousel
        items={users.map((user) => (
          <div key={user.id}>
            <ApproveUserCard
              fullName={user.fullName}
              avatar={user.avatar}
              onBlock={() => rejectPendingUser(user.id)}
              onApprove={() => approvePendingUser(user.id)}
            />
          </div>
        ))}
      />
    </div>
  );
};

export default ApproveUsersCarousel;
