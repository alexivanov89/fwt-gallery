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
  values: [] | IPainting[];
  total: number;
  isLoading: boolean;
  error: null | string | SerializedError;
}

export interface IAuthorsState {
  values: [] | IAuthor[];
  isLoading: boolean;
  error: null | string | SerializedError;
}

export interface ILocationsState {
  values: [] | ILocation[];
  isLoading: boolean;
  error: null | string | SerializedError;
}

export interface IState {
  paintings: IPaintingsState;
  authors: IAuthorsState;
  locations: ILocationsState;
}

const initialState: IState = {
  paintings: {
    values: [],
    total: 0,
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

export const fetchPaintings = createAsyncThunk(
  'paintigs/fetchPaintings',
  async (params?: object) => {
    const response = await fwtService.getPaintings(params);
    return response;
  },
);

export const fetchAuthors = createAsyncThunk('paintigs/fetchAuthors', async (params?: object) => {
  const response = await fwtService.getAuthors(params);
  return response.data;
});

export const fetchLocations = createAsyncThunk(
  'paintigs/fetchLocations',
  async (params?: object) => {
    const response = await fwtService.getLocations(params);
    return response.data;
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
