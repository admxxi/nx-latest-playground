import {createContext} from 'react'

export const Context = createContext<{
  token?: string
}>({
  token: ''
})
