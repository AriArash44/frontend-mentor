import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: import.meta.env.VITE_BASE_URL,
    cache: new InMemoryCache(),
});

export const fetchData = createAsyncThunk('mySlice/fetchData', async (requiredData) => {
    const GET_DATA_QUERY = 'query '.concat(requiredData);
    return client.query({
        query: gql(GET_DATA_QUERY),
    }).then(response => {
        return response["data"];
    })
    .catch(error => {
        console.log(error);
        return {};
    });
});

const mySlice = createSlice({
  name: 'mySlice',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mySlice.reducer;






