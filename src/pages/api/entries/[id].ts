
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
   | { message: string }
   | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   const { id } = req.query;
   if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID is not valid!' });
   }
   switch (req.method) {
      case 'PUT':
         return updateEntry(req, res);
      case 'GET':
         return getEntry(req, res);
      default:
         return res.status(400).json({ message: 'Endpoint does not exist!' });
   }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { id } = req.query;
   await db.connect();
   const entryToUpdate = await Entry.findById(id);
   if (!entryToUpdate) {
      await db.disconnect();
      return res.status(400).json({ message: `The ID ${id} does not exist!` });
   }
   const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;
   try {
      const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
      await db.disconnect();
      res.status(200).json(updatedEntry!);
   } catch (error: any) {
      console.log(error)
      await db.disconnect();
      res.status(400).json({ message: error.errors.status.message });
   }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { id } = req.query;
   await db.connect();
   const entry = await Entry.findById(id);
   await db.disconnect();
   if (!entry) {
      return res.status(400).json({ message: `The ID ${id} does not exist!` });
   }
   res.status(200).json(entry!);
}