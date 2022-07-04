import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fwtService } from '../../utils/fwtService';

export interface IPaintings {
  values: [] | any[];
  isLoading: boolean;
  error: null | string | SerializedError;
}

export interface IAuthors {
  values: [] | any[];
  isLoading: boolean;
  error: null | string | SerializedError;
}

export interface ILocations {
  values: [] | any[];
  isLoading: boolean;
  error: null | string | SerializedError;
}

export interface PaintingsState {
  paintings: IPaintings;
  authors: IAuthors;
  locations: ILocations;
}

const initialState: PaintingsState = {
  paintings: {
    values: [],
    isLoading: false,
    error: null,
  },
  authors: {
    values: [],
    isLoading: false,
    error: null,
  },
  locations: {
    values: [],
    isLoading: false,
    error: null,
  },
};

export const fetchPaintings = createAsyncThunk('paintigs/fetchPaintings', async () => {
  const response = await fwtService.getPaintings();
  return response.data;
});

export const fetchAuthors = createAsyncThunk('paintigs/fetchAuthors', async () => {
  const response = await fwtService.getAuthors();
  return response.data;
});

export const fetchLocations = createAsyncThunk('paintigs/fetchLocations', async () => {
  const response = await fwtService.getLocations();
  return response.data;
});

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
        state.paintings.values = action.payload;
        state.paintings.isLoading = false;
        state.paintings.error = null;
      })
      .addCase(fetchPaintings.rejected, (state, action) => {
        state.paintings.error = action.error;
        state.paintings.isLoading = false;
      })
      .addCase(fetchAuthors.pending, (state) => {
        state.authors.isLoading = true;
        state.authors.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authors.values = action.payload;
        state.authors.isLoading = false;
        state.authors.error = null;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.authors.error = action.error;
        state.authors.isLoading = false;
      })
      .addCase(fetchLocations.pending, (state) => {
        state.locations.isLoading = true;
        state.locations.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations.values = action.payload;
        state.locations.isLoading = false;
        state.locations.error = null;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.locations.error = action.error;
        state.locations.isLoading = false;
      });
  },
});

export const selectPaintings = (state: RootState) => state.painting.paintings;
export const selectAuthors = (state: RootState) => state.painting.authors;
export const selectLocations = (state: RootState) => state.painting.locations;

export const paintingReducer = paintingsSlice.reducer;
