/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Names from './components/Names'
import Roles from './components/Roles'
import Home from './components/Home'
import SelectRoles from './components/SelectRoles'
import God from './components/God'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/names" element={<Names />}></Route>
        <Route path="/roles" element={<Roles />}></Route>
        <Route path="/selectRoles" element={<SelectRoles />}></Route>
        <Route path="/god" element={<God />}></Route>
      </Routes>
    </Router>
  )
}

export default App
