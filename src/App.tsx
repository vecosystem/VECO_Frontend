import { RouterProvider } from 'react-router-dom';
import router from './routes';
import Dropdown from './components/Dropdown/Dropdown.tsx';
import { useState } from 'react';
import { useDropdownActions, useDropdownInfo } from './hooks/useDropdown.ts';

function App() {
  // return <RouterProvider router={router} />;
  const [value, setValue] = useState('우선순위');
  const [filter, setFilter] = useState('필터');
  const [manager, setManager] = useState('담당자');
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();

  return (
    <div className={`flex justify-center items-center h-screen gap-50`}>
      <div className={`relative`}>
        <span
          className={`font-title-sub-r`}
          onClick={() => {
            openDropdown({ name: '우선순위' });
          }}
        >
          {value}
        </span>
        {isOpen && content?.name == '우선순위' && (
          <Dropdown
            defaultValue="우선순위"
            options={['없음', '해야할 일', '진행 중', '완료', '검토']}
            onSelect={(option) => {
              setValue(option);
            }}
            onClose={closeDropdown}
          />
        )}
      </div>
      <div className={`relative`}>
        <span
          className={`font-title-sub-r`}
          onClick={() => {
            openDropdown({ name: '필터' });
          }}
        >
          {filter}
        </span>
        {isOpen && content?.name == '필터' && (
          <Dropdown
            defaultValue="필터"
            options={['이슈', '목표', '텍스트가 길어지면 이렇게 표시']}
            onSelect={(option) => {
              setFilter(option);
            }}
            onClose={closeDropdown}
          />
        )}
      </div>
      <div className={`relative`}>
        <span
          className={`font-title-sub-r`}
          onClick={() => {
            openDropdown({ name: '담당자' });
          }}
        >
          {manager}
        </span>
        {isOpen && content?.name == '담당자' && (
          <Dropdown
            options={['김철수', '이영희', '박지민']}
            onSelect={(option) => {
              setManager(option);
            }}
            onClose={closeDropdown}
          />
        )}
      </div>
    </div>
  );
}

export default App;
