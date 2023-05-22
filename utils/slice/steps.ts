import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '~/root/utils/store';
export interface ITalent {
    steps: Array<any>
};

const initialState: ITalent = {
    steps: []
};

export const stepsSlice = createSlice({
    name: 'steps',
    initialState,
    reducers: {
        addStep: (state, action) => {
            console.log("Step added", action.payload);

            const index = state.steps.findIndex((step) => step.stepName === action.payload.stepName);

            if (index === -1) {
                state.steps.push(action.payload);
            }
        },

        removeStep: (state, action) => {
            const index = state.steps.findIndex((step) => step.id === action.payload.id);
            if (index !== -1) {
                state.steps.splice(index, 1);
            }
        },
        clearArray: (state) => {
            state.steps = [];
        }
    }
});

export const { addStep, removeStep, clearArray } = stepsSlice.actions;

export default stepsSlice.reducer;

export const selectStep = (state: AppState) => state.stepsSlice.steps;
