
import { useContext } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';

export const Navbar = () => {

   const { openSideMenu } = useContext(UIContext);

   return (
      <AppBar position='sticky'>
         <Toolbar>
            <IconButton
               size='large'
               onClick={openSideMenu}
               sx={{ mr: 2 }}
            >
               <MenuOutlinedIcon fontSize='large' />
            </IconButton>
            <Typography variant='h5'>OpenJira</Typography>
         </Toolbar>
      </AppBar>
   )
}
