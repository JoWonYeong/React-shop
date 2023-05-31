import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let cart = createSlice({
    name: 'cart',
    initialState: [
        // { id: 0, name: 'White and Black', count: 1 },
        // { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        addCount(state, action) {
            state[action.payload].count++
        },
        addItem(state, action) {
            state.push(action.payload)
        },
        subItem(state, action) {
            state[action.payload].count--
            if (state[action.payload].count == 0) {
                state.splice(action.payload, 1)
            }
        }
    }
})

export let { addCount, addItem, subItem } = cart.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer
    }
})