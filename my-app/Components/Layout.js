import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/Components/Nav";
import { useState } from "react";
export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setNav] = useState(false);
  if (!session) {
    return (
      <>
        <div className="bg-gray-200 w-screen h-screen flex items-center">
          <div className="text-center w-full">
            <button
              className="bg-white p-2 px-4 rounded-lg"
              onClick={() => signIn("google")}
            >
              Login with Google
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-gray-200 min-h-screen">
      <div>
      <button className='block md:hidden ' onClick={() => setNav(true)}>Test</button>
      </div>
      
      <div className="flex">
        <Nav showNav={showNav} />
        <div className="bg-white flex-grow mt-2 mb-2 mr-2 rounded-lg p-4">
          {children}
        </div>
        {/* <button className="bg-white p-2 px-4 rounded-lg" onClick={()=>signOut()}>signout</button> */}
      </div>
    </div>
  );
}
