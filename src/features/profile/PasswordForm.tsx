import { ProfileModel } from '../../models/ProfileModel'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Box, Button, CircularProgress, Grid, Slide, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { AccountCircle, ArrowBack } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, clearProfile } from './ProfileSlice';
import ProfileService from '../../services/ProfileService';

interface SavingsPlanFormProps {
  onBack(): void
}

const PasswordForm = ({onBack}: SavingsPlanFormProps) => {

  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const profile = useSelector(getProfile)
  const dispatch = useDispatch()

  const handleSubmit = (profileToSave: ProfileModel) => {
    setLoading(true)
    const profileService = new ProfileService()
    profileService.save(profileToSave).then((profileSaved) => {

      dispatch(clearProfile())
      history.push("/signin")

    }).catch((error) => {

      console.error("PasswordForm.handleSubmit", error)

    }).finally(() => setLoading(false))
  }

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Too short')
      .required('Required'),
    confirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Password does not match')
      .required('Required'),
  })

  const formik = useFormik({
    initialValues: profile,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} style={{marginTop: "20px"}}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your new password"
            autoComplete="current-password"
            required fullWidth
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="confirmation"
            name="confirmation"
            label="Confirmation"
            type="password"
            placeholder="Confirm your new password"
            autoComplete="current-password"
            required fullWidth
            variant="outlined"
            value={formik.values.confirmation}
            onChange={formik.handleChange}
            error={formik.touched.confirmation && Boolean(formik.errors.confirmation)}
            helperText={formik.touched.confirmation && formik.errors.confirmation}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center"  flexWrap="wrap">
            <Button
              type='button'
              onClick={onBack}
              disabled={loading}
              startIcon={<ArrowBack />}>
              Back
            </Button>
            <Button
              type='submit'
              variant="contained"
              startIcon={<AccountCircle />}
              disabled={loading}
              color="primary">
              Create my profile
            </Button>
            <Slide direction="left" in={loading} mountOnEnter unmountOnExit>
              <Box display="flex" ml="10px" mt="10px">
                <CircularProgress size={20} thickness={5} color="secondary" />
                <Typography color="secondary" style={{paddingLeft: 5}}>Saving...</Typography>
              </Box>
            </Slide>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default PasswordForm