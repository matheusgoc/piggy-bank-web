import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  List,
  Modal,
  Paper,
  Slide,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core'
import { ArrowBack, ArrowForward, DeleteForever } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TransactionForm from './TransactionForm'
import { TransactionModel } from '../../models/TransactionModel'
import TransactionListItem from '../../components/TransactionListItem'
import { generateTransactionsList } from '../../generators';
import TransactionListItemSkeleton from '../../components/TransactionListItemSkeleton';
import TransactionListEmptyState from '../../components/TransactionListEmptyState';

const TransactionList = () => {
  const [loading, setLoading] = useState(false)
  const [isFormOpen, openForm] = useState(false)
  const [isRemoveEnable, enableRemove] = useState(false)
  const [isRemoveDialogOpen, openRemoveDialog] = useState(false)
  const [transactions, setTransactions]: [TransactionModel[], any] = useState([])
  const [transactionToEdit, setTransactionTotEdit] = useState(new TransactionModel())

  const classes = useStyles()
  const theme = useTheme()

  const load = () => {
    setLoading(true)
    setTimeout(() => {
      console.log("load transactions")
      setTransactions(generateTransactionsList())
      setLoading(false)
    }, 3000)
  }

  const edit = (transaction) => {
    setTransactionTotEdit(transaction)
    openForm(true)
  }

  const add = () => {
    setTransactionTotEdit(new TransactionModel())
    openForm(true)
  }

  const handleOnSave = () => {
    openForm(false)
    load()
  }

  const handleRemove = (transaction: TransactionModel) => {
    setTransactionTotEdit(transaction)
    openRemoveDialog(true)
  }

  const remove = () => {
    setLoading(true)
    setTimeout(() => {
      console.log('remove transaction', transactionToEdit)
      load()
      openRemoveDialog(false)
    }, 3000)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <Header/>
      <Box position="fixed" zIndex="1" width="100%">
        <Container maxWidth={"sm"} disableGutters={true}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            pt="1.5em"
            bgcolor={theme.palette.background.default}>
            <Typography variant='h6' color="primary" style={{paddingLeft: '1em'}}>Transactions</Typography>
            <Slide direction="down" in={loading} mountOnEnter unmountOnExit>
              <Box display="flex">
                <CircularProgress size={20} thickness={5} color="secondary" />
                <Typography color="secondary" style={{paddingLeft: 5}}>Loading...</Typography>
              </Box>
            </Slide>
            <Button
              color="primary"
              className={classes.navButton}
              startIcon={<AddCircleOutlineIcon color='primary' />}
              onClick={add}>
              Add
            </Button>
          </Box>
          <AppBar position="static" elevation={1} className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <IconButton className={classes.navButton}>
                <ArrowBack color='primary'/>
              </IconButton>
              <Typography variant="h5" color='primary'>April 2021</Typography>
              <IconButton className={classes.navButton}>
                <ArrowForward color='primary'/>
              </IconButton>
            </Toolbar>
            <Toolbar className={classes.toolbar}>
              <IconButton className={classes.navButton}>
                <SearchIcon color='primary' />
              </IconButton>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Typography variant="body2" color='error' style={{fontWeight: 'bold'}}>
                  Balance -($4,505.33)
                </Typography>
                <Typography variant="body2" color='error'>
                  $500,00 - $5,004.33
                </Typography>
              </Box>
              <IconButton
                className={classes.navButton}
                onClick={() => {enableRemove(!isRemoveEnable)}}
                disabled={transactions.length === 0}>
                {
                  (isRemoveEnable)?
                  <DeleteForever style={{color: theme.palette.error.dark}} /> :
                  <DeleteSweepIcon color='primary' />
                }
              </IconButton>
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Container maxWidth="xs">
        <Paper elevation={1}>
          <Box style={{height: "14em"}} />
          {(transactions.length === 0 && loading)? (
            <TransactionListItemSkeleton total={5} />
          ) : (transactions.length === 0)? (
            <TransactionListEmptyState onAdd={add} />
          ) : (
            <List dense>
              {transactions.map((transaction: TransactionModel, index: number) => (
                <TransactionListItem
                  key={index}
                  isRemoveEnable={isRemoveEnable}
                  transaction={transaction}
                  onClick={() => edit(transaction)}
                  onRemove={() => handleRemove(transaction)}
                />
              ))}
            </List>
          )}
        </Paper>
      </Container>
      <Footer/>
      <Modal
        open={isFormOpen}
        onClose={() => openForm(false)}
        disableBackdropClick={true}
        aria-labelledby="Transaction Form"
        aria-describedby="A form to add or edit a transaction">
        <Fade in={isFormOpen}>
          <Paper elevation={24} className={classes.form}>
            <TransactionForm
              transaction={transactionToEdit}
              onSave={handleOnSave}
              onClose={() => openForm(false)} />
          </Paper>
        </Fade>
      </Modal>
      <Dialog
        open={isRemoveDialogOpen}
        onClose={() => {openRemoveDialog(false)}}
        disableBackdropClick={loading}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Remove Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>Are you sure you want to remove this transaction?</Typography>
            <List dense>
              <TransactionListItem
                transaction={transactionToEdit}
                isRemoveEnable={false}
                onClick={() => {}}
                onRemove={() => {}}
              />
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Slide direction="up" in={loading} mountOnEnter unmountOnExit>
            <Box display="flex">
              <CircularProgress size={20} thickness={5} color="secondary" />
              <Typography color="secondary" style={{paddingLeft: 5}}>Removing...</Typography>
            </Box>
          </Slide>
          <Button onClick={() => {openRemoveDialog(false)}} autoFocus disabled={loading}>
            No
          </Button>
          <Button onClick={remove} style={{color: theme.palette.error.dark}} disabled={loading}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  appbar: {
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.grey.A100,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  navButton: {
    height: '100%',
  },
  form: {
    position: "absolute",
    top: "55%", left: "50%",
    transform:"translate(-50%, -50%)",
    height: "80%",
    [theme.breakpoints.only('xs')]: {
      width: "95%"
    },
  },
}))

export default TransactionList