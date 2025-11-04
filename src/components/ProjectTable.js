export default function ProjectTable({ projects, onEdit, onDelete }) {
  return (
    <table className="w-full border-collapse border border-gray-300 bg-white">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2 border">Título</th>
          <th className="p-2 border">Descrição</th>
          <th className="p-2 border">Usuário</th>
          <th className="p-2 border">Ações</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p._id} className="border-t">
            <td className="p-2 border">{p.title}</td>
            <td className="p-2 border">{p.description}</td>
            <td className="p-2 border">{p.user?.name || '—'}</td>
            <td className="p-2 border space-x-2">
              <button
                onClick={() => onEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(p._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
