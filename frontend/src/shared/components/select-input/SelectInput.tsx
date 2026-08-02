import { forwardRef, type SelectHTMLAttributes } from 'react'

type SelectOption = {
  value: string
  label: string
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: SelectOption[]
  helperMessage?: string
  errorMessage?: string
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ id, label, options, helperMessage, errorMessage, className = '', ...props }, ref) => {
    const selectId = id ?? props.name
    const message = errorMessage ?? helperMessage

    return (
      <div className="space-y-2">
        <label htmlFor={selectId} className="block text-sm font-medium text-[var(--text-h)]">
          {label}
        </label>
        <select
          {...props}
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={message ? `${selectId}-message` : undefined}
          className={`w-full rounded-2xl border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text-h)] outline-none transition focus:border-[var(--text-h)] focus:ring-4 focus:ring-[var(--accent-bg)] ${errorMessage ? 'border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-950' : 'border-[var(--border)]'} ${className}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {message && (
          <p id={`${selectId}-message`} className={`text-xs ${errorMessage ? 'text-red-600 dark:text-red-400' : 'text-[var(--text)]'}`}>
            {message}
          </p>
        )}
      </div>
    )
  },
)

SelectInput.displayName = 'SelectInput'
