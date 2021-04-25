import { Box, Button, Typography, useTheme } from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface TransactionListEmptyStateProps {
  onAdd(): void
}

const TransactionListEmptyState = ({onAdd}: TransactionListEmptyStateProps) => {
  const theme = useTheme()
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height={'20em'}>
      <Warning fontSize="large" style={{color:theme.palette.grey.A200}} />
      <Typography variant="subtitle1" style={{color:theme.palette.grey['600']}}>No transactions this month!</Typography>
      <Button
        variant="contained"
        onClick={onAdd}
        startIcon={<AddCircleOutlineIcon />}>
        Add Transaction
      </Button>
    </Box>
  )
}

export default TransactionListEmptyState