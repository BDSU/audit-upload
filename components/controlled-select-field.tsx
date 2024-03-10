import { ControllerProps, FieldPath, FieldValues } from "react-hook-form"
import * as React from "react"
import { ReactNode } from "react"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ControlledFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {
  options: {
    value: string
    content: ReactNode
    additionalLabel?: ReactNode
  }[]
  placeholder?: string
  tabIndex?: number
  label?: ReactNode
  description?: ReactNode
}

const ControlledSelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  options,
  label,
  description,
  placeholder,
  tabIndex = 0,
  disabled,
  ...props
}: Omit<ControlledFormFieldProps<TFieldValues, TName>, "render">) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger tabIndex={tabIndex}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ value, content, additionalLabel }) => (
                <SelectItem value={value} key={value} additionalLabel={additionalLabel}>
                  {content}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default ControlledSelectField
