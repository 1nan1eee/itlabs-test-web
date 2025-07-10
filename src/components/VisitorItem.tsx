import React from 'react';
import { Visitor } from '../types';
import './VisitorItem.css';

interface VisitorItemProps {
  visitor: Visitor;
  onEdit: (visitor: Visitor) => void;
  onDelete: (id: number) => void;
}

export const VisitorItem: React.FC<VisitorItemProps> = ({ visitor, onEdit, onDelete }) => {
  return (
    <div className="visitor-item">
      <div className="visitor-details">
        <h3>{visitor.fullName}</h3>
        <p>Компания: {visitor.company}</p>
        <p>Группа: {visitor.group}</p>
        <p>Присутствует на сайте: {visitor.present ? 'да' : 'нет'}</p>
      </div>
      <div className="visitor-actions">
        <button onClick={() => onEdit(visitor)}>Редактировать</button>
        <button onClick={() => onDelete(visitor.id!)}>Удалить</button>
      </div>
    </div>
  );
};
