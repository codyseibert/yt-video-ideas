import React from "react";
import Image from "next/image";
import logo from "../assets/logo.jpeg";
import NewIdeaBtn from "./NewIdeaBtn";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="bg-gray-100">
      <div className="content">
        <div className="flex justify-between items-center">
          <Image src={logo} alt="" width={60} height={60} />

          <section className="flex items-center gap-x-2">
            <button className="font-semibold text-xl p-2">Benson Yeboah</button>
            <NewIdeaBtn />
            <button className="bg-blue-300 text-white p-2 rounded-md">
              Logout
            </button>
          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;
