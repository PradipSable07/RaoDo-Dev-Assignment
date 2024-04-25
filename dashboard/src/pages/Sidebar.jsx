import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from   '@mui/material/Collapse';

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{ width: 250, padding: '10px' }}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon />
              <ListItemText primary="All Orders" />
            </ListItem>
            <ListItem button>
              <ListItemIcon />
              <ListItemText primary="Pending Orders" />
            </ListItem>
            <ListItem button>
              <ListItemIcon />
              <ListItemText primary="Completed Orders" />
            </ListItem>
          </List>
        </Collapse>

      </List>
    </div>
  );
};

export default Sidebar;
