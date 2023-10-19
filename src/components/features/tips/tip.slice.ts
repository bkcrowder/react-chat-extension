import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { ITip, ITipRemove } from './tip'

export interface ITipState {
    total: number,
    complete: { [key: string]: number[] },
    incomplete: { [key: string]: number[] }
    notify: ITip | null
}

const initialState: ITipState = {
    total: 0,
    complete: {},
    incomplete: {},
    notify: null
}

const tipSlice = createSlice({
    name: 'tip',
    initialState,
    reducers: {
        add: (state: ITipState, action: PayloadAction<ITip>) => {
            const tip = action.payload;
            if (state.incomplete[tip.username]) {
                state.incomplete[tip.username].push(tip.amount)
            }
            else {
                state.incomplete[tip.username] = [tip.amount]
            }
        
            state.total += tip.amount;
            state.notify = tip
        },
        complete: (state: ITipState, action: PayloadAction<ITip>) => {
            const username = action.payload.username
            const amount = action.payload.amount

            if (!state.incomplete[username])
            {
                return
            }

            const index = state.incomplete[username]?.indexOf(amount)
            if (index < 0) {
                console.warn(`Unable to find ${amount} for ${username} when trying to complete tip action`)
                return
            }

            if (state.incomplete[username].length == 1)
            {
                delete state.incomplete[username]
            }
            else
            {
                state.incomplete[username].splice(index, 1)
            }

            if (state.complete[username]) {
                state.complete[username].push(amount)
            }
            else {
                state.complete[username] = [amount]
            }
        },
        undo: (state: ITipState, action: PayloadAction<ITip>) => {
            const username = action.payload.username;
            const amount = action.payload.amount;
            if (!state.complete[username]) { 
                return;
            }

            const index = state.complete[username]?.indexOf(amount);
            if (index < 0) {
                console.warn(`Unable to find ${amount} for ${username} when trying to undo tip action`)
                return;
            }

            if (state.complete[username].length == 1) {
                delete state.complete[username]
            }
            else {
                state.complete[username].splice(index, 1)
            }
        
            if (state.incomplete[username]) {
                state.incomplete[username].push(amount)
            }
            else {
                state.incomplete[username] = [amount]
            }
        },
        remove: (state: ITipState, action: PayloadAction<ITipRemove>) => {
            const username = action.payload.username
            const isComplete = action.payload.complete

            let total = 0
            if (isComplete)
            {
                total = state.complete[username].reduce((partial, a) => partial + a, 0)
                delete state.complete[username]
            }
            else
            {
                total = state.incomplete[username].reduce((partial, a) => partial + a, 0)
                delete state.incomplete[username]
            }

            state.total -= total
        },
        reset: (state: ITipState): ITipState => {
            state = {
                total: 0,
                complete: {},
                incomplete: {},
                notify: null
            }

            return state
        }
    }
})

export const { add, complete, undo, remove, reset } = tipSlice.actions
export default tipSlice