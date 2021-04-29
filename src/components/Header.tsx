import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import React, { Fragment, useState } from 'react'
import { useHistory } from "react-router-dom"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { Backdrop, Box, CircularProgress, Link } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, clearProfile } from '../features/profile/ProfileSlice'
import { clearReports } from '../features/reports/ReportsSlice'
import { clearTransactionList } from '../features/transaction/TransactionSlice'
import ProfileService from '../services/ProfileService'

interface NavItemI {
  label: string,
  uri?: string,
  action?(): void,
  icon: JSX.Element,
}

interface HeaderProps {
  children?: React.ReactElement;
}

const Header = (props: HeaderProps) => {

  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = useSelector(getToken)

  const handleSignOut = () => {
    const profileService = new ProfileService()
    setLoading(true)
    profileService.signOut().then(() => {
      console.log("Header.handleSignOut: User has been logged out");
    }).catch((error) => {
      console.error("Header.handleSignOut: "+error);
    }).finally(() => {
      dispatch(clearProfile())
      dispatch(clearReports())
      dispatch(clearTransactionList())
      setNav(getNav())
      setMenuOpen(false)
      setLoading(false)
      history.push('/')
    })
  }

  const getNav = (): NavItemI[][] => {
    return (token)? [
      [
        {label: "Home", uri: "/", icon: <InboxIcon />},
      ],
      [
        {label: "Transactions", uri: "/transactions", icon: <InboxIcon />},
        {label: "Add Transactions", uri: "/transactions/add", icon: <InboxIcon />},
      ],
      [
        {label: "Sign Out", uri: "#a", icon: <InboxIcon />, action: handleSignOut},
      ]
    ] : [
      [
        {label: "Home", uri: "/", icon: <InboxIcon />},
      ],
      [
        {label: "Sign In", uri: "/signin", icon: <InboxIcon />},
        {label: "Sign Up", uri: "/signup", icon: <InboxIcon />},
      ]
    ]
  }
  const [nav, setNav] = useState(getNav())
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)

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
            <img src={"/logo-white-vertical.png"} className={classes.logo} alt="Piggy Bank Logo" />
          </Link>
          {(token)
            ? <Button color="inherit" href='#a' onClick={handleSignOut}>Sign Out</Button>
            : <Button color="inherit" href='/signin'>Sign In</Button>
          }
        </Toolbar>
      </AppBar>
      <Box height="5em" />
      <Drawer anchor='left' open={isMenuOpen} onClose={() => {setMenuOpen(false)}}>
        {nav.map((links, index) => (
          <Fragment key={index}>
            <List>
              {links.map(({label, uri, icon, action}, index2) => (
                <ListItem button component='a' href={uri} key={index2}
                  onClick={() => (action)? action : setMenuOpen(false)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              ))}
            </List>
            {(index < nav.length - 1)? <Divider /> : null}
          </Fragment>
        ))}
      </Drawer>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export default Header