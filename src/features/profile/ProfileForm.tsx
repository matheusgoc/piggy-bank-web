import React, { useState } from 'react'
import { Button, Grid, Hidden, MenuItem, TextField } from '@material-ui/core'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers'
import moment from 'moment'
import { ArrowForward } from '@material-ui/icons'
import { ProfileModel } from '../../models/ProfileModel'
import { US_STATES } from '../../constants'

interface ProfileFormProps {
  onSubmit(): void
}

const ProfileForm = ({onSubmit}: ProfileFormProps) => {
  const profile = new ProfileModel()
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
  })
  const formik = useFormik({
    initialValues: profile,
    validationSchema: validationSchema,
    onSubmit: (values: ProfileModel) => {
      console.log(values)
      onSubmit()
    },
  });

  return (
    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} style={{paddingTop: '1em'}}>
        <Grid item sm={6} xs={12}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            required fullWidth
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            required fullWidth
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            required fullWidth
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Hidden xsDown><Grid item sm={6} /></Hidden>
        <Grid item sm={4} xs={12}>
          <TextField
            id="gender"
            name="gender"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            select fullWidth
            variant="outlined">
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
          </TextField>
        </Grid>
        <Grid item sm={4} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="birthday"
              name="birthday"
              label="Birthday"
              format="MM/dd/yyyy"
              variant="dialog"
              inputVariant='outlined'
              autoOk
              clearable
              openTo="year"
              animateYearScrolling
              placeholder="MM/DD/YYYY"
              views={["year", "month", "date"]}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}

              maxDate={new Date()}
              maxDateMessage='Birthday must be less than today'
              initialFocusedDate={moment().subtract(20, 'years').date(1).month(0).toDate()}
              value={formik.values.birthday}
              onChange={date => {
                formik.setFieldValue('birthday', date)
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Hidden xsDown><Grid item sm={4} /></Hidden>
        <Grid item sm={4} xs={12}>
          <TextField
            id="state"
            name="state"
            label="State"
            value={formik.values.state}
            onChange={formik.handleChange}
            select fullWidth
            variant="outlined">
            <MenuItem value=""><em>None</em></MenuItem>
            {Object.entries(US_STATES).map(([abbr, name]) => (
              <MenuItem value={abbr} key={abbr}>{name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={4} xs={12}>
          <TextField
            id="city"
            name="city"
            label="City"
            placeholder="City name"
            fullWidth
            variant="outlined"
            value={formik.values.city}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <TextField
            id="postalCode"
            name="postalCode"
            label="Zip Code"
            placeholder="Enter Zip Code"
            fullWidth
            variant="outlined"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid xs={12} style={{marginTop: '1.5em'}}>
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

export default ProfileForm