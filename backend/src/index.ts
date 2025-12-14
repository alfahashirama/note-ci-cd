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
  res.send('Backend Notes Universitaires avec Sequelize - API CRUD prête !');
});

sequelize.sync({ alter: false }).then(() => {  // En dev : { force: true } pour reset
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
});