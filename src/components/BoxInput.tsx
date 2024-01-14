import React from "react";

type BoxInputProps = {
    id: string,
    label: string,
    type: string,
    placeHolder: string
}

const BoxInput = ({id, label, type, placeHolder}: BoxInputProps) => {
  return (
    <div className="flex flex-col py-2 w-full px-8 gap-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeHolder}
        required
        className="py-3 border border-miniText focus:border-2 focus:outline-none focus:border-primary px-3 rounded-lg"
      />
    </div>
  );
};

export default BoxInput;
