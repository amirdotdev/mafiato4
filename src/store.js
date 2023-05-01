/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

const store = (set) => ({
  names: [],
  roles: [],
  players: [],
  addRole: (newRole) =>
    set((state) => ({
      roles: [
        ...state.roles,
        { name: newRole, selected: false, count: 0, id: uuidv4() },
      ],
    })),
  addName: (newName) =>
    set((state) => ({
      names: [...state.names, { name: newName, selected: false, id: uuidv4() }],
    })),
  addPlayer: (newPlayer) =>
    set((store) => ({
      players: [...store.players, newPlayer],
    })),
  deleteRole: (index) =>
    set((state) => ({ roles: state.roles.filter((_, i) => i !== index) })),
  deleteName: (index) =>
    set((state) => ({ names: state.names.filter((_, i) => i !== index) })),
  editName: (index, newName) =>
    set((state) => ({
      names: state.names.map((name, i) =>
        i === index ? { ...name, name: newName } : name
      ),
    })),
  editRole: (index, newRole) =>
    set((state) => ({
      roles: state.roles.map((role, i) =>
        i === index ? { ...role, name: newRole } : role
      ),
    })),
  resetNames: () =>
    set((store) => ({
      names: store.names.map((name) => ({ ...name, selected: false })),
    })),
  resetPlayers: () =>
    set((store) => ({
      players: [],
    })),
  toggleSelect: (index) =>
    set((state) => ({
      names: state.names.map((name, i) =>
        i === index ? { ...name, selected: !name.selected } : name
      ),
    })),
  toggleSelectRole: (index) =>
    set((state) => ({
      roles: state.roles.map((role, i) =>
        i === index ? { ...role, selected: !role.selected } : role
      ),
    })),
  incrementCount: (index) =>
    set((store) => ({
      roles: store.roles.map((role, i) =>
        i === index ? { ...role, count: role.count + 1 } : role
      ),
    })),
  decrementCount: (index) =>
    set((store) => ({
      roles: store.roles.map((role, i) =>
        i === index ? { ...role, count: role.count - 1 } : role
      ),
    })),
  resetCount: (index) =>
    set((store) => ({
      roles: store.roles.map((role, i) =>
        i === index ? { ...role, count: 0 } : role
      ),
    })),
})

export const useStore = create(persist(devtools(store), { name: 'store' }))
