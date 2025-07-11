import { useState, useEffect } from 'react';
import { useVisitors } from './hooks/useVisitors';
import { Visitor } from './types';
import { VisitorForm } from './components/VisitorForm';
import { Modal } from './components/Modal';
import './App.css';

function App() {
  const { visitors, loading, error, addVisitor, updateVisitor, deleteVisitor } = useVisitors();
  
  const initialSearch = new URLSearchParams(window.location.search).get('search') || '';
  const initialPresence = new URLSearchParams(window.location.search).get('presence') || 'all';
  
  const [search, setSearch] = useState(initialSearch);
  const [presenceFilter, setPresenceFilter] = useState(initialPresence);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState<Visitor | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (presenceFilter !== 'all') params.set('presence', presenceFilter);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [search, presenceFilter]);

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.fullName.toLowerCase().includes(search.toLowerCase());
    const matchesPresence =
      presenceFilter === 'all' ||
      (presenceFilter === 'present' && visitor.present) ||
      (presenceFilter === 'absent' && !visitor.present);
    return matchesSearch && matchesPresence;
  });

  const presentVisitors = visitors.filter(v => v.present).length;
  const absentVisitors = visitors.filter(v => !v.present).length;
  let count = 1;

  const handleAdd = () => {
    setEditingVisitor(undefined);
    setIsModalOpen(true);
  };

  const handleRowClick = (visitor: Visitor) => {
    setEditingVisitor(visitor);
    setIsModalOpen(true);
  };

  const handleSubmit = (visitor: Visitor) => {
    if (editingVisitor) {
      updateVisitor(editingVisitor.id!, visitor);
    } else {
      addVisitor(visitor);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    deleteVisitor(id);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Загружаем...</div>}
      
      <header className="app-header">
        <div className="header-logo">
          <img src="/assets/agronom_sad_logo.png" alt="Агроном Сад лого"/>
        </div>
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={handleAdd} className="add-button">Добавить</button>
        <h1 className="visitors-title">
          Посетители<br />
          <span className="present-visitors">{presentVisitors}</span> / <span className="absent-visitors">{absentVisitors}</span>
        </h1>
      </header>
    
      <div className="table-container">
        <table className="visitors-table">
          <thead>
            <tr>
              <th>Номер</th>
              <th>ФИО</th>
              <th>Компания</th>
              <th>Группа</th>
              <th>Присутствие</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map(visitor => (
              <tr
                key={visitor.id}
                onClick={() => handleRowClick(visitor)}
                className="visitor-row"
              >
                <td>{count++}</td>
                <td>{visitor.fullName}</td>
                <td>{visitor.company || '-'}</td>
                <td>{visitor.group || '-'}</td>
                <td>{visitor.present ? <img src="/assets/present_icon.png" alt="Иконка присутствия"/> : <img src="/assets/absent_icon.png" alt="Иконка отсутствия"/>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="filter-footer">
        <span>Фильтровать по:</span>
        <button
          onClick={() => setPresenceFilter('absent')}
          className={presenceFilter === 'absent' ? 'active-absent' : ''}
        >
          Отсутствующим
        </button>
        <button
          onClick={() => setPresenceFilter('present')}
          className={presenceFilter === 'present' ? 'active-present' : ''}
        >
          Присутствующим
        </button>
        <button
          onClick={() => setPresenceFilter('all')}
          className={presenceFilter === 'all' ? 'active' : ''}
        >
          Без фильтра
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{editingVisitor ? 'Редактировать данные о посетителе' : 'Добавить посетителя'}</h2>
        <VisitorForm
          visitor={editingVisitor}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          onDelete={editingVisitor ? handleDelete : undefined}
        />
      </Modal>
    </div>
  );
}

export default App;
