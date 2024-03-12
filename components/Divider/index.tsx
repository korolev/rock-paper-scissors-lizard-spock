import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './index.module.css';
import cn from 'classnames';

interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  return (
    <hr className={cn(className, styles.hr)} {...props} />
  );
};