import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: import.meta.env.VITE_BASE_URL,
    cache: new InMemoryCache(),
});

export function queryRequestHandler(requiredData) {
    const GET_DATA_QUERY = 'query '.concat(requiredData);
    client.query({
        query: gql(GET_DATA_QUERY),
    }).then(response => {
        return response["data"];
    })
    .catch(error => {
        console.log(error);
        return {};
    });
}