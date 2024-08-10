import React, { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, type = "text", classnames = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="inline-block mb-1 pl-1">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-3 py-2 rounded-xl bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classnames}`}
          ref={ref}
          id={id}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
