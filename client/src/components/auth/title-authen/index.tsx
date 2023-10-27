import React, { Fragment } from "react";
import styles from "./styles.module.scss";
type Props = {
  title: string;
  description: string;
  className?: string;
};

const TitleAuthentication = (props: Props) => {
  const { title, description, className } = props;
  return (
    <div className={styles.titleAuthentication}>
      <h2 className={`${className ? className : ""} ${styles}`}>{title}</h2>
      <h3>{description}</h3>
    </div>
  );
};

export default TitleAuthentication;
