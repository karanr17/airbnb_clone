"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  const addReduceBtnClass =
    "w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition";

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium text-xl">
            {title}
        </div>
        <div className="font-light text-neutral-500">
            {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div onClick={onReduce} className={addReduceBtnClass}>
          <AiOutlineMinus />
        </div>
        <div className="font-normal text-xl text-neutral-700">
            {value}
        </div>
        <div onClick={onAdd} className={addReduceBtnClass}>
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
