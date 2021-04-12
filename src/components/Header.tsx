import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from '@material-ui/core';

interface NavItemI {
  label: string,
  url: string,
  icon: JSX.Element
}

const Header = () => {

  const classes = useStyles()

  const initialNav: NavItemI[][] = [
    [
      {label: "Home", url: "/", icon: <InboxIcon />},
    ],
    [
      {label: "Transactions", url: "/transactions", icon: <InboxIcon />},
      {label: "Add Transactions", url: "/transactions/add", icon: <InboxIcon />},
    ],
    [
      {label: "Sign In", url: "/signin", icon: <InboxIcon />},
      {label: "Sign Up", url: "/signup", icon: <InboxIcon />},
      {label: "Sign Out", url: "/signout", icon: <InboxIcon />},
    ]
  ];

  const [nav, setNav] = useState(initialNav)

  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            onClick={() => {setMenuOpen(true)}}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link href='\'>
            <img src={"/logo-white-vertical.png"} className={classes.logo} />
          </Link>
          <Button color="inherit" href='/signin'>Sign In</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={isMenuOpen} onClose={() => {setMenuOpen(false)}}>
        {nav.map((links, index) => (
          <>
            <List key={index}>
              {links.map(({label, url, icon}) => (
                <ListItem button key={label} component="a" href={url} onClick={() => setMenuOpen(false)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              ))}
            </List>
            {(index < nav.length - 1)? (<Divider />) : null}
          </>
        ))}
      </Drawer>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      maxHeight: '50px',
    },
    toolbar: {
      justifyContent: 'space-between',
    },
  }),
);

export default Header