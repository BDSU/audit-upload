import { ControllerProps, FieldPath, FieldValues } from "react-hook-form"
import { ReactNode } from "react"
import { Input } from "@/components/ui/input"
import ControlledFormField from "@/components/controlled-form-field"

interface ControlledFileFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: ReactNode
  description?: ReactNode
  onChange?: (value: File | null) => void
  accept?: string
}

const ControlledFileField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  accept,
  ...props
}: Omit<ControlledFileFieldProps<TFieldValues, TName>, "render">) => {
  return (
    <ControlledFormField
      {...props}
      input={({ field: { value, onChange, ...field } }) => (
        <Input
          type="file"
          accept={accept}
          value={value?.filename}
          onChange={(e) => {
            onChange(e.target.files![0])
            if (props.onChange) props.onChange(e.target.files![0])
          }}
          data-chosen={!!value}
          tabIndex={0}
          {...field}
        />
      )}
    />
  )
}
export default ControlledFileField
