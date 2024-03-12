import { ReactNode, FC, ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classNames from "classnames";
import styles from "./index.module.css";

export type ButtonAppearance = "primary" | "secondary";

interface ButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	appearance?: ButtonAppearance;
	onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
  className,
  appearance,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(styles.button, className, {
        [styles.buttonPrimary]: appearance === "primary",
        [styles.buttonSecondary]: appearance === "secondary",
      })}
    >
      {children}
    </button>
  );
};
