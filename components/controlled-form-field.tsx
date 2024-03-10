import { ControllerProps, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form"
import * as React from "react"
import { ReactElement, ReactNode } from "react"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface ControlledFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {
  input: ({ field }: { field: ControllerRenderProps<TFieldValues, TName> }) => ReactElement
  label?: ReactNode
  description?: ReactNode
}

const ControlledFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  input,
  label,
  description,
  ...props
}: Omit<ControlledFormFieldProps<TFieldValues, TName>, "render">) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{input({ field })}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default ControlledFormField
