import { createSlice } from "@reduxjs/toolkit"
import { PaletteMode } from '@mui/material';

export type StateType = {
  mode: PaletteMode
  userId: string
}

const initialState: StateType = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
}

// export type StateType = typeof initialState

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state: StateType) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
  },
})

export const { setMode } = globalSlice.actions

export default globalSlice.reducer