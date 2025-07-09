import React, { useState, useEffect } from 'react';
import type { Visitor } from '../types';
import { VisitorGroup } from '../types';
import './VisitorForm.css';

interface VisitorFormProps {
  visitor?: Visitor;
  onSubmit: (visitor: Visitor) => void;
  onCancel: () => void;
}

export const VisitorForm: React.FC<VisitorFormProps> = ({ visitor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Visitor>({
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

  return (
    <form onSubmit={handleSubmit} className="visitor-form">
      <div className="form-group">
        <label>ФИО:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Компания:</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Группа:</label>
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
      <div className="form-group">
        <label>Присутствие:</label>
        <input
          type="checkbox"
          name="present"
          checked={formData.present}
          onChange={handleCheckboxChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
};
