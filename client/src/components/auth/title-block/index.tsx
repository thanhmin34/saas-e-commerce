import React, { Fragment } from "react";

// styles
import styles from "./styles.module.scss";
import useIntl from "@hooks/useIntl";

const TitleBlock = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { localizeMessage } = useIntl();
  return (
    <Fragment>
      <h2 className={styles.title}>{localizeMessage(title)}</h2>
      <h4 className={styles.desc}>{localizeMessage(description)}</h4>
    </Fragment>
  );
};

export default TitleBlock;
