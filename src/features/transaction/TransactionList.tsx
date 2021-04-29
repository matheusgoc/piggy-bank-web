import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  List,
  Modal,
  Paper,
  Slide,
  Typography,
  useTheme,
} from '@material-ui/core'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TransactionForm from './TransactionForm'
import { TransactionModel } from '../../models/TransactionModel'
import TransactionListItem from '../../components/TransactionListItem'
import TransactionListItemSkeleton from '../../components/TransactionListItemSkeleton'
import TransactionListEmptyState from '../../components/TransactionListEmptyState'
import TransactionService from '../../services/TransactionService'
import moment from 'moment'
import { getCurrentDate, getTransactionList, setTransactionList } from './TransactionSlice'
import { setGeneralReport, setMonthlyReport } from '../reports/ReportsSlice'
import { useDispatch, useSelector } from 'react-redux'
import TransactionListHeader from '../../components/TransactionListHeader'
import { makeStyles, Theme } from '@material-ui/core/styles'

interface TransactionListProps {
  action?: string
}

const TransactionList = ({action}: TransactionListProps) => {

  const dispatch = useDispatch()
  const transactions = useSelector(getTransactionList)
  const currentDate = useSelector(getCurrentDate)

  const classes = useStyles()
  const theme = useTheme()

  const [loading, setLoading] = useState(false)
  const [isFormOpen, openForm] = useState(false)
  const [isRemoveEnabled, enableRemove] = useState(false)
  const [isRemoveDialogOpen, openRemoveDialog] = useState(false)
  const [transactionToEdit, setTransactionTotEdit] = useState(new TransactionModel())

  const load = (year?: string, month?: string) => {
    const transactionService = new TransactionService()
    if (!year || !month) {
      year = moment(currentDate).format('YYYY')
      month = moment(currentDate).format('MM')
    }
    setLoading(true)
    transactionService.load(year, month).then((data) => {
      dispatch(setGeneralReport(data.reports.general))
      dispatch(setMonthlyReport(data.reports.monthly))
      dispatch(setTransactionList(data.transactions))
    }).catch((error) => {
      console.error('TransactionList.load:' + error)
    }).finally(() => {
      setLoading(false)
    })
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
    const transactionService = new TransactionService()
    transactionService.delete(transactionToEdit).then(() => {
      load()
      openRemoveDialog(false)
    }).catch((error) => {
      console.error('TransactionList.remove', error)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    load()
    console.log(action)
    if (action === 'add') {
      openForm(true)
    }
  }, [])

  return (
    <>
      <Header/>
      <TransactionListHeader
        loading={loading}
        isRemoveEnabled={isRemoveEnabled}
        isRemoveButtonDisabled={transactions.length === 0}
        onAdd={add}
        onChangeMonth={(year, month) => load(year, month)}
        onRemove={() => enableRemove(!isRemoveEnabled)}
      />
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
                  isRemoveEnabled={isRemoveEnabled}
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
                isRemoveEnabled={false}
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