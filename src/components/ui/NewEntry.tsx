import { ChangeEvent, useState, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/';


export const NewEntry = () => {

   const [inputValue, setInputValue] = useState('');

   const [touched, setTouched] = useState(false);

   const { addNewEntry } = useContext(EntriesContext);

   const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

   const onToggleForm = () => {
      setIsAddingEntry(!isAddingEntry);
   }

   const onTochedField = () => {
      setTouched(true);
   }

   const onTextFieldChanges = ({ target }: ChangeEvent<HTMLInputElement>) => {
      setInputValue(target.value);
   }

   const onSave = () => {
      if (inputValue.length === 0) return;
      addNewEntry(inputValue);
      setInputValue('');
      setTouched(false);
      setIsAddingEntry(false);
   }

   return (
      <Box sx={{ marginBottom: 2, paddingx: 2 }}>
         {
            isAddingEntry ?
               (
                  <>
                     <TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder='New Entry'
                        multiline
                        label='New Entry'
                        helperText={inputValue.length <= 0 && touched && 'Enter a new value'}
                        error={inputValue.length <= 0 && touched}
                        value={inputValue}
                        onChange={onTextFieldChanges}
                        onBlur={onTochedField}
                     />
                     <Box display='flex' justifyContent='space-between'>
                        <Button
                           variant='text'
                           color='warning'
                           onClick={onToggleForm}
                        >
                           Cancel
                        </Button>
                        <Button
                           variant='outlined'
                           color='secondary'
                           endIcon={<SaveAsOutlinedIcon />}
                           onClick={onSave}
                        >
                           Save
                        </Button>
                     </Box>
                  </>
               )
               : (
                  <Button
                     startIcon={<AddCircleOutlineOutlinedIcon />}
                     fullWidth
                     variant='outlined'
                     onClick={onToggleForm}
                  >
                     Add Activity
                  </Button>
               )
         }
      </Box>
   )
}
