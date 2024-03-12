import { FC } from "react";
import { getInitials } from "../../utils";
import styles from "./index.module.css";
interface UserAvatarProps {
	name: string;
	backgroundColor: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ name, backgroundColor }) => {
  const initials = getInitials(name);

  return (
    <div className={styles.placeholder} style={{ backgroundColor }}>
      {initials}
    </div>
  );
};
