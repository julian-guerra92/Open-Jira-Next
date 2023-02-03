import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
   | { type: 'Entries - Add Entry', payload: Entry }
   | { type: 'Entries - Entry Uppdated', payload: Entry }
   | { type: 'Entries - Load Data', payload: Entry[] }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
   switch (action.type) {
      case 'Entries - Add Entry':
         return {
            ...state,
            entries: [...state.entries, action.payload]
         }
      case 'Entries - Entry Uppdated':
         return {
            ...state,
            entries: state.entries.map(entry => {
               if (entry._id === action.payload._id) {
                  entry.status = action.payload.status;
                  entry.description = action.payload.description;
               }
               return entry;
            })
         }
      case 'Entries - Load Data':
         return {
            ...state,
            entries: [...action.payload]
         }
      default:
         return state;
   }
}


//!El reducer es una funciín pura, por lo cual no se debe utilizar y llamar funciones externas a esta. Solamente debe ejecutarse con los argumentos propios de la función;