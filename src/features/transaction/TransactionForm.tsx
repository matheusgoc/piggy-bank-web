import React, { useState } from 'react'
import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  createStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TransactionModel } from '../../models/TransactionModel'
import NumberFormatCustom from '../../components/NumberFormatCustom'
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { AddAPhoto, Close, Done, MonetizationOnOutlined } from '@material-ui/icons'
import { Theme } from '@material-ui/core/styles'
import { categoriesSamples } from '../../generators'
import TransactionService from '../../services/TransactionService';

interface TransactionFormProps {
  transaction: TransactionModel
  onSave(): void
  onClose(): void
}

const filter = createFilterOptions<string>();

const TransactionForm = ({transaction, onSave, onClose}: TransactionFormProps) => {

  const classes = useStyles()
  const theme = useTheme()

  const [loading, setLoading] = useState(false)

  const extractTimestamp = (transaction: TransactionModel) => {
    if (transaction.orderTime) {
      transaction.orderDate.setHours(
        transaction.orderTime.getHours(),
        transaction.orderTime.getMinutes(),
        transaction.orderTime.getSeconds(),
      )
    }

    return transaction.orderDate.getTime()
  }

  const handleSubmit = (transaction: TransactionModel) => {

    setLoading(true)
    const transactionService = new TransactionService()

    // set timestamp
    transaction.timestamp = extractTimestamp(transaction)

    // adjust amount
    transaction.amount = Math.abs(transaction.amount)
    if ((transaction.type === 'E')) {
      transaction.amount = -transaction.amount
    }

    transactionService.save(transaction).then(() => {

      onSave()

    }).catch((error) => {

      console.error('TransactionForm.handleSubmit', error)

    }).finally(() => {
      setLoading(false)
    })
  }

  const validationSchema = Yup.object({
    type: Yup.string()
      .required('Required'),
    category: Yup.string().nullable()
      .required('Required'),
    amount: Yup.number().nullable()
      .required('Required'),
    orderDate: Yup.date().nullable()
      .required('Required'),
    place: Yup.string().nullable()
      .max(45, "45 characters at most"),
    description: Yup.string().nullable()
      .max(244, "244 characters at most"),
  })

  const formik = useFormik({
    initialValues: {
      ...transaction,
      amount: (transaction.amount === 0)? '' : Math.abs(transaction.amount)
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Container component="main" maxWidth="sm" disableGutters={true} className={classes.container}>
      {(loading)? <LinearProgress color="secondary" style={{width:"100%"}} /> : null}
      <Box className={classes.header}>
        <MonetizationOnOutlined  style={{color: theme.palette.common.white}} />
        <Typography component="h1" variant='h6' style={{color: theme.palette.common.white}}>
          {(formik.values.id)? "Edit Transaction" :  "Add Transaction"}
        </Typography>
        <IconButton aria-label="delete" size="small" onClick={onClose} disabled={loading}>
          <Close style={{color: theme.palette.common.white}} />
        </IconButton>
      </Box>
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ButtonBase className={classes.receipt} focusRipple>
              <AddAPhoto color="primary" fontSize="large" />
              <Typography color="primary">Receipt Picture</Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Type *</FormLabel>
                <RadioGroup aria-label="type" name="type" value={formik.values.type} onChange={formik.handleChange}>
                  <FormControlLabel value="E" label="Expense"
                    style={{color: theme.palette.error.dark}}
                    control={
                      <Radio style={{color: theme.palette.error.dark}} />
                    }
                  />
                  <FormControlLabel value="I" label="Income"
                    style={{color: theme.palette.success.dark}}
                    control={
                      <Radio style={{color: theme.palette.success.dark}} />
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="category"
                freeSolo openOnFocus blurOnSelect
                options={categoriesSamples}
                getOptionLabel={(category) => category}
                value={formik.values.category}
                onChange={(event, category: string) => {
                  formik.setFieldValue('category', category)
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params)
                  if (params.inputValue !== '' && filtered.indexOf(params.inputValue) === -1) {
                    filtered.push(params.inputValue)
                  }

                  return filtered;
                }}
                renderInput={(props) =>
                  <TextField
                    {...props}
                    name="category"
                    label="Categories"
                    required fullWidth
                    variant="outlined"
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="amount"
                label="Total"
                required fullWidth
                variant="outlined"
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="place"
                label="Place or Name"
                placeholder="Where?"
                fullWidth
                variant="outlined"
                value={formik.values.place}
                onChange={formik.handleChange}
              />
            </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="orderDate"
                label="Date"
                format="MM/dd/yyyy"
                variant="dialog"
                inputVariant='outlined'
                autoOk clearable required
                error={formik.touched.orderDate && Boolean(formik.errors.orderDate)}
                helperText={formik.touched.orderDate && formik.errors.orderDate}
                animateYearScrolling
                placeholder="MM/DD/YYYY"
                KeyboardButtonProps={{'aria-label': 'change transaction date', style: {padding: 0}}}
                value={formik.values.orderDate}
                onChange={date => formik.setFieldValue('orderDate', date)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                name="orderTime"
                label="Time"
                format="HH:mm"
                variant="dialog"
                inputVariant='outlined'
                autoOk clearable
                error={formik.touched.orderTime && Boolean(formik.errors.orderTime)}
                helperText={formik.touched.orderTime && formik.errors.orderTime}
                placeholder="HH:MM"
                KeyboardButtonProps={{'aria-label': 'change transaction time', style: {padding: 0}}}
                value={formik.values.orderTime}
                onChange={time => formik.setFieldValue('orderTime', time)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              placeholder="What?"
              multiline fullWidth
              variant="outlined"
              value={formik.values.description}
              onChange={event => {
                formik.setFieldValue(
                  'description',
                  event.target.value.replace('\n', '')
                )
              }}
            />
          </Grid>
        </Grid>
        <Box className={classes.footer}>
          <Button onClick={onClose}
            disabled={loading}
            variant="contained"
            startIcon={<Close />}>
            Cancel
          </Button>
          <Slide direction="up" in={loading} mountOnEnter unmountOnExit>
            <Box display="flex" alignItems='center'>
              <CircularProgress size={20} thickness={5} color="secondary" />
              <Typography component="span" variant="subtitle2" color="secondary" style={{paddingLeft: 5}}>
                Saving...
              </Typography>
            </Box>
          </Slide>
          <Button
            type='submit'
            variant="contained"
            disabled={loading}
            startIcon={<Done />}
            color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
      height: "100%",
      overflow: "auto",
    },
    grid: {
      marginTop: "3.5em",
      marginBottom: "5em",
      padding: theme.spacing(0, 1),
    },
    header: {
      position: "fixed", padding: theme.spacing(0, 0, 0, 1),
      display: "flex", justifyContent: "space-between", alignItems: "center",
      height: "3em", width: "100%", zIndex: 2,
      backgroundColor: theme.palette.primary.main,
      borderBottom: "1px solid rgba(0,0,0,.1)",
    },
    footer: {
      position: "fixed", bottom: 0, padding: theme.spacing(0, 1),
      display: "flex", justifyContent: "space-between", alignItems: "center",
      height: "3.5em", width: "100%", zIndex: 2,
      backgroundColor: theme.palette.background.default,
      borderTop: "1px solid rgba(0,0,0,.1)",
    },
    receipt: {
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      backgroundColor: theme.palette.grey.A100,
      borderRadius: 10,
      height: "90%", width: "70%",
      [theme.breakpoints.down('sm')]: {
        width: "100%",
      }
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
)

export default TransactionForm