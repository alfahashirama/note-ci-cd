import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Note {
  id: string;
  etudiant: string;
  matiere: string;
  note: number;
}

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes');
      setNotes(res.data);
    } catch (err) {
      alert('Erreur chargement notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id: string) => {
    if (confirm('Supprimer cette note ?')) {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      fetchNotes();
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Liste des Notes</h2>
        <Link to="/add" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Ajouter une note
        </Link>
      </div>
      {notes.length === 0 ? (
        <p>Aucune note.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Étudiant</th>
              <th className="border border-gray-300 px-4 py-2">Matière</th>
              <th className="border border-gray-300 px-4 py-2">Note</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td className="border border-gray-300 px-4 py-2">{note.etudiant}</td>
                <td className="border border-gray-300 px-4 py-2">{note.matiere}</td>
                <td className="border border-gray-300 px-4 py-2">{note.note}/20</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Link to={`/edit/${note.id}`} className="text-blue-600 mr-4">Éditer</Link>
                  <button onClick={() => deleteNote(note.id)} className="text-red-600">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}