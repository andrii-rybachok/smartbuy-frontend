
import Link from 'next/link';
import { IsAuthorized } from './identity/authentication/authSync';
import Logout from './components/logout';
import GetAllUsers from './components/getAllUsers';

export default async function Home() {
  let loggedIn=await IsAuthorized();
  return (
    <main >
      
      {
        loggedIn
        ? 
        <>
          <Logout></Logout>
          <GetAllUsers></GetAllUsers>
        </>
        : <Link href={"/identity/login"}>Log In</Link>
      }
    </main>
  )
}

