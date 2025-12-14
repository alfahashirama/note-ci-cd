import { DataTypes, Model, Sequelize } from 'sequelize';

export class Note extends Model {
  public id!: string;
  public etudiant!: string;
  public matiere!: string;
  public note!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initNoteModel = (sequelize: Sequelize) => {
  Note.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Pas utilisé côté JS, mais pour cohérence
        primaryKey: true,
      },
      etudiant: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      matiere: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Note',
      tableName: 'Notes',
    }
  );
};