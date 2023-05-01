import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const MyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))

export default MyButton
