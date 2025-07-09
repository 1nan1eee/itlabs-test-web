import { useState, useEffect } from 'react';
import type { Visitor } from '../types';

export const useVisitors = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:3000/visitors';

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setVisitors(data);
    } catch (err) {
      setError('Не удалось получить данные о посетителях');
    } finally {
      setLoading(false);
    }
  };

  const addVisitor = async (visitor: Visitor) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitor),
      });
      const newVisitor = await response.json();
      setVisitors([...visitors, newVisitor]);
    } catch (err) {
      setError('Не удалось добавить посетителя');
    } finally {
      setLoading(false);
    }
  };

  const updateVisitor = async (id: number, visitor: Visitor) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitor),
      });
      const updated = await response.json();
      setVisitors(visitors.map(v => (v.id === id ? updated : v)));
    } catch (err) {
      setError('Не удалось обновить данные о посетителе');
    } finally {
      setLoading(false);
    }
  };

  const deleteVisitor = async (id: number) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setVisitors(visitors.filter(v => v.id !== id));
    } catch (err) {
      setError('Не удалось удалить данные о посетителе');
    } finally {
      setLoading(false);
    }
  };

  return { visitors, loading, error, addVisitor, updateVisitor, deleteVisitor, fetchVisitors };
};
