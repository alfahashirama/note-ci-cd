import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/note.routes';
import sequelize from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send('Backend Notes Universitaires - API CRUD prête !');
});

// Synchronisation + migrations au démarrage (safe en prod)
sequelize.sync({ alter: true })  // { alter: true } applique les changements sans perdre les données
  .then(() => {
    console.log('✅ Base de données synchronisée avec succès');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('❌ Erreur lors de la synchronisation DB :', err);
    process.exit(1);
  });