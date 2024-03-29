import Image from "next/image";
import Link from "next/link";
// import { Button } from "antd";

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">VitaSoft Solutions</p>
      </Link>

      <div className="">
        <div className="flex gap-3 md:gap-5">
          <Link href={"/create-user"} className="black_btn">
            Create User
          </Link>

          <Link href="/">
            <Image
              src={"/profile-pic.png"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
