"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
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
            <Avatar />
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
                <MenuItem onCLick={() => {}} label="Airbnb my home" />
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
