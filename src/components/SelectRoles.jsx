/* eslint-disable no-unused-vars */
import { useStore } from '../store'
import { Grid, Paper, Box } from '@mui/material'
import { useState, useMemo } from 'react'
import SelectedRole from './SelectedRole'
import BasicModal from './Modal'
import MyButton from './MyButton'
const SelectRoles = () => {
  const [showRoles, setShowRoles] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerRole, setPlayerRole] = useState('')

  const names = useStore((state) => state.names)
  const roles = useStore((state) => state.roles)
  const players = useStore((store) => store.players)
  const resetPlayers = useStore((store) => store.resetPlayers)

  let selectedRoles = useMemo(() => [], [])
  roles
    .filter((role) => role.selected)
    .map((role) => {
      for (let i = 0; i < role.count; i++) {
        selectedRoles.push({ role: role.name, roleId: role.id })
      }
    })
  let shuffledRoles = useMemo(() => [...selectedRoles], [selectedRoles])
  useMemo(() => {
    for (let i = shuffledRoles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledRoles[i], shuffledRoles[j]] = [
        shuffledRoles[j],
        shuffledRoles[i],
      ]
    }
  }, [shuffledRoles])

  console.log(players, shuffledRoles.length)

  return (
    <>
      <BasicModal
        playerName={playerName}
        playerRole={playerRole}
        playerNameId={names.find((name) => name.name === playerName)?.id}
        playerRoleId={roles.find((role) => role.name === playerRole)?.id}
        open={showModal}
        handleClose={() => {
          setShowRoles(false)
          setShowModal(false)
        }}
      />
      <div
        style={{
          padding: '1rem',
          backgroundImage: 'url(./rose.webp)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          maxHeight: '100%',
          minHeight: '100vh',
        }}
      >
        <MyButton
          onClick={() => {
            window.location.reload()
            resetPlayers()
          }}
          variant="contained"
          color="primary"
          sx={{
            fontSize: '0.8rem',
            padding: '0.8rem 0.5rem',
            fontFamily: 'IranSans',
            fontWeight: 'bold',
            marginBottom: '1rem',
            backgroundColor: 'gold',
          }}
        >
          پخش کردن دوباره نقش ها{' '}
        </MyButton>
        <Grid container spacing={3}>
          {!showRoles &&
            names
              .filter(
                (name) =>
                  name.selected &&
                  !players.find((player) => player.playerNameId === name.id)
              )
              .map((name, index) => (
                <Grid
                  key={index}
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  onClick={() => {
                    setPlayerName(name.name)
                    setShowRoles(true)
                  }}
                >
                  <Paper style={{ padding: '16px', textAlign: 'center' }}>
                    {name.name}
                  </Paper>
                </Grid>
              ))}
          {shuffledRoles.map((role, index) => (
            <Grid
              key={index}
              item
              xs={6}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: `${showRoles ? 'block' : 'hidden'}` }}
            >
              <SelectedRole
                index={index}
                role={role.role}
                showRoles={showRoles}
                showModalHandler={() => {
                  setPlayerRole(role.role)
                  setShowModal(true)
                }}
              />
            </Grid>
          ))}
        </Grid>
        {players.length === shuffledRoles.length && (
          <Box
            sx={{
              marginTop: '1rem',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <MyButton
              variant="contained"
              color="primary"
              href="/god"
              sx={{
                fontSize: '0.8rem',
                padding: '0.8rem 0.8rem',
                fontFamily: 'IranSans',
                fontWeight: 'bold',
                backgroundColor: 'lightgreen',
              }}
            >
              ورود به صفحه راوی{' '}
            </MyButton>
            <MyButton
              variant="contained"
              color="primary"
              href="/roles"
              sx={{
                fontSize: '0.8rem',
                padding: '0.8rem 0.8rem',
                fontFamily: 'IranSans',
                fontWeight: 'bold',
              }}
            >
              انتخاب نقش ها{' '}
            </MyButton>
          </Box>
        )}
      </div>
    </>
  )
}

export default SelectRoles
