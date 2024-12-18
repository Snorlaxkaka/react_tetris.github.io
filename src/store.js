import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import gameReducer from './features/game/game-slice'
import thunk from 'redux-thunk'

// 持久化配置
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['highestScore'],
}

const persistedReducer = persistReducer(persistConfig, gameReducer)

export const store = configureStore({
  reducer: { game: persistedReducer },
  middleware: [thunk],
})

export const persistor = persistStore(store)
