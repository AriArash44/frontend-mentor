import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: import.meta.env.VITE_BASE_URL,
    cache: new InMemoryCache(),
});

export const fetchData = createAsyncThunk(
    'fetchData',
    async (requiredData, { rejectWithValue }) => {
        try {
            const GET_DATA_QUERY = gql`
                query {
                    ${requiredData}
                }
            `;
            const response = await client.query({ query: GET_DATA_QUERY });
            if (response.errors && response.errors.length > 0) {
                return rejectWithValue(response.errors[0].message);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred');
        }
    }
);

const fetchResultSlice = createSlice({
    name: 'fetchResultSlice',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.data = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default fetchResultSlice.reducer;