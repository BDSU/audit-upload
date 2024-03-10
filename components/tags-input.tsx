import { InputProps } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import React, { useEffect, useState } from "react"

interface TagsInputProps extends Omit<InputProps, "value" | "onChange"> {
  value: string[]
  onChange: (value: string[]) => void
}

export default function TagsInput({ value: propValue, onChange }: TagsInputProps) {
  const [value, setValue] = useState<string[]>(propValue ?? [])
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      if (inputValue) {
        setValue((prev) => [...prev, inputValue])
        setInputValue("")
      }
      return event.preventDefault()
    }

    if (event.key === "Backspace" && value.length && !inputValue) {
      setValue((prev) => prev.slice(0, prev.length - 1))
      return event.preventDefault()
    }
  }

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <div className="flex items-center pl-3 gap-3 h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      {value.map((tag) => (
        <Badge key={tag} className="h-6">
          {tag}
        </Badge>
      ))}

      <input
        type="text"
        className="grow bg-transparent h-full focus-visible:outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
