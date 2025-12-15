import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Note {
  id: string;
  etudiant: string;
  matiere: string;
  note: number;
}

// URL API : en production = chemin relatif /api → même origine, pas de CORS
// en dev local = fallback localhost
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/notes`);
      setNotes(res.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError('Impossible de charger les notes. Vérifiez votre connexion ou que le serveur est en marche.');
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
      await axios.delete(`${API_BASE}/notes/${id}`);
      fetchNotes();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 text-lg">Chargement des notes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 text-lg">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Liste des Notes Universitaires</h2>
        <Link
          to="/add"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
        >
          Ajouter une note
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500">Aucune note enregistrée pour le moment.</p>
          <Link to="/add" className="text-blue-600 hover:underline mt-4 inline-block">
            → Ajouter la première note
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Étudiant</th>
                <th className="px-6 py-4 text-left">Matière</th>
                <th className="px-6 py-4 text-center">Note</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{note.etudiant}</td>
                  <td className="px-6 py-4">{note.matiere}</td>
                  <td className="px-6 py-4 text-center font-semibold text-lg">
                    {note.note}/20
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/edit/${note.id}`}
                      className="text-blue-600 hover:underline font-medium mr-6"
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