import { ReactNode, FC, ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classNames from "classnames";
import styles from "./index.module.css";

export interface LogoProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	onClick?: () => void;
}

export const Logo: FC<LogoProps> = ({ onClick }) => {
  return (
    <div className={styles.logo} onClick={onClick}>
			RPSLS
    </div>
  );
};
