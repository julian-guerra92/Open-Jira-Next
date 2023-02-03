
import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';

export const Navbar = () => {

   const { openSideMenu } = useContext(UIContext);

   return (
      <AppBar position='sticky'>
         <Toolbar variant='dense'>
            <IconButton
               size='medium'
               onClick={openSideMenu}
               sx={{ mr: 2 }}
            >
               <MenuOutlinedIcon fontSize='medium' />
            </IconButton>
            <NextLink
               href={'/'}
               passHref
               style={{ color: 'white', textDecoration: 'none' }}
            >
               <Typography variant='h5' sx={{fontWeight: 'bold'}}>OpenJira</Typography>
            </NextLink>
         </Toolbar>
      </AppBar>
   )
}
