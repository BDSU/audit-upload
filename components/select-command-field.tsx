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
import { Check, LucideChevronDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { CommandLoading } from "cmdk"

interface SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {
  label?: ReactNode
  description?: ReactNode
  placeholder?: string
  options:
    | {
        value: string
        label: string
      }[]
    | undefined
}

const CommandSelectField = <
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
              <Command
                filter={(value, search) => {
                  return value.split("|")[0].includes(search) ? 1 : 0
                }}
              >
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>Keine Treffer gefunden.</CommandEmpty>
                  {options === undefined ? (
                    <CommandLoading>Wird geladen...</CommandLoading>
                  ) : (
                    options.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={`${item.label}|${item.value}`}
                        onSelect={(selected) => {
                          selected = selected.split("|")[1]
                          field.onChange(selected === field.value ? "" : selected)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))
                  )}
                </CommandList>
              </Command>
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
export default CommandSelectField
