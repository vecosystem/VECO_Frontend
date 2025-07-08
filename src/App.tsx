import { RouterProvider } from 'react-router-dom';
import router from './routes';
import Dropdown from './components/Dropdown/Dropdown.tsx';
import { useState } from 'react';
import { useDropdownActions, useDropdownInfo } from './hooks/useDropdown.ts';

function App() {
  // return <RouterProvider router={router} />;
  const [value, setValue] = useState('우선순위');
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();

  return (
    <div className={`flex justify-center items-center h-screen`}>
      <div className={`relative`}>
        <span
          className={`font-title-sub-r`}
          onClick={() => {
            openDropdown({ name: '우선순위' });
          }}
        >
          {value}
        </span>
        {isOpen && content && (
          <Dropdown
            defaultValue={value}
            options={['없음', '해야할 일', '진행 중', '완료', '검토']}
            onSelect={(option) => {
              setValue(option);
            }}
            onClose={closeDropdown}
          />
        )}
      </div>
    </div>
  );
}

export default App;
