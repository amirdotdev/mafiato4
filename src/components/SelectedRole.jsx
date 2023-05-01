/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Paper } from '@mui/material'
import { useState } from 'react'
const SelectedRole = ({ index, role, showModalHandler, showRoles }) => {
  const [revealRole, setRevealRole] = useState(false)
  const [hidden, setHidden] = useState(false)
  return (
    <Paper
      style={{
        padding: '16px',
        textAlign: 'center',
        display: `${!showRoles || hidden ? 'none' : 'block'}`,
      }}
      onClick={() => {
        setRevealRole(true)
        showModalHandler()
        setHidden(true)
      }}
    >
      {!revealRole ? index + 1 : role}
    </Paper>
  )
}

export default SelectedRole
