import { ReactNode, FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./index.module.css";
import { ChoiceEnum, IChoice } from "../../interfaces/choices";
import {
  rockIcon,
  paperIcon,
  scissorsIcon,
  lizardIcon,
  spockIcon,
  unknownIcon,
} from "../Icons";

interface ChoiceButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	choice?: IChoice;
	isActive?: boolean;
	onClick?: () => void;
}

const typeToIcon: Record<ChoiceEnum, ReactNode> = {
  [ChoiceEnum.Rock]: rockIcon,
  [ChoiceEnum.Paper]: paperIcon,
  [ChoiceEnum.Scissors]: scissorsIcon,
  [ChoiceEnum.Lizard]: lizardIcon,
  [ChoiceEnum.Spock]: spockIcon,
};

export const ChoiceButton: FC<ChoiceButtonProps> = ({ choice, isActive, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        styles.gameButton,
        styles[`gameButton${choice?.name}`],
        { [styles.isActive]: isActive },
        { [styles.cursorPointer]: !!props.onClick }
      )}
    >
      {choice?.name && typeToIcon[choice.name]
        ? typeToIcon[choice.name]
        : unknownIcon}
    </button>
  );
};
