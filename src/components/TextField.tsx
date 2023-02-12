import React from "react";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  setValue: Function;
}

export default function TextField(props: Props) {
  return (
    <div className="text-left w-full">
      <p className="text-gray-700 text-sm mt-2">{props.label}</p>
      <input
        className="rounded-lg border p-3 w-full"
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
      />
    </div>
  );
}
