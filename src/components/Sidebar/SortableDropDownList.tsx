// components/SortableDropdownList.tsx

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import SortableDropdown from './SortableDropdown';

export interface SortableItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface SortableDropdownListProps {
  items: SortableItem[];
  renderContent: (item: SortableItem, dragProps: any) => React.ReactNode;
  onSorted?: (sortedItems: SortableItem[]) => void;
}

const SortableDropdownList = ({ items, renderContent, onSorted }: SortableDropdownListProps) => {
  const [list, setList] = useState(items);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = list.findIndex((item) => item.id === active.id);
    const newIndex = list.findIndex((item) => item.id === over.id);
    const newList = arrayMove(list, oldIndex, newIndex);
    setList(newList);
    onSorted?.(newList);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={list.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        {list.map((item) => (
          <SortableDropdown key={item.id} id={item.id}>
            {(dragProps) => renderContent(item, dragProps)}
          </SortableDropdown>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableDropdownList;
