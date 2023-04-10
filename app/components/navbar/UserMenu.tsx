"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";

import { SafeUser } from "@/app/types";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onRent = useCallback(() => {
    if(!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  },[currentUser, loginModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
            "
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleModal}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
            "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onCLick={() => {}} label="My trips" />
                <MenuItem onCLick={() => {}} label="My favourites" />
                <MenuItem onCLick={() => {}} label="My reservations" />
                <MenuItem onCLick={() => {}} label="My properties" />
                <MenuItem onCLick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onCLick={() => signOut()} label="Logout" />

              </>
            ) : (
              <>
                <MenuItem onCLick={loginModal.onOpen} label="Login" />
                <MenuItem onCLick={registerModal.onOpen} label="SignUp" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
