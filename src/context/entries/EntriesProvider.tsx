import { useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';

export interface EntriesState {
   entries: Entry[];
}

interface Props {
   children: JSX.Element | JSX.Element[];
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: []
}

export const EntriesProvider = ({ children }: Props) => {

   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

   const { enqueueSnackbar } = useSnackbar();

   const loadEntries = async () => {
      const { data } = await entriesApi.get<Entry[]>('/entries');
      dispatch({ type: 'Entries - Load Data', payload: data });
   }

   const addNewEntry = async (description: string) => {
      const { data } = await entriesApi.post('/entries', { description });
      dispatch({ type: 'Entries - Add Entry', payload: data });
   }

   const updateEntry = async (entry: Entry, showSnackbar = false) => {
      try {
         const { _id, description, status } = entry;
         const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
         dispatch({ type: 'Entries - Entry Uppdated', payload: data });
         if (showSnackbar) {
            enqueueSnackbar('Successfully Updated Entry!', {
               variant: 'success',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               }
            })
         }
      } catch (error) {
         console.log({ error });
      }
   }

   //*Carga las entradas al iniciar la App desde la BD
   useEffect(() => {
      loadEntries();
   }, []);

   return (
      <EntriesContext.Provider value={{
         ...state,
         //Methods
         addNewEntry,
         updateEntry
      }}>
         {children}
      </EntriesContext.Provider>
   )
}