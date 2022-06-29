import React, { FC, HTMLInputTypeAttribute, Dispatch, SetStateAction }  from "react"

interface Props {
  value: string
  onChange: (value: string) => any | Dispatch<SetStateAction<string>>
  id: string
  className?: string 
  label?: string
  name?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
}

export const SInput: FC<Props> = ({ value, onChange, id, label, name, placeholder, type, className = '' }) => (
  <div className={`s-input ${className}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <input
      id={id}
      type={type}
      value={value}
      name={name}
      className="s-input__input outline-none bg-slate-200 rounded-2xl h-10 px-4 w-full transition duration-300 focus:bg-slate-100 focus:transition focus:duration-0"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)