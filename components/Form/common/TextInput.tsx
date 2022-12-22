export const TextInput = ({
  value,
  title,
  autoComplete,
  onChange,
  className = "",
  placeholder = "",
  type = "text",
}: any) => (
  <label htmlFor={title} className="flex flex-col font-thin ">
    {title}
    <input
      autoComplete={autoComplete}
      placeholder={placeholder}
      type={type}
      id={title}
      value={value}
      className={`p-2 border-b font-normal border-slate-400 focus:outline-0 ${className}`}
      onChange={onChange}
    />
  </label>
);
