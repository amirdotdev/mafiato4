/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useStore } from '../store'
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
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import CircularIndeterminate from './CircularIndeterminate'
import MyButton from './MyButton'
function Names() {
  const [newName, setNewName] = useState('')
  const [loading, setLoading] = useState(true)
  const names = useStore((state) => state.names)
  const addName = useStore((state) => state.addName)
  const deleteName = useStore((state) => state.deleteName)
  const editName = useStore((state) => state.editName)
  const toggleSelect = useStore((state) => state.toggleSelect)
  const resetNames = useStore((state) => state.resetNames)

  const handleAddName = () => {
    if (newName.trim() === '') return
    if (names.find((name) => name.name === newName))
      return alert('اسم تکراری است')
    addName(newName)
    setNewName('')
  }

  const handleDeleteName = (index) => {
    deleteName(index)
  }

  const handleEditName = (index, newName) => {
    if (newName.trim() === '') return
    editName(index, newName)
  }

  const handleToggleSelect = (index) => {
    toggleSelect(index)
  }

  return (
    <Box
      sx={{
        padding: '1rem',
        backgroundImage: 'url(./michael.jpeg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        maxHeight: '100%',
        minHeight: '100vh',
      }}
    >
      <Typography
        sx={{ fontFamily: 'IranSans', textAlign: 'center', color: 'white' }}
        variant="h4"
        component="h2"
        gutterBottom
      >
        اسم بازیکن ها
      </Typography>
      <Typography
        sx={{ fontFamily: 'IranSans', textAlign: 'center', color: 'white' }}
        variant="h6"
        component="h2"
        gutterBottom
      >
        تعداد بازیکن ها: {names.filter((name) => name.selected).length}
      </Typography>
      <Box display="flex" alignItems="center" sx={{ gap: '1rem' }}>
        <TextField
          label="اسم بازیکن"
          variant="outlined"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleAddName()}
          sx={{ padding: '0', backgroundColor: 'white' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddName}>
          +
        </Button>
      </Box>
      {names.length === 0 ? (
        <Typography
          sx={{ fontFamily: 'IranSans', textAlign: 'center', color: 'white' }}
        >
          هیچ اسمی اضافه نشده است{' '}
        </Typography>
      ) : (
        <List sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {names.map(({ name, selected }, index) => (
            <ListItem
              key={index}
              onClick={() => handleToggleSelect(index)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'transparent',
                },
                backgroundColor: '#FFFFE0',
                borderRadius: '4px',
                fontFamily: 'IranSans',
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selected}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={name} sx={{ fontFamily: 'IranSans' }} />
              <ListItemSecondaryAction>
                <IconButton
                  color="secondary"
                  edge="end"
                  onClick={() => handleEditName(index, prompt(name))}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  edge="end"
                  onClick={() => handleDeleteName(index)}
                >
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
          href="/"
          sx={{
            fontSize: '0.8rem',
            padding: '0.2rem 0.2rem',
            fontFamily: 'IranSans',
            fontWeight: 'bold',
          }}
        >
          بازگشت به صفحه اصلی{' '}
        </MyButton>
        <MyButton
          onClick={() => {
            if (names.filter((name) => name.selected).length < 3)
              return alert('تعداد بازیکن های انتخابی از 3 نفر کمتر نباشد')
          }}
          variant="contained"
          color="primary"
          href={`${
            names.filter((name) => name.selected).length > 2 ? '/roles' : ''
          }`}
          sx={{
            fontSize: '0.8rem',
            padding: '0.2rem 0.2rem',
            fontFamily: 'IranSans',
            fontWeight: 'bold',
          }}
        >
          وارد کردن نقش ها{' '}
        </MyButton>
      </Box>
    </Box>
  )
}

export default Names
