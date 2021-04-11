import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Box, Card, CardContent, CardMedia, Container, Grid, Link } from '@material-ui/core'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const HomeView = () => {
  const [cards, setCards] = useState([
    {title: 'Track your expenses', image: 'images/home01.png', imageAlt: 'Coins plant'},
    {title: 'Manage your transactions', image: 'images/home02.png', imageAlt: 'Coins plant'},
    {title: 'Analyse your savings and outgoings', image: 'images/home03.jpg', imageAlt: 'Coins plant'},
  ])
  const classes = useStyles()
  return (
    <>
      <Header />
      <Container maxWidth={'md'} className={classes.container}>
        <Box className={classes.box}>
          <Typography variant='h2' component='h1' className={classes.title}>Ready to save money?</Typography>
          <Button href="/signup"
            variant={'contained'}
            color="primary"
            disableElevation
          >Sign Up</Button>
        </Box>
        <Grid container direction={'row'} justify={'center'} alignItems={'center'} spacing={4}>
        {cards.map(({title, image, imageAlt}) => (
          <Grid item md={4} sm={6} xs={12}>
            <Card>
              <CardMedia
                style={{height: '200px'}}
                image={image}
                title={imageAlt}
              />
              <CardContent>
                <Typography align="center" variant="body2" component="h2">
                  {title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: '1em',
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '25em',
    },
    title: {
      fontWeight: theme.typography.fontWeightLight,
      color: theme.palette.primary.dark,
      paddingBottom: '.5em',
      textAlign: 'center'
    },
  }),
);

export default HomeView