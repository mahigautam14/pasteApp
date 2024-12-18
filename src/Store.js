import {configureStore} from '@reduxjs/toolkit'

import pasteReducer from './reudx/PasteSlice'
export const store = configureStore({
    reducer:{
        Paste:pasteReducer,
    },
})