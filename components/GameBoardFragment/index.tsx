import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import styles from "./index.module.css";
import classNames from "classnames";

interface GameBoardFragmentProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
		isLoading?: boolean;
		isStyled?: boolean;
	}

export const GameBoardFragment: FC<GameBoardFragmentProps> = ({ isLoading, isStyled, children }) => {	
  return <div className={classNames(styles.board, {[styles.boardStyled]: isStyled !== false})}>
    {children}
    {isLoading && <div className={styles.boardOverlay} />}
  </div>;
};
