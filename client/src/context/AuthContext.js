import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
    token: null,
    iserId: null,
    login: noop,
    logout: noop,
    isAthenticated: false
})