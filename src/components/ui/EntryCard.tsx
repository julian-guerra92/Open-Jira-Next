import { DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';

interface Props {
   entry: Entry
}

export const EntryCard = ({ entry }: Props) => {

   const { setIsDraggingEntry } = useContext(UIContext)

   const router = useRouter();

   const onDragStart = (event: DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData('text', entry._id);
      setIsDraggingEntry(true);
   }

   const onDragEnd = () => {
      setIsDraggingEntry(false);
   }

   const onClick = () => {
      router.push(`/entries/${entry._id}`);
   }

   return (
      <Card
         onClick={onClick}
         sx={{ marginBottom: 1 }}
         draggable
         onDragStart={onDragStart}
         onDragEnd={onDragEnd}
      >
         <CardActionArea>
            <CardContent>
               <Typography sx={{ whiteSpace: 'pre-line' }}>
                  {entry.description}
               </Typography>
            </CardContent>
            <CardActions
               sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  paddingRight: 2
               }}
            >
               <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
            </CardActions>
         </CardActionArea>
      </Card>
   )
}
