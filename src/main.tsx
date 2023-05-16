import React from "react"
import ReactDOM from "react-dom/client"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { setupListeners } from "@reduxjs/toolkit/query"

import App from "./App.tsx"
import "./index.css"
import globalReducer from "./state"
import { api } from "./state/api.ts"

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
