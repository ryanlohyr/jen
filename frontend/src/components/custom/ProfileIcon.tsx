import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  imageUrl: string;
  username: string;
  size?: "sm" | "lg";
}

const ProfileIcon = ({ imageUrl, username, size = "lg" }: Props) => {
  const initialCharacter = username[0]?.toUpperCase();
  const sizeClass = size === "sm" ? "w-14 h-14" : "w-24 h-24";

  return (
    <Avatar className={sizeClass}>
      <AvatarImage
        className="object-cover rounded-full mr-10 mb-3 sm:mb-0"
        src={`data:image/jpeg;base64,${imageUrl}`}
        alt="Avatar"
      />
      <AvatarFallback>{initialCharacter}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileIcon;
