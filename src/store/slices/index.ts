import { combineReducers } from '@reduxjs/toolkit';
import { paintingReducer } from './paintingsSlice';

export const rootReducer = combineReducers({ painting: paintingReducer });
