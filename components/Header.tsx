import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../assets/logo.jpeg";
import Link from "next/link";

const Header = (
  { onNewIdeaClicked }:
    { onNewIdeaClicked: () => void }
) => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-100">
      <div className="content">
        <div className="flex justify-between items-center">
          <Link href="https://www.youtube.com/c/WebDevJunkie">
            <a target="_blank" rel="noopener noreferrer">
              <Image src={logo} alt="" width={60} height={60} />
            </a>
          </Link>

          <section className="flex items-center gap-x-2">
            {status === "authenticated" ? (
              <>
                <button className="font-semibold text-xl p-2">
                  {session?.user?.name}
                </button>
                <button
                  onClick={onNewIdeaClicked}
                  className="text-blue-500 border border-blue-300 hover:bg-blue-300 hover:text-white p-2 rounded-md"
                >
                  New Idea
                </button>
                <button
                  onClick={() => signOut()}
                  className="bg-blue-300 text-white p-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="bg-blue-300 text-white p-2 rounded-md"
                >
                  Signin
                </button>
              </>
            )}
          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;
