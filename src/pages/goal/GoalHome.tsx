import { GoalItem } from '../../components/ListView/GoalItem';
import BoxIcon from '../../assets/icons/box.svg';
import ListIcon from '../../assets/icons/list.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import TrashIcon from '../../assets/icons/trash-black.svg';
import PlusIcon from '../../assets/icons/plus.svg';

const GoalHome = () => {
  return (
    <>
      <div className="flex flex-col gap-[3.2rem]">
        {/* 팀 아이콘, 팀명 */}
        <div className="flex gap-[1.6rem] items-center">
          <img
            src=""
            className="inline-block w-[3.2rem] h-[3.2rem] rounded-full bg-primary-variant-blue"
          />
          <div className="flex font-title-b">팀명</div>
        </div>

        {/* 필터 선택 */}
        <div className="flex justify-between">
          <div className="flex gap-[0.8rem] items-center">
            <img src={BoxIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
            <img src={ListIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
          </div>

          <div className="flex gap-[2.4rem] items-center">
            <div className="flex gap-[0.8rem] items-center">
              <img src={FilterIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
              <span className="font-body-r">필터</span>
            </div>
            <div className="flex gap-[0.4rem] items-center">
              <img src={TrashIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
              <span className="font-body-r">삭제</span>
            </div>
          </div>
        </div>

        {/* 목표 리스트 */}
        <div className="flex flex-col gap-[6.4rem]">
          <div>
            <div className="flex justify-between pb-[3.2rem]">
              <div className="flex font-title-sub-b gap-[0.8rem]">
                <div>필터 요소명</div>
                <div className="text-gray-500">개수 num</div>
              </div>
              <img src={PlusIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
            </div>
            <GoalItem />
            <GoalItem />
          </div>

          <div>
            <div className="flex justify-between pb-[3.2rem]">
              <div className="flex font-title-sub-b gap-[0.8rem]">
                <div>필터 요소명</div>
                <div className="text-gray-500">개수 num</div>
              </div>
              <img src={PlusIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
            </div>
            <GoalItem />
            <GoalItem />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalHome;
