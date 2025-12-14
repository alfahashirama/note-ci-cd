import { Sequelize } from 'sequelize';
import { initNoteModel } from '../src/models/note.model';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false,
});

initNoteModel(sequelize);

// Test connexion (optionnel)
sequelize.authenticate()
  .then(() => console.log('Connexion DB OK'))
  .catch(err => console.error('Erreur connexion DB:', err));

export default sequelize;