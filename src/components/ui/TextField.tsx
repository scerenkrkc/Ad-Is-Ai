import type { ReactNode } from "react";

type TextFieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
};

export function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
  icon,
  trailing,
}: TextFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <div className="relative mt-1.5">
        {icon ? (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        ) : null}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-xl border bg-white py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
            icon ? "pl-10" : "pl-3.5"
          } ${trailing ? "pr-11" : "pr-3.5"} ${
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/15"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/15"
          }`}
        />
        {trailing ? (
          <div className="absolute top-1/2 right-2 -translate-y-1/2">{trailing}</div>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
