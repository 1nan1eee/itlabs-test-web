import React from 'react';
import './FilterBar.css';

interface FilterBarProps {
  search: string;
  presenceFilter: string;
  onSearchChange: (search: string) => void;
  onPresenceChange: (presence: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  presenceFilter,
  onSearchChange,
  onPresenceChange,
}) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Поиск по имени..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
      <select
        value={presenceFilter}
        onChange={e => onPresenceChange(e.target.value)}
      >
        <option value="all">Все</option>
        <option value="present">Присутствуют</option>
        <option value="absent">Отсутствуют</option>
      </select>
    </div>
  );
};
