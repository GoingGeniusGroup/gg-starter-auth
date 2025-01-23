import { ReactNode } from "react";
import ProfileHudTop from "../Huds/ProfileHudTop";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ProfileHudTop />
      {/* <CartHud /> */}
      {children}
    </>
  );
};

const LayoutWithProvider: React.FC<LayoutProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export { LayoutWithProvider as Layout };
