import app from './app'
import { AppState } from './app/state'

export interface RootState {
  app: AppState
}

export default {
  modules: {
    app,
  },
  strict: false,
  state: () => ({}),
}
