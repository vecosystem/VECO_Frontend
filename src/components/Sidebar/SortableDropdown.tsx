// components/SortableDropdown.tsx

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

interface SortableDropdownProps {
  id: number;
  children: (props: {
    listeners: any;
    attributes: any;
    setNodeRef: (element: HTMLElement | null) => void;
    transform: any;
    transition: string | undefined;
  }) => React.ReactNode;
}

const SortableDropdown = ({ id, children }: SortableDropdownProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ listeners, attributes, setNodeRef, transform, transition })}
    </div>
  );
};

export default SortableDropdown;
