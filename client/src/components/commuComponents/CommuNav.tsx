import {
  IconButton,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu';
import StoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Async from 'react-async';

export default function CommuNav() {
  async function getBoardName() {
    let res = await axios.get('http://localhost:4000/board/read');
    let boardData = res.data.data;
    return boardData;
  }
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('lg'));

  const toggleDrawer =
    //이거 안됨 open 쓰면 안됨
    // (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event as React.KeyboardEvent).key === 'Tab'
      ) {
        return;
      }
      setOpen(!open);
    };
  const drawerWidth = 300;

  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={toggleDrawer}
        sx={{
          p: 2,
          [theme.breakpoints.up('lg')]: { display: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant={isMdUp ? 'permanent' : 'temporary'}
        // anchor='left'
        open={open}
        onClose={toggleDrawer}
        sx={{ width: drawerWidth }}
      >
        <List sx={{ mt: 10, p: 3 }}>
          <Button fullWidth>게시판 만들기</Button>
          <Divider sx={{ mt: 2, mb: 2 }} />

          <ListItem component={Link} to='/review' button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary={'Music Review'} />
          </ListItem>

          <Async promiseFn={getBoardName}>
            {({ data, error, isPending }) => {
              if (isPending) return 'Pending...';
              if (error) return `Something went wrong: ${error.message}`;

              const boardList = data.map((el: any, index: number) => {
                return (
                  <>
                    <ListItem
                      component={Link}
                      to={`/community/${el._id}`}
                      button
                      key={index}
                    >
                      <ListItemIcon>
                        <KeyboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={el.title} />
                    </ListItem>
                  </>
                );
              });
              return <>{boardList}</>;
            }}
          </Async>
          <Divider sx={{ mt: 2, mb: 2 }} />

          <ListItem button>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary={'Music Market'} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}