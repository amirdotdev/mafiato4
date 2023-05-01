/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useStore } from '../store'
import MyButton from './MyButton'
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material'
import Names from './Names'
function Roles() {
  const [newRole, setnewRole] = useState('')
  const names = useStore((state) => state.names)
  const roles = useStore((state) => state.roles)
  // const addName = useStore((state) => state.addName)
  const addRole = useStore((state) => state.addRole)
  const deleteRole = useStore((state) => state.deleteRole)
  const editRole = useStore((state) => state.editRole)
  const toggleSelectRole = useStore((state) => state.toggleSelectRole)
  const incrementCount = useStore((state) => state.incrementCount)
  const decrementCount = useStore((state) => state.decrementCount)
  const resetCount = useStore((store) => store.resetCount)
  const resetPlayers = useStore((store) => store.resetPlayers)

  const numberOfSelectedNames = names.filter((name) => name.selected).length
  const numberOfSelectedRoles = roles.reduce((acc, cur) => acc + cur.count, 0)
  const handleAddRole = () => {
    if (newRole.trim() === '') return
    if (roles.find((name) => name.name === newRole))
      return alert('نقش تکراری است')
    addRole(newRole)
    setnewRole('')
  }

  const handleDeleteRole = (index) => {
    deleteRole(index)
  }

  const handleEditRole = (index, newRole) => {
    if (newRole.trim() === '') return
    if (roles.find((name) => name.name === newRole))
      return alert('نقش تکراری است')
    editRole(index, newRole)
  }

  const handleToggleSelect = (selected, index) => {
    if (selected) resetCount(index)
    if (!selected) incrementCount(index)
    toggleSelectRole(index)
  }

  return (
    <Box
      sx={{
        padding: '1rem',
        backgroundImage: 'url(./cat.jpeg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        maxHeight: '100%',
        minHeight: '100vh',
      }}
    >
      <Typography
        sx={{ fontFamily: 'IranSans', textAlign: 'center', color: '#98FB98' }}
        variant="h4"
        component="h2"
        gutterBottom
      >
        نقش بازیکن ها
      </Typography>
      <Typography
        sx={{ fontFamily: 'IranSans', textAlign: 'center', color: '#B0C4DE' }}
        variant="h4"
        component="h2"
        gutterBottom
      >
        تعداد بازیکن ها: {numberOfSelectedNames}
      </Typography>
      <Typography
        sx={{ fontFamily: 'IranSans', textAlign: 'center', color: '#B0C4DE' }}
        variant="h4"
        component="h2"
        gutterBottom
      >
        تعداد نقش ها : {numberOfSelectedRoles}
      </Typography>
      <Box display="flex" alignItems="center" mb={2} sx={{ gap: '1rem' }}>
        <TextField
          label="Role"
          variant="outlined"
          value={newRole}
          onChange={(event) => setnewRole(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleAddRole()}
          mr={2}
          sx={{ padding: '0', backgroundColor: 'white' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddRole}>
          Add
        </Button>
      </Box>
      {names.length === 0 ? (
        <Typography>No roles added yet.</Typography>
      ) : (
        <List sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {roles.map(({ name, selected, count }, index) => (
            <ListItem
              key={index}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'transparent',
                },
                backgroundColor: '#FFFFE0',
                borderRadius: '4px',
                fontFamily: 'IranSans',
              }}
              onClick={() => handleToggleSelect(selected, index)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selected}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" disabled={selected ? false : true}>
                  <RemoveIcon
                    onClick={() => {
                      if (count === 0) return
                      decrementCount(index)
                    }}
                  />
                </IconButton>
                <IconButton edge="end" disabled>
                  {count}
                </IconButton>{' '}
                <IconButton edge="end" disabled={selected ? false : true}>
                  <AddIcon
                    onClick={() => {
                      if (numberOfSelectedRoles >= numberOfSelectedNames)
                        return alert('تعداد نقش غیر مجاز')
                      incrementCount(index)
                    }}
                  />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleEditRole(index, prompt(name))}
                >
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDeleteRole(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <Box
        sx={{
          marginTop: '1rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        <MyButton
          variant="contained"
          color="primary"
          href="/names"
          sx={{
            fontSize: '0.8rem',
            padding: '0.2rem 0.2rem',
            fontFamily: 'IranSans',
            fontWeight: 'bold',
          }}
        >
          انتخاب اسم ها{' '}
        </MyButton>
        <MyButton
          onClick={() => {
            if (numberOfSelectedNames !== numberOfSelectedRoles)
              return alert('تعداد نقش ها با تعداد اسم ها برابر نیست')
            resetPlayers()
          }}
          variant="contained"
          color="primary"
          href={`${
            numberOfSelectedNames === numberOfSelectedRoles
              ? '/selectRoles'
              : ''
          }`}
          sx={{
            fontSize: '0.8rem',
            padding: '0.2rem 0.2rem',
            fontFamily: 'IranSans',
            fontWeight: 'bold',
          }}
        >
          پخش کردن نقش ها{' '}
        </MyButton>
      </Box>
    </Box>
  )
}

export default Roles
