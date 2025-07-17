import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import grayIcon from '../../assets/icons/gray.svg';
import type { ManagerInfo } from '../../types/goal';

interface ManagerAvatarsProps {
  managers: ManagerInfo[];
}

function ManagerAvatar({ managers }: ManagerAvatarsProps) {
  const [hover, setHover] = useState(false);

  if (!managers || managers.length === 0) {
    return (
      <div className="flex gap-[0.8rem] items-center whitespace-nowrap">
        <img src={grayIcon} alt="manage" className="w-[2.0rem] h-[2.0rem]" />
        <div>없음</div>
      </div>
    );
  }

  if (managers.length === 1) {
    return (
      <div className="flex gap-[0.8rem] items-center whitespace-nowrap">
        <img
          src={managers[0].profileUrl || grayIcon}
          alt="manage"
          className="w-[2.0rem] h-[2.0rem] rounded-full"
        />
        <div>{managers[0].name}</div>
      </div>
    );
  }

  // 앞 두 명의 이미지만 표시
  const displayAvatars = managers.slice(0, 2);

  return (
    <div
      className="flex gap-[0.8rem] items-center whitespace-nowrap relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex -space-x-1 items-center">
        <img
          src={displayAvatars[0].profileUrl || grayIcon}
          alt={displayAvatars[0].name}
          className="w-[2.0rem] h-[2.0rem] rounded-full border border-gray-200 z-2"
        />
        {displayAvatars[1] && (
          <img
            src={displayAvatars[1].profileUrl || grayIcon}
            alt={displayAvatars[1].name}
            className="w-[1.8rem] h-[1.8rem] rounded-full -ml-[0.6rem] z-1"
          />
        )}
      </div>
      <div className="ml-[0.8rem]">...</div>
      {hover && (
        <div className="absolute top-full left-[-5rem] z-20">
          <Dropdown
            options={managers.map((m) => m.name)}
            onSelect={() => {}}
            onClose={() => setHover(false)}
          />
        </div>
      )}
    </div>
  );
}

export default ManagerAvatar;
