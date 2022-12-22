export const RichTextInput = ({
  value,
  title = "",
  autoComplete,
  onChange,
  placeholder = "",
}: any) => (
  <label htmlFor={title} className="flex flex-col font-thin">
    {title}
    <textarea
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      id={title}
      className="p-2 border-b border-t font-normal border-slate-400 focus:outline-0 resize-none"
      onChange={onChange}
    />
  </label>
);
