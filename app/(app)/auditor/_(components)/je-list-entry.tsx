interface ChecklistEntryProps {
  name: string
  checked: boolean
}

export default function ChecklistEntry({ name, checked }: ChecklistEntryProps) {
  return (
    <div className="flex items-center justify-between h-16 px-3 hover:bg-accent transition-colors cursor-pointer">
      <div className="flex items-center">
        <span className="text-lg ml-3">{name}</span>
      </div>
    </div>
  )
}
