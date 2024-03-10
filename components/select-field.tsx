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
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LucideChevronDown } from "lucide-react"

interface SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {
  label?: ReactNode
  description?: ReactNode
  placeholder?: string
  options: {
    value: string
    label: string
  }[]
}

const SelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  placeholder = "Bitte auswählen...",
  options,
  disabled,
  ...props
}: Omit<SelectFieldProps<TFieldValues, TName>, "render">) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div className="relative">
            <FormControl>
              <select
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "block w-full appearance-none bg-transparent font-normal"
                )}
                {...field}
                disabled={disabled}
              >
                {options.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </FormControl>
            <LucideChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default SelectField
