import classNames from "classnames";
import Link from "next/link";
import Styles from "./ShikhoLink.module.scss";

const ShikhoLink = (props) => {
  const { href = "", className = "", text = "", isActive = false } = props;
  const wrapperClass = classNames(Styles.link, {
    [Styles["link-active"]]: isActive,
    [className]: true,
  });
  return (
    <Link href={href}>
      <a className={wrapperClass}>{text}</a>
    </Link>
  );
};

export default ShikhoLink;
