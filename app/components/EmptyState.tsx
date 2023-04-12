'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    subtitle,
    showReset
}) => {

    const router = useRouter();
  return (
    <div className="
        h-[80vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
    ">
        <Heading 
            title="No exact matches"
            subTitle="Try changing or removing applied filters"
            center
        />
        <div className="w-48 pt-4">
            {showReset && (
                <Button 
                    outline
                    label="Reset All Filters"
                    onClick={() => router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState