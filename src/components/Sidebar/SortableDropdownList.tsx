import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import SortableDropdown from './SortableDropdown';

export interface SortableItem {
  teamId: number;
  name: string;
  profileUrl?: string;
}

interface SortableDropdownListProps {
  items: SortableItem[];
  renderContent: (item: SortableItem, dragProps: any, isOverlay?: boolean) => React.ReactNode;
  onSorted?: (sortedItems: SortableItem[]) => void;
}

const SortableDropdownList = ({ items, renderContent, onSorted }: SortableDropdownListProps) => {
  const [list, setList] = useState(items);
  const [activeItem, setActiveItem] = useState<SortableItem | null>(null);
  const [overlaySize, setOverlaySize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const dragged = list.find((item) => item.teamId === event.active.id);
    if (!dragged) return;

    setActiveItem(dragged);

    // 드래그 시작 시 DOM 요소 크기 측정
    const node = document.querySelector(`[data-id="${dragged.teamId}"]`) as HTMLElement;
    if (node) {
      const { width, height } = node.getBoundingClientRect();
      setOverlaySize({ width, height });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveItem(null);
      return;
    }

    const oldIndex = list.findIndex((item) => item.teamId === active.id);
    const newIndex = list.findIndex((item) => item.teamId === over.id);
    const newList = arrayMove(list, oldIndex, newIndex);
    setList(newList);
    onSorted?.(newList);
    setActiveItem(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={list.map((i) => i.teamId)} strategy={verticalListSortingStrategy}>
        {list.map((item) => (
          <SortableDropdown key={item.teamId} id={item.teamId}>
            {(dragProps) => (
              <div data-id={item.teamId}>{renderContent(item, dragProps, false)}</div>
            )}
          </SortableDropdown>
        ))}
      </SortableContext>

      {/* 오버레이에 측정된 width/height 적용 */}
      <DragOverlay>
        {activeItem && (
          <div style={{ width: overlaySize.width, height: overlaySize.height }}>
            {renderContent(activeItem, {}, true)}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableDropdownList;
