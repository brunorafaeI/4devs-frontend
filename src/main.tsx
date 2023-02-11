import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import { PersistGate } from'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

import authReducer from './storage/state'

const persistConfig = { key: 'auth', storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (gdm) => gdm({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>,
)
