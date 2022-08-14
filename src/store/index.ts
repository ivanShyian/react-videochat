import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { Cookies } from 'react-cookie'

const thunkWithExtraArgs = thunk.withExtraArgument<ThunkArgs>({
  cookies: new Cookies()
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkWithExtraArgs)))

export type ThunkArgs = {cookies: Cookies}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch