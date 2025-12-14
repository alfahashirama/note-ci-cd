import { Request, Response } from 'express';
import { Note } from '../models/note.model';

export const listNotes = async (req: Request, res: Response) => {
  const notes = await Note.findAll();
  res.json(notes);
};

export const getNote = async (req: Request, res: Response) => {
  const note = await Note.findByPk(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note non trouvée' });
  res.json(note);
};

export const createNote = async (req: Request, res: Response) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const updateNote = async (req: Request, res: Response) => {
  const note = await Note.findByPk(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note non trouvée' });
  await note.update(req.body);
  res.json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  const note = await Note.findByPk(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note non trouvée' });
  await note.destroy();
  res.status(204).send();
};