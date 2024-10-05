import { useQuery, gql } from '@apollo/client';

const GET_COMMENTS = gql`
  query GetComments {
    reviewSubmitteds(orderBy: blockTimestamp, orderDirection: desc) {
      comment
    }
  }
`;

export default function Comments() {
  const { loading, error, data } = useQuery(GET_COMMENTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const commentsArray = data.reviewSubmitteds.map(item => item.comment);

  // Log the array to the console
  console.log(commentsArray);

  return <div>Check the console for the comments array.</div>;
}