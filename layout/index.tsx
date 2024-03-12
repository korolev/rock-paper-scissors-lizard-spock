import { FC, ReactNode } from "react";
import { Inter } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Logo } from "../components/Logo";
import styles from "./index.module.css";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {

	return (
		<div className={classNames(styles.wrapper, inter.className)}>
			<Header>
				<Logo />
				<Navbar />
			</Header>
			<main className={styles.main}>{children}</main>
			<Footer />
		</div>
	);
};
