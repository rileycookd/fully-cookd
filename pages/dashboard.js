import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import Navbar from "../components/navbar";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

export default function Dashboard({ user }) {
  const { data, error } = useSWR('/api/user/get', fetcher)
  return (
    <>
      <Navbar />
      <h1>DASHBOARD!</h1>
      {error ? (
        <div>oops... {error.message}</div>
      ) : data === undefined ? (
        <div>Loading... </div>
      ) : (
        <div>{JSON.stringify(data)}</div>
      )}
    </>
  )
}

export const getServerSideProps = withPageAuthRequired();
