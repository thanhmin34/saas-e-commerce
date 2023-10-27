import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import CategoryItem from "./CategoryItem";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { map } from "lodash";

const MegaMenu = () => {
  const megaMenu = useSelector((state: RootState) => state.megaMenu);

  const content: React.JSX.Element = (
    <div className={`${styles.megaMenuList} main-container`}>
      {map(megaMenu, (item, index) => (
        <Fragment key={index}>
          <CategoryItem item={item} />
        </Fragment>
      ))}
    </div>
  );
  return <div className={`${styles.megaMenu}`}>{content}</div>;
};

export default MegaMenu;
