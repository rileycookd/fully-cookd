import Navbar from "../../components/navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

export default function Dashboard({ user }) {
  const router = useRouter();
  const { data: session, status } = useSession()

  return (
    <>
      <Navbar />
      <h1>DASHBOARD!</h1>
      {/* {error ? (
        <div>oops... {error.message}</div>
      ) : data === undefined ? (
        <div>Loading... </div>
      ) : (
        <div>{JSON.stringify(data)}</div>
      )} */}
    </>
  )
}

