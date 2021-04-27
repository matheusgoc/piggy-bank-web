import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useHistory } from "react-router-dom"
import { Alert } from '@material-ui/lab'
import ProfileService from '../../services/ProfileService'
import { useDispatch } from 'react-redux'
import { setProfile } from './ProfileSlice'

interface SigInFormI {
  email: string
  password: string
}

const SignIn = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = (values: SigInFormI) => {
    setLoading(true)
    const profileService = new ProfileService()
    profileService.signIn(values.email, values.password).then((profile) => {

      dispatch(setProfile(profile))
      history.push("/transactions")

    }).catch((error) => {

      setError("Email or password does not match!")
      console.error("SignIn.handleSubmit", error)

    }).finally(() => setLoading(false))
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" color="primary">Sign in</Typography>
        <form noValidate autoComplete="off" onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box display="flex" justifyContent="space-between" alignItems='center'>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Slide direction="left" in={loading} mountOnEnter unmountOnExit>
              <Box display="flex">
                <CircularProgress size={20} thickness={5} color="secondary" />
                <Typography color="secondary" style={{paddingLeft: 5}}>Authenticating...</Typography>
              </Box>
            </Slide>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">Don't have a profile? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Footer />
      <Snackbar
        open={error !== ''}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" style={{marginTop: '4em'}}>{error}</Alert>
      </Snackbar>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default SignIn