/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Typography, Button } from '@mui/material'
import { Box } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useStore } from '../store'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '200px',
  bgcolor: 'white',
  borderRadius: '5px',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box',
  gap: '1rem',
}

export default function BasicModal({
  open,
  handleClose,
  playerName,
  playerRole,
  playerRoleId,
  playerNameId,
}) {
  const addPlayer = useStore((store) => store.addPlayer)
  const players = useStore((store) => store.players)
  return (
    <div>
      <Modal
        open={open}
        onClick={() => {
          handleClose()
          addPlayer({ playerName, playerRole, playerNameId, playerRoleId })
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>{playerName}</Typography>
          <Typography>{playerRole}</Typography>
          <Button
            variant="contained"
            color="success"
            onClick={(event) => {
              event.stopPropagation()
              handleClose()
              addPlayer({
                playerName,
                playerRole,
                playerNameId,
                playerRoleId,
              })
            }}
            sx={{
              flexBasis: '100%',
              boxSizing: 'border-box',
              maxWidth: '100%',
            }}
          >
            <Typography>فهمیدم</Typography>
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
