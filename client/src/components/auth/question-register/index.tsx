import React from "react";
import Link from "next/link";
// styles
import styles from "./styles.module.scss";

import useIntl from "@hooks/useIntl";
import Button from "@components/button";
import TitleAuthentication from "../title-authen";

const QuestionRegister = ({
  title,
  description,
  buttonText,
  router,
}: {
  title: string;
  description: string;
  buttonText: string;
  router: string;
}) => {
  const { localizeMessage } = useIntl();

  return (
    <div className={styles.blockNavigateLoginPage}>
      <div className={styles.blockBody}>
        <TitleAuthentication
          title={localizeMessage(title)}
          description={localizeMessage(description)}
        />
        <Link href={router}>
        <Button className={styles.button} onClick={() => {}}>
          {localizeMessage(buttonText)}
        </Button>
        </Link>
        {/* <LoginWithSocial /> */}
      </div>
    </div>
  );
};

export default QuestionRegister;
