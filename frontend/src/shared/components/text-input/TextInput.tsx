import { forwardRef, type InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  helperMessage?: string
  errorMessage?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, helperMessage, errorMessage, className = '', ...props }, ref) => {
    const inputId = id ?? props.name
    const message = errorMessage ?? helperMessage

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-sm font-medium text-[var(--text-h)]">
          {label}
        </label>
        <input
          {...props}
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={message ? `${inputId}-message` : undefined}
          className={`w-full rounded-2xl border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text-h)] outline-none transition placeholder:text-[var(--text)] focus:border-[var(--text-h)] focus:ring-4 focus:ring-[var(--accent-bg)] ${errorMessage ? 'border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-950' : 'border-[var(--border)]'} ${className}`}
        />
        {message && (
          <p id={`${inputId}-message`} className={`text-xs ${errorMessage ? 'text-red-600 dark:text-red-400' : 'text-[var(--text)]'}`}>
            {message}
          </p>
        )}
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'
