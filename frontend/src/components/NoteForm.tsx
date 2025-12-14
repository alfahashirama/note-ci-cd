import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function NoteForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [etudiant, setEtudiant] = useState('');
  const [matiere, setMatiere] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/notes/${id}`).then(res => {
        setEtudiant(res.data.etudiant);
        setMatiere(res.data.matiere);
        setNote(res.data.note);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { etudiant, matiere, note: Number(note) };
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/notes/${id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/notes', data);
      }
      navigate('/');
    } catch (err) {
      alert('Erreur sauvegarde');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl mb-6">{id ? 'Éditer' : 'Ajouter'} une Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Étudiant</label>
          <input type="text" value={etudiant} onChange={e => setEtudiant(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Matière</label>
          <input type="text" value={matiere} onChange={e => setMatiere(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-6">
          <label className="block mb-2">Note (/20)</label>
          <input type="number" min="0" max="20" step="0.5" value={note} onChange={e => setNote(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {id ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}