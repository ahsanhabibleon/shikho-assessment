import Styles from "./Header.module.scss";
import { useRouter } from "next/router";
import ShikhoLink from "../../Molicules/ShikhoLink";

const Header = () => {
  const router = useRouter();
  return (
    <div className={Styles.header}>
      <div className={Styles["shikho-blog--logo"]}>React GraphQL</div>
      <ShikhoLink text="CRUD" href="/" isActive={router.pathname == "/"} />
      <ShikhoLink
        text="Blank"
        href="/blank"
        isActive={router.pathname == "/blank"}
      />
    </div>
  );
};

export default Header;
