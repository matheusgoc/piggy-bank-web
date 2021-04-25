import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Container } from '@material-ui/core'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PasswordForm from './PassordForm'
import SavingsPlanForm from './SavingsPlanForm'
import ProfileForm from './ProfileForm'

const SignUp = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
  }
  const steps = [
    {label: 'Create my Profile', form: <ProfileForm onSubmit={handleNext} />},
    {label: 'Plan my Savings', form: <SavingsPlanForm onSubmit={handleNext} onBack={handleBack} />},
    {label: 'Define my Password', form: <PasswordForm onBack={handleBack} />},
  ]
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography variant='h4' align='center' color="primary" style={{marginTop: '2em'}}>Sign up</Typography>
        <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
          {steps.map(({label, form}, index) => (
            <Step key={label}>
              <StepLabel onClick={() => setActiveStep(index)}>{label}</StepLabel>
              <StepContent>{form}</StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&aposre finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </Container>
      <Footer />
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepper: {
      backgroundColor: 'transparent'
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
)

export default SignUp