import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { IGoal, IGoalRemove } from './goal'

export interface IGoalState {
    complete: IGoal[]
    incomplete: IGoal[]
}

const initialState: IGoalState = {
    complete: [],
    incomplete: []
}

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        add: (state: IGoalState, action: PayloadAction<IGoal>) => {
            state.incomplete.push(action.payload)
        },
        complete: (state: IGoalState, action: PayloadAction<IGoal>) => {
            const goal = action.payload
            const index = state.incomplete.indexOf(goal)
            if (index < 0) {
                return
            }

            state.incomplete.splice(index, 1)
            state.complete.push(goal)
        },
        remove: (state: IGoalState, action: PayloadAction<IGoalRemove>) => {
            const goal = action.payload

            if (goal.complete) {
                const index = state.complete.indexOf(goal as IGoal)
                state.complete.splice(index, 1)
            }
            else {
                const index = state.incomplete.indexOf(goal as IGoal)
                state.incomplete.splice(index, 1)
            }
        },
        clear: (state: IGoalState): IGoalState => {
            state = {
                complete: [],
                incomplete: []
            }

            return state
        }
    }
})

export const { add, complete, remove, clear } = goalSlice.actions
export default goalSlice