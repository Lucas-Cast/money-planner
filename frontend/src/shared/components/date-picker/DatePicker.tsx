import { TextInput } from '@/shared/components/text-input'
import type { ComponentProps } from 'react'

type DatePickerProps = Omit<ComponentProps<typeof TextInput>, 'type'>

export function DatePicker(props: DatePickerProps) {
  return <TextInput {...props} type="date" />
}
