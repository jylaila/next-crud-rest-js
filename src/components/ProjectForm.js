import { useState, useEffect } from 'react';

export default function ProjectForm({ onSubmit, onCancel, users, initialData }) {
  const [formData, setFormData] = useState({ title: '', description: '', user: '' });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', user: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white shadow rounded-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Usuário</label>
        <select
          name="user"
          value={formData.user}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Selecione</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {initialData ? 'Atualizar' : 'Cadastrar'}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
