import React from "react";
import { signOut, useSession } from "next-auth/react";

type Props = {};

const CreateIdea = (props: Props) => {
  const { status } = useSession({ required: true });

  if (status === "authenticated") {
    return (
      <>
        <div>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
        <div className="w-full">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Give Idea:
              </label>
              <textarea className="border border-gray-300 w-full p-4"></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default CreateIdea;
