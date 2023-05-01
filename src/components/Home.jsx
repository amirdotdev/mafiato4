/* eslint-disable no-unused-vars */
// import { Button, Stack } from '@mui/material'
// import { useNavigate } from 'react-router-dom'
// const Home = () => {
//   const navigate = useNavigate()
//   return (
//     <Stack>
//       <Button onClick={() => navigate('/names')}>Names</Button>
//       <Button onClick={() => navigate('/roles')}>Roles</Button>
//     </Stack>
//   )
// }

// export default Home

import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import styles from './Home.module.css'
import MyButton from './MyButton'

function Home() {
  return (
    <div className={styles.homepageContainer}>
      <AppBar
        position="static"
        sx={{
          background:
            ' linear-gradient(to right, rgba(255,255,255,1), rgba(0,0,0,0))',
          boxShadow:
            '  rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)  ',
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              background:
                'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5))  ',
              backgroundClip: 'text',
              color: 'transparent',
              maskImage: 'linear-gradient(to right, #fff 0%, #fff 40%)  ',
              fontFamily: 'IranSans',
              fontWeight: '500',
            }}
          >
            مافیاتو{' '}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={styles.homepageContent}>
        <MyButton
          variant="contained"
          color="primary"
          href="/names"
          sx={{
            fontSize: '2rem',
            padding: '0.2rem 2rem',
            fontFamily: 'IranSans',
            fontWeight: 'bold',
          }}
          className={styles.startButton}
        >
          چیدن کارت ها
        </MyButton>
      </div>
    </div>
  )
}

export default Home
