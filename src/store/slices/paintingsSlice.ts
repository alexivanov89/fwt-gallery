import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fwtService } from '../../utils/fwtService';

export interface IPainting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}
export interface IAuthor {
  id: number;
  name: string;
}

export interface ILocation {
  id: number;
  location: string;
}
export interface IPaintingsState {
  values: null | IPainting[];
  total: number;
  isLoading: boolean;
  error: null | string | SerializedError;
}
export interface IState {
  paintings: IPaintingsState;
}

const initialState: IState = {
  paintings: {
    values: null,
    total: 0,
    isLoading: false,
    error: null,
  },
};

export const fetchPaintings = createAsyncThunk(
  'paintigs/fetchPaintings',
  async (params?: object) => {
    const response = await fwtService.getPaintings(params);
    return response;
  },
);

const paintingsSlice = createSlice({
  name: 'painting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaintings.pending, (state) => {
        state.paintings.isLoading = true;
        state.paintings.error = null;
      })
      .addCase(fetchPaintings.fulfilled, (state, action) => {
        state.paintings.values = action.payload?.data;
        state.paintings.total = +action.payload?.headers['x-total-count'];
        state.paintings.isLoading = false;
        state.paintings.error = null;
      })
      .addCase(fetchPaintings.rejected, (state, action) => {
        state.paintings.error = action.error;
        state.paintings.isLoading = false;
      });
  },
});

export const selectPaintings = (state: RootState) => state.painting.paintings;

export const paintingReducer = paintingsSlice.reducer;
