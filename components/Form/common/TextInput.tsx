export const TextInput = ({
  value,
  title,
  autoComplete,
  onChange,
  className = "",
}: any) => (
  <label htmlFor={title} className="flex flex-col font-thin gap-y-2">
    {title}
    <input
      autoComplete={autoComplete}
      type="text"
      id={title}
      value={value}
      className={`p-2 border-b font-normal border-slate-400 focus:outline-0 ${className}`}
      onChange={onChange}
    />
  </label>
);
