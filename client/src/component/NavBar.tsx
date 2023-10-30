import Link from "next/link";

const NavBar = () => {
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"/login"}>Login</Link>
    </div>
  );
};
export default NavBar;
