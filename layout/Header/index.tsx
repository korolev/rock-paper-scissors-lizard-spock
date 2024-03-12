import { FC, ReactNode } from "react";
import styles from "./index.module.css";

export const Header: FC<{ children: ReactNode }> = ({ children }) => {
	return <header className={styles.header}>{children}</header>;
};
