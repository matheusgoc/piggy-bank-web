import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import React, { Fragment, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Box, Link } from '@material-ui/core';

interface NavItemI {
  label: string,
  url: string,
  icon: JSX.Element
}

interface HeaderProps {
  children?: React.ReactElement;
}

const Header = (props: HeaderProps) => {

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
      <AppBar position="fixed">
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
      <Box height="5em" />
      <Drawer anchor='left' open={isMenuOpen} onClose={() => {setMenuOpen(false)}}>
        {nav.map((links, index) => (
          <Fragment key={index}>
            <List>
              {links.map(({label, url, icon}, index2) => (
                <ListItem button component="a" href={url} key={index2}
                  onClick={() => setMenuOpen(false)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              ))}
            </List>
            {(index < nav.length - 1)? <Divider /> : null}
          </Fragment>
        ))}
      </Drawer>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& parent': {
        marginTop: '10em'
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      maxHeight: '4em',
    },
    toolbar: {
      height: '5em',
      justifyContent: 'space-between',
    },
  }),
);

export default Header