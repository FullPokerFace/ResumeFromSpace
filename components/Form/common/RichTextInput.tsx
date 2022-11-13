export const RichTextInput = ({
  value,
  title,
  autoComplete,
  onChange,
}: any) => (
  <label htmlFor={title} className="flex flex-col font-thin gap-y-2">
    {title}
    <textarea
      value={value}
      autoComplete={autoComplete}
      id={title}
      className="p-2 border-b border-t font-normal border-slate-400 focus:outline-0 resize-none"
      onChange={onChange}
    />
  </label>
);
