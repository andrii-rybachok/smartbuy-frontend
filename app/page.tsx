
import Link from 'next/link';
import { IsAuthorized } from './identity/authentication/authSync';
import Logout from './components/logout';
import GetAllUsers from './components/getAllUsers';

export default async function Home() {
  let loggedIn=await IsAuthorized();
  return (
    <main >
      <section>
        
        {
          loggedIn
          ?
          <>
            <Logout></Logout>
          </>
          : <Link href={"/identity/login"}>Log In</Link>
        }
        <Link href={"/categories"}>See all categories</Link>
      </section>
    </main>
  )
}

