import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export default function NoteForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [etudiant, setEtudiant] = useState('');
  const [matiere, setMatiere] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      axios
        .get(`${API_BASE}/notes/${id}`)
        .then((res) => {
          const data = res.data;
          setEtudiant(data.etudiant);
          setMatiere(data.matiere);
          setNote(data.note.toString());
        })
        .catch(() => {
          setError('Impossible de charger la note à modifier.');
        })
        .finally(() => setLoading(false));
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
      if (isEdit && id) {
        await axios.put(`${API_BASE}/notes/${id}`, data);
      } else {
        await axios.post(`${API_BASE}/notes`, data);
      }
      navigate('/');
    } catch (err) {
      setError('Erreur lors de la sauvegarde. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <p className="text-center text-lg">Chargement de la note...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {isEdit ? 'Modifier la Note' : 'Ajouter une Nouvelle Note'}
      </h2>

      {error && <p className="text-red-600 text-center mb-6 text-lg">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Nom de l'étudiant
          </label>
          <input
            type="text"
            value={etudiant}
            onChange={(e) => setEtudiant(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
            placeholder="Ex: Jean Dupont"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Matière
          </label>
          <input
            type="text"
            value={matiere}
            onChange={(e) => setMatiere(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
            placeholder="Ex: Mathématiques"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
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
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          />
        </div>

        <div className="flex justify-end gap-6 pt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-8 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 font-medium transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 font-medium transition shadow"
          >
            {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
}