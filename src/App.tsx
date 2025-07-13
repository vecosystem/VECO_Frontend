import { RouterProvider } from 'react-router-dom';
import router from './routes';
import SettingTeam from './pages/setting/SettingTeam.tsx';

function App() {
  // return <RouterProvider router={router} />;
  return <SettingTeam />;
}

export default App;
