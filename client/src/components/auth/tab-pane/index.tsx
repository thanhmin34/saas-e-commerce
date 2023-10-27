import React from "react";
import { useRouter } from "next/navigation";
// styles
import styles from "./styles.module.scss";
// constants

import { TITLE_NAME } from "@constants/login";
import useIntl from "@hooks/useIntl";

const TabPane = (props: { navigate: string; selectTabId: number }) => {
  const { navigate, selectTabId } = props;
  const { localizeMessage } = useIntl();
  const { push } = useRouter();

  const handleNavigate = (isSelectId: boolean) => {
    if (isSelectId) {
      push(navigate);
    }
  };
  return (
    <div className={styles.tabPane}>
      {TITLE_NAME.map((item, index) => (
        <div
          key={index}
          className={`${styles.tabId} ${
            selectTabId === Number(index) && styles.tabActive
          }`}
          onClick={() => handleNavigate(index != selectTabId)}
        >
          {localizeMessage(item)}
        </div>
      ))}
    </div>
  );
};

export default TabPane;
