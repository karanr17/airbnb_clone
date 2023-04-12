import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const isFavourite = false;
    const toggleSave = () => {};

  return (
    <div
        onCanPlay={toggleSave} 
        className="
            relative
            hover:opacity-80
            transition
            cursor-pointer
        ">
            <AiFillHeart 
                size={20}
                className={`
                    ${isFavourite ? 'fill-rose-500' : 'fill-neutral-500/70'}
                    absolute
                    top-[4px]
                    right-[4.5px]
                `}
            />
            <AiOutlineHeart 
                size={25}
                className="fill-white absolute top-[2px] right-[2px]"
            />
    </div>
  )
}

export default HeartButton