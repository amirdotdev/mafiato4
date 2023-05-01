/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Button, List, ListItem, ListItemText } from '@mui/material'
import { useStore } from '../store'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import MyButton from './MyButton'
import { Typography } from '@mui/material'

function God() {
  const [showRoles, setShowRoles] = useState(false)
  const toggleRoles = () => setShowRoles(!showRoles)

  const players = useStore((store) => store.players)
  const resetPlayers = useStore((store) => store.resetPlayers)
  const togglePlayerRole = (playerId) => {
    setPlayerRoles((prevPlayerRoles) => ({
      ...prevPlayerRoles,
      [playerId]: !prevPlayerRoles[playerId],
    }))
  }

  const [playerRoles, setPlayerRoles] = useState(() => {
    const initialPlayerRoles = {}
    players.forEach((player) => {
      initialPlayerRoles[player.playerNameId] = false
    })
    return initialPlayerRoles
  })
  return (
    <>
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
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <MyButton
            onClick={() => {
              resetPlayers()
            }}
            variant="contained"
            color="primary"
            href="/"
            sx={{
              fontSize: '0.8rem',
              fontFamily: 'IranSans',
              fontWeight: 'bold',
              marginBottom: '1rem',
              backgroundColor: 'gold',
              textAlign: 'center',
            }}
          >
            برگشت به صفحه اصلی{' '}
          </MyButton>
          <MyButton
            onClick={() => {
              resetPlayers()
            }}
            variant="contained"
            color="primary"
            href="/selectRoles"
            sx={{
              fontSize: '0.8rem',
              fontFamily: 'IranSans',
              fontWeight: 'bold',
              marginBottom: '1rem',
              backgroundColor: 'gold',
              textAlign: 'center',
            }}
          >
            پخش کردن دوباره نقش ها{' '}
          </MyButton>
        </div>

        <List>
          {players.map((player) => (
            <ListItem key={player.playerNameId}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="white"
                    sx={{
                      fontSize: '1.4rem',
                    }}
                  >
                    {player.playerName}{' '}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="white"
                    sx={{
                      fontSize: '1rem',
                    }}
                  >
                    {playerRoles[player.playerNameId]
                      ? player.playerRole
                      : null}{' '}
                  </Typography>
                }
                sx={{
                  color: 'white',
                  borderBottom: '1px solid white',
                }}
              />
              <Button onClick={() => togglePlayerRole(player.playerNameId)}>
                {playerRoles[player.playerNameId] ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon color="error" />
                )}
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  )
}

export default God
