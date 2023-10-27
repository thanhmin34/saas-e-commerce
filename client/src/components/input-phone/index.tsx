import React, { ChangeEventHandler, useState } from "react";
import InputMask from "react-input-mask";
const PHONE_INPUT_MASK_DEFAULT = "999-999-9999";
import styles from "./styles.module.scss";
interface InputProps {
  phone: number | string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
  name?: string;
  isRequired?: boolean;
}
const InputPhone = (props: InputProps) => {
  const {
    phone,
    onChange,
    className,
    disabled,
    name = "phone",
    isRequired = false,
  } = props;
  const countryCode = "+996";
  const phoneInputMaskCountry = "999-999-9999";
  const placeholderCountry = "50-000-0000";
  const nationalFlagsImage = "";

  const [mask, updateMask] = useState(phoneInputMaskCountry);
  const url =
    "https://media.9ten.cloud/media///snaptec/pwa/default/SA-square_1_1.png";

  //   function beforeMaskedValueChange(newState, oldState, userInput) {
  //     let { value, selection } = newState || {};
  //     var { value: oldValue } = oldState;

  //     if (userInput) {
  //       userInput = userInput.trim();

  //       const prefix = countryCode?.startsWith("+")
  //         ? countryCode?.slice(1)
  //         : countryCode;

  //       if (
  //         prefix &&
  //         (userInput.startsWith(`+${prefix}`) || userInput.startsWith(prefix))
  //       ) {
  //         value = userInput
  //           .replace(prefix, "")
  //           .replace("+", "")
  //           .replace(/\s/g, "");
  //       }
  //     }

  //     if (value.startsWith("0")) value = value.slice(1);

  //     return {
  //       value,
  //       selection,
  //     };
  //   }

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (value.length > 3) {
      updateMask(phoneInputMaskCountry);
    } else updateMask(PHONE_INPUT_MASK_DEFAULT);

    onChange(e);
  };

  return (
    <div
      className={`${styles.inputPhone} ${styles.element} ${
        className ? className : ""
      } `}
    >
      <div className={disabled ? styles.disabledInput : styles.enableInput}>
        <div className="input-phone__img-container">
          <div className={styles.img}>
            <img src={url} alt="icon-country" width={30} height={20} />
          </div>
        </div>
        <span className={styles.placeholder}>{countryCode}</span>
      </div>
      <InputMask
        mask={mask}
        className={styles.inputMask}
        placeholder={placeholderCountry || "500-000-000"}
        type="tel"
        value={phone}
        name={name}
        onChange={onChangePhone}
        // beforeMaskedValueChange={beforeMaskedValueChange}
        maskChar={null}
        disabled={disabled ?? false}
      />
      {isRequired && <div className={styles.iconRequired}>*</div>}
    </div>
  );
};

export default InputPhone;
