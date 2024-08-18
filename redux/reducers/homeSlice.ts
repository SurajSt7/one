import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type HomeType = {
  data: null | any;
  loading: boolean;
  error: boolean;
};

type TUser = {
  userName: string;
  password: string;
};

export const user: TUser = {
  userName: "",
  password: "",
};

const HomeState: HomeType = {
  data: null,
  loading: false,
  error: false,
};

export const getStocks = createAsyncThunk(
  "Home/getStocks",
  async (_, thunkAPI) => {
    const options = {
      method: "GET",
      url: "https://real-time-finance-data.p.rapidapi.com/search",
      params: {
        query: "Apple",
        language: "en",
      },
      headers: {
        "X-RapidAPI-Key": "bfad11cc6emsh7677ec17fb775e7p1eeabajsn9abb2d97418a",
        "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
      },
    };

    try {
      const api = await axios.request(options);
      const result = await api.data;
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const marketTrends = createAsyncThunk(
  "Home/marketTrends",
  async (_, thunkAPI) => {
    const options = {
      method: "GET",
      url: "https://real-time-finance-data.p.rapidapi.com/market-trends",
      params: {
        trend_type: "GAINERS",
        country: "us",
        language: "en",
      },
      headers: {
        "X-RapidAPI-Key": "bfad11cc6emsh7677ec17fb775e7p1eeabajsn9abb2d97418a",
        "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
      },
    };

    try {
      const api = await axios.request(options);
      const result = await api.data;
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const HomeSlice = createSlice({
  name: "HomeSlice",
  initialState: {
    HomeState,
    user: null,
    stocks: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStocks.pending, (state) => {
      state.HomeState.loading = true;
      state.HomeState.error = false;
    });
    builder.addCase(getStocks.fulfilled, (state, { payload }) => {
      state.HomeState.error = false;
      state.HomeState.loading = false;
      state.HomeState.data = payload;
    });
    builder.addCase(getStocks.rejected, (state) => {
      state.HomeState.loading = false;
      state.HomeState.error = true;
    });
    builder.addCase(marketTrends.pending, (state) => {
      state.HomeState.loading = true;
      state.HomeState.error = false;
    });
    builder.addCase(marketTrends.fulfilled, (state, { payload }) => {
      state.HomeState.error = false;
      state.HomeState.loading = false;
      state.HomeState.data = payload;
    });
    builder.addCase(marketTrends.rejected, (state) => {
      state.HomeState.loading = false;
      state.HomeState.error = true;
    });
  },
});
export const { setUser } = HomeSlice.actions;
