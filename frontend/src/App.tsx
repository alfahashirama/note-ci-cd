import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-6 text-center">
          <h1 className="text-3xl font-bold">Gestion des Notes Universitaires</h1>
        </header>
        <main className="max-w-4xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/add" element={<NoteForm />} />
            <Route path="/edit/:id" element={<NoteForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;