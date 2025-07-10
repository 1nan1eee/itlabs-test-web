import React from 'react';
import './FilterBar.css';

interface FilterBarProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Фильтр по имени..."
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};
