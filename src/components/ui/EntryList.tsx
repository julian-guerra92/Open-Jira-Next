
import { DragEvent, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import styles from './EntryList.module.css';

interface Props {
   status: EntryStatus;
}

export const EntryList = ({ status }: Props) => {

   const { entries, updateEntry } = useContext(EntriesContext);

   const { isDraggingEntry, setIsDraggingEntry } = useContext(UIContext)

   const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

   const allowDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
   }

   const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
      const id = event.dataTransfer.getData('text');
      const entry = entries.find(entry => entry._id === id)!;
      entry.status = status;
      updateEntry(entry);
      setIsDraggingEntry(false);
   }

   return (
      <div
         onDrop={onDropEntry}
         onDragOver={allowDrop}
         className={isDraggingEntry ? styles.dragging : ''}
      >
         <Paper
            sx={{
               minHeight: '200px',
               // overflow: 'auto',
               backgroundColor: 'transparent',
               padding: '2px 5px'
            }}
         >
            <List sx={{ opacity: isDraggingEntry ? 0.2 : 1, transition: 'all .3s' }}>
               {
                  entriesByStatus.map(entry => (
                     <EntryCard key={entry._id} entry={entry} />
                  ))
               }
            </List>
         </Paper>
      </div>
   )
}
