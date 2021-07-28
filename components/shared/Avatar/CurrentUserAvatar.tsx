import { useAuth } from "providers/AuthProvider";
import React from "react";
import { Avatar, AvatarProps } from "./Avatar";
import { UserIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { getHSLFromString } from "utils/hueHelpers";
import { getInitialsFromDisplay } from "utils/getInitials";

export interface CurrentUserAvatarProps extends AvatarProps {}

export const CurrentUserAvatar: React.FC<CurrentUserAvatarProps> = (props) => {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <Avatar
        className={clsx("text-white bg-gray-700", loading && "animate-pulse")}
      >
        <UserIcon width={24} />
      </Avatar>
    );
  }

  return (
    <Avatar
      backgroundColor={getHSLFromString(user.email ?? user.uid, 80, 30)}
      textColor={"#fff"}
    >
      {user.photoURL ? (
        <img
          src={user.photoURL}
          alt={getInitialsFromDisplay(user.displayName ?? "")}
        />
      ) : (
        <>{getInitialsFromDisplay(user.displayName ?? "")}</>
      )}
    </Avatar>
  );
};
