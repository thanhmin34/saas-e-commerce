import React, { Fragment, useCallback, useMemo } from "react";
import { get } from "lodash";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
// styles
import styles from "./styles.module.scss";
import useIntl from "@hooks/useIntl";
// constants

export const TAB_TITLE = {
  PHONE_NUMBER: "Phone number",
  EMAIL_ADDRESS: "Email address",
};
const TabPaneBlock = (props: {
  selectTabId: React.Dispatch<React.SetStateAction<number>>;
  showTabId: number;
  navigate: string;
}) => {
  const { push } = useRouter();
  const { localizeMessage } = useIntl();
  const { selectTabId, showTabId } = props;

  const loginOptions = true;

  const titleName = [TAB_TITLE.PHONE_NUMBER, TAB_TITLE.EMAIL_ADDRESS];

  const handleNavigate = useCallback(
    (value: number) => {
      selectTabId(value);
    },
    [selectTabId, showTabId]
  );
  const loginBothOptions = (
    <Fragment>
      {titleName.map((item, index) => (
        <div
          key={index}
          className={`${styles.tabId} ${
            showTabId === index && styles.tabActive
          }`}
          onClick={() => handleNavigate(index)}
        >
          {localizeMessage(item)}
        </div>
      ))}
    </Fragment>
  );

  const loginOneOption = (
    <Fragment>
      <div className={`${styles.tabId} ${styles.tabActive}`}>
        {localizeMessage(
          loginOptions ? TAB_TITLE.EMAIL_ADDRESS : TAB_TITLE.PHONE_NUMBER
        )}
      </div>
    </Fragment>
  );

  return (
    <div className={styles.tabPane}>
      {loginOptions ? loginBothOptions : loginOneOption}
    </div>
  );
};

export default TabPaneBlock;
