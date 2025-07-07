import { RouterProvider } from 'react-router-dom';
import router from './routes';
import Modal from './components/Modal/Modal.tsx';

function App() {
  return (
    // <RouterProvider router={router} />
    <Modal subtitle={'최대 20글자까지 작성할 수 있습니다'} />
  );
}

export default App;
