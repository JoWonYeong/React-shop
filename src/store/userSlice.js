import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        changeName(state, a) {
            state.name = a.payload
        },
        addAge(state, a) {
            state.age += a.payload
        }
    }
})

export let { changeName, addAge } = user.actions

export default user