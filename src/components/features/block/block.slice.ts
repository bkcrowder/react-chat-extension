import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

export interface IBlockState {
    users: Set<string>
}

const initialState: IBlockState = {
    users: new Set<string>()
}

const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
        add: (state: IBlockState, action: PayloadAction<string>) => {
            const toBlock = action.payload;
            if (!state.users.has(toBlock))
            {
                state.users.add(toBlock)
            }
        },
        remove: (state: IBlockState, action: PayloadAction<string>) => {
            const toRemove = action.payload
            if (state.users.has(toRemove))
            {
                state.users.delete(toRemove)
            }
        },
        reset: (state: IBlockState): IBlockState => {
            state = {
                users: new Set<string>()
            }

            return state
        }
    }
})

export const { add, remove, reset } = blockSlice.actions
export default blockSlice