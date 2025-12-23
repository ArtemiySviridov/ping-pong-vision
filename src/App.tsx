import { createBrowserRouter, RouterProvider } from 'react-router';
import Live from '@pages/live';
import TournamentCalendar from '@pages/tournament-calendar';
import MatchHistory from '@pages/match-history';
import TableAvailability from '@pages/table-availability';
import Players from '@pages/players';
import Profile from '@pages/profile';
import DefaultLayout from '@/shared/ui/DefaultLayout';
import Login from '@pages/login';
import Register from '@pages/register';
import Player from '@pages/player';
import Match from '@pages/match';
import Tournament from '@pages/tournament';
import ProtectedRoute from '@/shared/ui/protected-route';
import AddTournament from '@pages/add-tournament/AddTournament';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/model/authStore.ts';
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <ProtectedRoute allowedRoles={['user', 'admin']} />,
    children: [
      {
        path: '/',
        element: <DefaultLayout />,
        children: [
          {
            path: 'live',
            element: <Live />,
          },
          {
            path: 'tournament-calendar',
            element: <TournamentCalendar />,
          },
          {
            path: 'tournament-calendar/add-tournament',
            element: <AddTournament />,
          },
          {
            path: 'tournament-calendar/tournament/:id/edit',
            element: <AddTournament />,
          },
          {
            path: 'tournament-calendar/tournament/:id',
            element: <Tournament />,
          },
          {
            path: 'match-history',
            element: <MatchHistory />,
          },
          {
            path: 'match-history/match/:matchId',
            element: <Match />,
          },
          {
            path: 'table-availability',
            element: <TableAvailability />,
          },
          {
            path: 'players',
            element: <Players />,
          },
          {
            path: 'players/:playerId',
            element: <Player />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
