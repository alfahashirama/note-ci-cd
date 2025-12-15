import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://backend-service:5000';

export default function NoteForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [etudiant, setEtudiant] = useState('');
  const [matiere, setMatiere] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!id;

  // Chargement des données si édition
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      axios
        .get(`${API_BASE}/api/notes/${id}`)
        .then((res) => {
          const data = res.data;
          setEtudiant(data.etudiant);
          setMatiere(data.matiere);
          setNote(data.note.toString());
        })
        .catch(() => {
          setError('Impossible de charger la note.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      etudiant: etudiant.trim(),
      matiere: matiere.trim(),
      note: Number(note),
    };

    try {
      if (isEdit) {
        await axios.put(`${API_BASE}/api/notes/${id}`, data);
      } else {
        await axios.post(`${API_BASE}/api/notes`, data);
      }
      navigate('/');
    } catch (err) {
      setError('Erreur lors de la sauvegarde. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <p className="text-center">Chargement de la note...</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEdit ? 'Modifier la Note' : 'Ajouter une Nouvelle Note'}
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom de l'étudiant
          </label>
          <input
            type="text"
            value={etudiant}
            onChange={(e) => setEtudiant(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Jean Dupont"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matière
          </label>
          <input
            type="text"
            value={matiere}
            onChange={(e) => setMatiere(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Mathématiques"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note (/20)
          </label>
          <input
            type="number"
            min="0"
            max="20"
            step="0.5"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70 transition"
          >
            {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
}