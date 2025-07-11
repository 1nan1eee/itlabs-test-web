import React, { useState, useEffect } from 'react';
import type { Visitor } from '../types';
import { VisitorGroup } from '../types';
import './VisitorForm.css';

interface VisitorFormProps {
  visitor?: Visitor;
  onSubmit: (visitor: Visitor) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void; // Новый проп для обработки удаления
}

export const VisitorForm: React.FC<VisitorFormProps> = ({ visitor, onSubmit, onCancel, onDelete }) => {
  const [formData, setFormData] = useState<Visitor>({
    id: 0,
    fullName: '',
    company: '',
    group: VisitorGroup.Passerby,
    present: false,
  });

  useEffect(() => {
    if (visitor) {
      setFormData(visitor);
    }
  }, [visitor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDeleteClick = () => {
    if (visitor && visitor.id && onDelete) {
      onDelete(visitor.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="visitor-form">
      <div className="form-group">
        <label>ФИО</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Компания</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Группа</label>
        <select
          name="group"
          value={formData.group}
          onChange={handleChange}
          required
        >
          {Object.values(VisitorGroup).map(group => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group-checkbox">
        <label>Присутствие</label>
        <input
          type="checkbox"
          name="present"
          checked={formData.present}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="form-actions">
        <button type="submit">Сохранить</button>
        {visitor && onDelete && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="delete-button"
          >
            Удалить
          </button>
        )}
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
};
