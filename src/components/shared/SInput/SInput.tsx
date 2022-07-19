import React, { FC, HTMLInputTypeAttribute, Dispatch, SetStateAction } from "react"

interface Props {
  value: string
  onChange: (value: string) => any | Dispatch<SetStateAction<string>>
  id: string
  inputClassName?: string
  className?: string
  label?: string
  name?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  onKeyDown?: (e: React.KeyboardEvent) => any
}

export const SInput: FC<Props> = ({ value, onChange, id, label, name, placeholder, type, onKeyDown, className = '', inputClassName = '' }) => {
  const classes = `s-input__input outline-none bg-slate-200 h-full px-4 w-full transition duration-300 focus:bg-slate-100 focus:transition focus:duration-0 ${inputClassName}`

  return (
    <div className={`s-input rounded-2xl overflow-hidden h-10 ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          className={classes + ` resize-none`}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown ? (e) => onKeyDown(e) : undefined}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          name={name}
          autoComplete={type === 'password' ? 'on' : 'off'}
          className={classes}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown ? (e) => onKeyDown(e) : undefined}
        />
      )}
    </div>
  )
}