import { forwardRef, useId } from "react";
import React from "react";

const Select = ({ options=[], label, classname = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full ">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
        ref={ref}
      >
        {
            options?.map((option) => (
                <option value={option} key={option}>{option}</option>
            ))
        }
      </select>
    </div>
  );
};

export default forwardRef(Select);
