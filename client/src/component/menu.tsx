import Link from "next/link";
import { useEffect, useState } from "react";

interface MenuProps {
  background?: boolean;
}

const Menu = (props: MenuProps) => {
  const [token, setToken] = useState<null | string>(null);
  const { background } = props;
  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (tokenFromLS) {
      setToken(tokenFromLS);
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <nav className={`${background ? "navigation-background" : ""}`}>
        <div className="menu-bar">
          <span className="logo">🥗 HomeChefRecipes</span>
          <div className="menu">

            <Link className={"link-style"} href="/">Home</Link>
            <button className="button">
              {token ? (
                <button className={"link-style"} onClick={handleClick}>Logout</button>
              ) : (
                <Link className={"link-style"} href="/login">Login</Link>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
