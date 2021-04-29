import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Slide,
  Toolbar,
  Typography, useTheme
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ArrowBack, ArrowForward, DeleteForever } from '@material-ui/icons';
import moment from 'moment';
import SearchIcon from '@material-ui/icons/Search';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { getCurrentDate, setCurrentDate } from '../features/transaction/TransactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneralReport, getMonthlyReport } from '../features/reports/ReportsSlice';
import { getProfile } from '../features/profile/ProfileSlice';
import { formatCurrency } from '../helpers';

interface TransactionListHeaderProps {
  loading: boolean
  isRemoveEnabled: boolean
  isRemoveButtonDisabled: boolean
  onAdd(): void
  onChangeMonth(year: string, month: string): void
  onRemove(): void
}

const TransactionListHeader = (props: TransactionListHeaderProps) => {

  const {loading, onAdd, onChangeMonth, onRemove, isRemoveEnabled, isRemoveButtonDisabled} = props

  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()

  const generalReport = useSelector(getGeneralReport)
  const monthlyReport = useSelector(getMonthlyReport)
  const currentDate = useSelector(getCurrentDate)
  const profile = useSelector(getProfile)

  const changeMonth = (direction: 'before'|'after') => {
    if (loading) return
    const date = moment(currentDate)
    switch (direction) {
      case 'before':
        date.subtract(1, 'months')
        break
      case 'after':
        date.add(1, 'months')
        break
    }
    dispatch(setCurrentDate(date.toDate()))
    onChangeMonth(date.format('YYYY'), date.format('MM'))
  }

  const showBalance = () => {

    let monthlyIncomes = monthlyReport.incomes
    let monthlyExpenses = monthlyReport.expenses
    const generalBalance = generalReport.incomes - generalReport.expenses + profile.balance
    const monthlyBalance = monthlyIncomes - monthlyExpenses
    const prevMonthBalance = generalBalance - monthlyBalance
    if (prevMonthBalance > 0) {
      monthlyIncomes += prevMonthBalance
    } else {
      monthlyExpenses -= prevMonthBalance
    }

    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="body2" color={(generalBalance < 0)? 'error' : 'primary'} style={{fontWeight: 'bold'}}>
          Balance
          {
            (generalBalance < 0)
              ? ' -(' + formatCurrency(Math.abs(generalBalance)) + ')'
              : ' ' + formatCurrency(generalBalance)
          }
        </Typography>
        <Typography variant="body2" color={(generalBalance < 0)? 'error' : 'primary'}>
          {formatCurrency(monthlyIncomes)} - {formatCurrency(monthlyExpenses)}
        </Typography>
      </Box>
    )
  }

  return (
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
            onClick={onAdd}>
            Add
          </Button>
        </Box>
        <AppBar position="static" elevation={1} className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.navButton} onClick={() => changeMonth('before')}>
              <ArrowBack color='primary'/>
            </IconButton>
            <Typography variant="h5" color='primary'>
              {moment(currentDate).format('MMMM')} {moment(currentDate).format('YYYY')}
            </Typography>
            <IconButton className={classes.navButton} onClick={() => changeMonth('after')}>
              <ArrowForward color='primary'/>
            </IconButton>
          </Toolbar>
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.navButton}>
              <SearchIcon color='primary' />
            </IconButton>
            {showBalance()}
            <IconButton
              className={classes.navButton}
              onClick={onRemove}
              disabled={isRemoveButtonDisabled}>
              {
                (isRemoveEnabled)?
                  <DeleteForever style={{color: theme.palette.error.dark}} /> :
                  <DeleteSweepIcon color='primary' />
              }
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  )
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
}))

export default TransactionListHeader