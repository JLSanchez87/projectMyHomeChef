import { ReactNode } from "react";
import Menu from "./menu";

interface LayoutProps {
  navBarBackground?: boolean;
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <Menu background={props.navBarBackground} />
      {props.children}
    </div>
  );
};

export default Layout;
