import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Note {
  id: string;
  etudiant: string;
  matiere: string;
  note: number;
}

// URL API dynamique : utilise l'env var en production, localhost en dev
const API_BASE = import.meta.env.VITE_API_URL || 'http://backend-service:5000';

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/notes`);
      setNotes(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Impossible de charger les notes. Vérifiez que le backend est en marche.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) return;

    try {
      await axios.delete(`${API_BASE}/api/notes/${id}`);
      fetchNotes(); // Rafraîchir la liste
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Chargement des notes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Liste des Notes</h2>
        <Link
          to="/add"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded transition"
        >
          Ajouter une note
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="text-center text-gray-500">Aucune note enregistrée pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-6 py-3 text-left">Étudiant</th>
                <th className="border border-gray-300 px-6 py-3 text-left">Matière</th>
                <th className="border border-gray-300 px-6 py-3 text-center">Note</th>
                <th className="border border-gray-300 px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-6 py-3">{note.etudiant}</td>
                  <td className="border border-gray-300 px-6 py-3">{note.matiere}</td>
                  <td className="border border-gray-300 px-6 py-3 text-center font-medium">
                    {note.note}/20
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-center">
                    <Link
                      to={`/edit/${note.id}`}
                      className="text-blue-600 hover:underline mr-4 font-medium"
                    >
                      Éditer
                    </Link>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}