import { useState } from 'react';
import { createPortal } from 'react-dom';
import GithubIcon from '../../../assets/icons/github.svg';
import GithubWhiteIcon from '../../../assets/icons/github-white.svg';
import SlackIcon from '../../../assets/icons/slack.svg';
import ExternalToolButton from './ExternalToolButton';
import { useParams } from 'react-router-dom';
import { useGetGithubConnect } from '../../../apis/external/useGetGithubConnect.ts';
import { useGetSlackConnect } from '../../../apis/external/useGetSlackConnect.ts';

const TOOL_LIST = [
  {
    key: 'GITHUB',
    label: 'GitHub',
    desc: '코드 버전 관리 및 협업',
    icon: GithubIcon,
    iconSelected: GithubWhiteIcon,
  },
  {
    key: 'SLACK',
    label: 'Slack',
    desc: '팀 커뮤니케이션과 알림 연동',
    icon: SlackIcon,
    iconSelected: SlackIcon,
  },
];

/*
  TODO
  - 이미 연동 된 요소 는 disabled 처리
  - 연동하기 클릭 시 알맞은 API 호출
*/

interface ExternalToolModalProps {
  onClose: () => void;
}

const ExternalToolModal = ({ onClose }: ExternalToolModalProps) => {
  const teamId = Number(useParams().teamId);
  const { mutate: connectGithub } = useGetGithubConnect(teamId);
  const { mutate: connectSlack } = useGetSlackConnect(teamId);
  const [selected, setSelected] = useState<string | null>(null);

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/66 z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-white rounded-[0.8rem] p-[2.4rem] w-[54.8rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-gray-600 font-title-b">외부 연동</p>
        <div className="flex mt-[3.2rem] mb-[1.6rem] gap-[1.2rem]">
          {TOOL_LIST.map((tool) => (
            <ExternalToolButton
              key={tool.key}
              label={tool.label}
              desc={tool.desc}
              icon={tool.icon}
              iconSelected={tool.iconSelected}
              selected={selected === tool.key}
              onClick={() => setSelected(tool.key)}
            />
          ))}
        </div>
        <button
          className={`w-full py-[0.8rem] rounded-[0.6rem] font-small-b
            ${
              selected
                ? 'bg-primary-blue text-zinc-50 cursor-pointer'
                : 'bg-gray-300 text-gray-400 cursor-not-allowed'
            }
          `}
          onClick={() => {
            if (selected === 'SLACK') {
              connectSlack();
            } else if (selected === 'GITHUB') {
              connectGithub();
            }
            onClose();
          }}
          disabled={!selected}
        >
          외부 연동하기
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ExternalToolModal;
