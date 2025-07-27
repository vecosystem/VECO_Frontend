import FilterIcon from '../../assets/icons/filter.svg';
import TrashIcon from '../../assets/icons/trash-black.svg';
import TrashRedIcon from '../../assets/icons/trash.svg';
import Dropdown from '../Dropdown/Dropdown';
import SelectAllCheckbox from './SelectAllCheckbox';

interface ListViewToolbarProps {
  filter: string; // dropdown
  isDeleteMode: boolean; // check mode
  isAllChecked: boolean;
  showSelectAll?: boolean;
  filterOptions: string[]; // dropdown
  onFilterClick: () => void; // open dropdown
  onFilterSelect: (option: string) => void; // dropdown
  onDeleteClick: () => void; // items check
  onSelectAllChange?: (checked: boolean) => void;
  dropdownProps?: any; // dropdown
}

const ListViewToolbar = ({
  filter,
  isDeleteMode,
  isAllChecked,
  showSelectAll,
  filterOptions,
  onFilterClick,
  onFilterSelect,
  onDeleteClick,
  onSelectAllChange,
  dropdownProps,
}: ListViewToolbarProps) => {
  return (
    <>
      {/* 필터 선택 */}
      <div className="flex justify-between">
        <div className="flex items-center">
          {showSelectAll && isDeleteMode ? (
            <SelectAllCheckbox checked={isAllChecked} onCheckChange={onSelectAllChange} />
          ) : (
            ''
          )}
        </div>
        <div className="flex gap-[2.4rem] items-center">
          {/* 필터영역 */}
          <div className="relative">
            <div className="flex items-center cursor-pointer relative" onClick={onFilterClick}>
              {/* 드롭다운 */}
              <img
                src={FilterIcon}
                className="inline-block w-[2.4rem] h-[2.4rem] mr-[0.8rem]"
                alt=""
              />
              <span className="font-body-r">필터</span>
              {dropdownProps.isOpen && dropdownProps.content && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Dropdown
                    value={filter}
                    defaultValue="필터"
                    options={filterOptions}
                    onSelect={onFilterSelect}
                    onClose={dropdownProps.closeDropdown}
                    className="top-[3.0rem] right-0"
                  />
                </div>
              )}
            </div>
          </div>
          {/* 삭제버튼 */}
          <div className="flex gap-[0.4rem] items-center cursor-pointer" onClick={onDeleteClick}>
            <img
              src={isDeleteMode ? TrashRedIcon : TrashIcon}
              className="inline-block w-[2.4rem] h-[2.4rem]"
              alt=""
            />
            <span className={`font-body-r ${isDeleteMode ? 'text-error-400' : ''}`}>삭제</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListViewToolbar;
