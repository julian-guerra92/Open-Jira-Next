
import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {

   const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

   return (
      <Drawer
         anchor="left"
         open={sidemenuOpen}
         onClose={() => closeSideMenu()}
      >
         <Box sx={{ width: 250 }}>
            <Box sx={{ padding: '5px 10px' }}>
               <Typography variant="h4">Menu</Typography>
            </Box>
            <List>
               {
                  menuItems.map((text, index) => (
                     <ListItem key={text} disablePadding>
                        <ListItemButton>
                           <ListItemIcon>
                              {index % 2 ? <ArchiveOutlinedIcon /> : <EmailOutlinedIcon />}
                           </ListItemIcon>
                           <ListItemText primary={text} />
                        </ListItemButton>
                     </ListItem>
                  ))
               }
            </List>
            <Divider />
            <List>
               {
                  menuItems.map((text, index) => (
                     <ListItem key={text} disablePadding>
                        <ListItemButton>
                           <ListItemIcon>
                              {index % 2 ? <ArchiveOutlinedIcon /> : <EmailOutlinedIcon />}
                           </ListItemIcon>
                           <ListItemText primary={text} />
                        </ListItemButton>
                     </ListItem>
                  ))
               }
            </List>
         </Box>
      </Drawer>
   )
}
