'use client';
import { useEffect, useState } from 'react';
import ProjectTable from '../components/ProjectTable';
import ProjectForm from '../components/ProjectForm';
import Loading from '../components/Loading';
import projectService from '../services/projectService';
import userService from '../services/userService';

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const fetchData = async () => {
    try {
      const [projRes, userRes] = await Promise.all([
        projectService.getAll(),
        userService.getAll()
      ]);
      setProjects(projRes);
      setUsers(userRes);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editing) {
        await projectService.update(editing._id, data);
      } else {
        await projectService.create(data);
      }
      setEditing(null);
      fetchData();
    } catch (error) {
      console.error('Erro ao salvar', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Deseja realmente excluir este projeto?')) {
      await projectService.remove(id);
      fetchData();
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Projetos</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ProjectForm
            users={users}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setEditing(null)}
            initialData={editing}
          />
          <ProjectTable
            projects={projects}
            onEdit={(p) => setEditing(p)}
            onDelete={handleDelete}
          />
        </>
      )}
    </main>
  );
}
