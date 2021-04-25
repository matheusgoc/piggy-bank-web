import React from 'react'
import { useFormik } from 'formik'
import { Button, Grid, Hidden, MenuItem, TextField, Typography } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { ProfileModel } from '../../models/ProfileModel'
import NumberFormatCustom from '../../components/NumberFormatCustom'

interface SavingsPlanFormProps {
  onSubmit(): void
  onBack(): void
}

const SavingsPlanForm = ({onSubmit, onBack}: SavingsPlanFormProps) => {
  const profile = new ProfileModel()
  const formik = useFormik({
    initialValues: profile,
    onSubmit: (values: ProfileModel) => {
      console.log(values)
      onSubmit()
    },
  })

  return (
    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item sm={12} style={{paddingLeft: 0, paddingBottom: "10px"}}>
          <Typography variant="subtitle2" color="primary">
            How much money have you saved or owed?
          </Typography>
        </Grid>
        <Grid item sm={3} xs={7}>
          <TextField
            id="balance"
            name="balance"
            label="Current Balance"
            fullWidth
            variant="outlined"
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            value={formik.values.balance}
            onChange={formik.handleChange}
            onFocus={() => {
              if (!formik.values.balance) {
                formik.setFieldValue('balance', '')
              }
            }}
            error={formik.touched.balance && Boolean(formik.errors.balance)}
            helperText={formik.touched.balance && formik.errors.balance}
          />
        </Grid>
        <Grid item sm={3} xs={5}>
          <TextField
            id="balanceSignal"
            name="balanceSignal"
            label=""
            value={formik.values.balanceSignal}
            onChange={formik.handleChange}
            error={formik.touched.balanceSignal && Boolean(formik.errors.balanceSignal)}
            helperText={formik.touched.balanceSignal && formik.errors.balanceSignal}
            select fullWidth
            variant="outlined">
            <MenuItem value='saved'>Saved</MenuItem>
            <MenuItem value='owed'>Owed</MenuItem>
          </TextField>
        </Grid>
        <Hidden smUp><Grid item xs={6} /></Hidden>
        <Grid item xs={12} style={{paddingLeft: 0, paddingBottom: "10px"}}>
          <Typography variant="subtitle1">TARGETS</Typography>
          <Typography variant="subtitle2" color="primary">
            How much money do you plan to save?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="targetTotalSavings"
            name="targetTotalSavings"
            label="Total Savings"
            fullWidth
            variant="outlined"
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            value={formik.values.targetTotalSavings}
            onChange={formik.handleChange}
            onFocus={() => {
              if (!formik.values.targetTotalSavings) {
                formik.setFieldValue('targetTotalSavings', '')
              }
            }}
            error={formik.touched.targetTotalSavings && Boolean(formik.errors.targetTotalSavings)}
            helperText={formik.touched.targetTotalSavings && formik.errors.targetTotalSavings}
          />
        </Grid>
        <Hidden smUp><Grid item sm={9} /></Hidden>
        <Grid item xs={12} style={{paddingLeft: 0, paddingBottom: "10px"}}>
          <Typography variant="subtitle2" color="primary">
            How much money do you plan to save by month?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="targetMonthlySavings"
            name="targetMonthlySavings"
            label="Monthly Savings"
            fullWidth
            variant="outlined"
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            value={formik.values.targetMonthlySavings}
            onChange={formik.handleChange}
            onFocus={() => {
              if (!formik.values.targetMonthlySavings) {
                formik.setFieldValue('targetMonthlySavings', '')
              }
            }}
            error={formik.touched.targetMonthlySavings && Boolean(formik.errors.targetMonthlySavings)}
            helperText={formik.touched.targetMonthlySavings && formik.errors.targetMonthlySavings}
          />
        </Grid>
        <Hidden smUp><Grid item sm={9} /></Hidden>
        <Grid xs={12} style={{paddingTop: "20px"}}>
          <Button
            type='button'
            onClick={onBack}
            startIcon={<ArrowBack />}>
            Back
          </Button>
          <Button
            type='submit'
            variant="contained"
            endIcon={<ArrowForward />}
            color="primary">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SavingsPlanForm