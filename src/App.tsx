import { RouterProvider } from 'react-router-dom';
import router from './routes';
import Dropdown from './components/Dropdown/Dropdown.tsx';
import { useState } from 'react';

function App() {
  // return <RouterProvider router={router} />;
  const [value, setValue] = useState('우선순위');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex justify-center items-center h-screen`}>
      <div className={`relative`}>
        <span className={`font-title-sub-r`} onClick={() => setIsOpen(true)}>
          {value}
        </span>
        {isOpen && (
          <Dropdown
            defaultValue={'우선순위'}
            options={['없음', '해야할 일', '진행 중', '완료', '검토']}
            onSelect={(option) => {
              setValue(option);
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
