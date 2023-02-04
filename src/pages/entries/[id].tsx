import { ChangeEvent, useState, useMemo, useContext } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import {
   Button,
   capitalize,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   IconButton,
   Radio,
   RadioGroup,
   TextField,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
   entry: Entry;
}

export const EntryPage = ({ entry }: Props) => {

   const { updateEntry, deleteEntry } = useContext(EntriesContext)

   const [inputValue, setInputValue] = useState(entry.description);

   const [status, setStatus] = useState<EntryStatus>(entry.status);

   const [touched, setTouched] = useState(false);

   const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

   const onTochedField = () => {
      setTouched(true);
   }

   const onTextFieldChanges = ({ target }: ChangeEvent<HTMLInputElement>) => {
      setInputValue(target.value);
   }

   const onStatusChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
      setStatus(target.value as EntryStatus);
   }

   const onSave = () => {
      if (inputValue.trim().length === 0) return;
      const updatedEntry: Entry = {
         ...entry,
         description: inputValue,
         status
      }
      updateEntry(updatedEntry, true);
   }

   const onDelete = () => {
      deleteEntry(entry, true);
   }

   return (
      <Layout title={`Entry - State: ${capitalize(status)}`}>
         <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
         >
            <Grid item xs={12} sm={8} md={6}>
               <Card>
                  <CardHeader
                     title={`Entry: ${capitalize(status)}`}
                     subheader={dateFunctions.getFormatDistanceToNow(entry.createdAt)}
                  />
                  <CardContent>
                     <TextField
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        fullWidth
                        placeholder='New Entry'
                        multiline
                        label='New Entry'
                        value={inputValue}
                        onBlur={onTochedField}
                        onChange={onTextFieldChanges}
                        helperText={isNotValid && 'Enter a new value'}
                        error={isNotValid}
                     />
                     <FormControl>
                        <FormLabel>Estate:</FormLabel>
                        <RadioGroup
                           row
                           value={status}
                           onChange={onStatusChanged}
                        >
                           {
                              validStatus.map(option => (
                                 <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={capitalize(option)}
                                 />
                              ))
                           }
                        </RadioGroup>
                     </FormControl>
                  </CardContent>
                  <CardActions>
                     <Button
                        startIcon={<SaveOutlinedIcon />}
                        variant='contained'
                        fullWidth
                        onClick={onSave}
                        disabled={inputValue.length <= 0}
                     >
                        Save
                     </Button>
                  </CardActions>
               </Card>
            </Grid>
         </Grid>
         <NextLink
            href={'/'}
            passHref
         >
            <IconButton
               sx={{
                  position: 'fixed',
                  bottom: 30,
                  right: 30,
                  backgroundColor: 'red'
               }}
               size='large'
               onClick={onDelete}
            >
               <DeleteOutlineOutlinedIcon fontSize='large' />
            </IconButton>
         </NextLink>
      </Layout>
   )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

   const { id } = params as { id: string };

   const entry = await dbEntries.getEntryById(id);

   if (!entry) {
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }

   return {
      props: {
         entry
      }
   }
}

export default EntryPage;
