import {
  Avatar,
  Box, Fade,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  useTheme
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { TransactionModel } from '../models/TransactionModel'
import moment from 'moment'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { formatCurrency } from '../helpers';
import { RemoveCircle } from '@material-ui/icons';

interface TransactionListItemProps {
  transaction: TransactionModel
  isRemoveEnable: boolean
  onClick(): void
  onRemove(): void
}


const TransactionListItem = ({transaction, isRemoveEnable, onClick, onRemove}: TransactionListItemProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const { timestamp, category, place, amount } = transaction
  const month = moment(timestamp).format('MMM')
  const day = moment(timestamp).format('DD')
  const time = moment(timestamp).format('hh:mma')
  const amountFormat = formatCurrency(Number(amount))
  const handleOnClick = () => {
    if (isRemoveEnable) {
      console.log("remove transaction")
      onRemove()
    } else {
      console.log("edit transaction")
      onClick()
    }
  }
  return (
    <ListItem
      button
      divider={true}
      onClick={handleOnClick}>
      <Fade in={isRemoveEnable} mountOnEnter unmountOnExit>
        <ListItemIcon>
          <IconButton>
            <RemoveCircle style={{color: theme.palette.error.dark}} />
          </IconButton>
        </ListItemIcon>
      </Fade>
      <ListItemAvatar>
        <Avatar variant='circular' className={classes.itemAvatar}>
          <Typography variant='button'>{month}</Typography>
          <Typography variant='button'>{day}</Typography>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant='subtitle2'>{category}</Typography>}
        secondary={<Typography variant='caption'>{place || '--'}</Typography>}
      />
      <ListItemSecondaryAction>
        <Box display='flex' alignItems='center' style={{fontWeight: 'bold'}}
             color={(amount > 0)? theme.palette.success.dark :  theme.palette.error.dark}>
          <span>{amountFormat}</span>
          {(amount > 0)?
            (<FontAwesomeIcon icon={faCaretUp} size="lg" style={{marginLeft: '3px'}} />) :
            (<FontAwesomeIcon icon={faCaretDown} size="lg"  style={{marginLeft: '3px'}} />)}
        </Box>
        <Typography component="div" variant="caption" style={{fontWeight: 'bold', textAlign: 'right'}}>
          {time}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  itemAvatar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    border: '2px solid',
    borderColor: theme.palette.text.primary,
    paddingTop: 5,
    '& *': {
      color: theme.palette.text.primary,
      fontWeight: 'bold',
      fontSize: 13,
      textTransform: 'uppercase',
      padding: 0,
      margin: 0,
      lineHeight: 1,
    },
  },
}))

export default TransactionListItem