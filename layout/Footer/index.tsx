import { FC, ReactNode } from "react";
import styles from "./index.module.css";

export const Footer: FC<{ children?: ReactNode }> = ({ children }) => {
	return <footer className={styles.footer}>The footer 2024</footer>;
};
