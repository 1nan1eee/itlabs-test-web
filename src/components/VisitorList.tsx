import React from 'react';
import { Visitor } from '../types';
import { VisitorItem } from './VisitorItem';
import './VisitorList.css';

interface VisitorListProps {
  visitors: Visitor[];
  onEdit: (visitor: Visitor) => void;
  onDelete: (id: number) => void;
}

export const VisitorList: React.FC<VisitorListProps> = ({ visitors, onEdit, onDelete }) => {
  if (visitors.length === 0) {
    return <div className="no-visitors">Посетителей нет</div>;
  }

  return (
    <div className="visitor-list">
      {visitors.map(visitor => (
        <VisitorItem
          key={visitor.id}
          visitor={visitor}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
