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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {
  label?: ReactNode
  description?: ReactNode
  placeholder?: string
  options?: {
    value: string
    label: string
  }[]
  align?: "horizontal" | "vertical"
}

const RadioGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  options,
  disabled,
  align = "horizontal",
  ...props
}: Omit<SelectFieldProps<TFieldValues, TName>, "render">) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row data-[align=vertical]:flex-col gap-3"
              disabled={disabled}
              data-align={align}
            >
              {options?.map(({ value, label }) => (
                <FormItem className="flex items-center space-x-1 space-y-0" key={value}>
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal">{label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default RadioGroupField
