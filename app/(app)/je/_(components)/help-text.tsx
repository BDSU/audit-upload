import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import loadMarkdown from "@/app/(app)/je/_(components)/load-markdown"

interface HelpTextProps {
  visible: boolean
  path: string
}

export default function HelpText({ visible, path }: Readonly<HelpTextProps>) {
  const [markdownSource, setMarkdownSource] = useState<string | null>(null)

  useEffect(() => {
    if (visible && !markdownSource) loadMarkdown(path).then(setMarkdownSource)
  }, [visible, markdownSource, path])

  return (
    <Markdown
      components={{
        ul: ({ node, ...props }) => <ul className="list-disc list-inside" {...props} />,
        h1: ({ node, ...props }) => <h1 className="text-2xl" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl" {...props} />,
      }}
    >
      {markdownSource}
    </Markdown>
  )
}
