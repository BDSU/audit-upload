"use client"

import * as React from "react"
import { useState } from "react"
import { PdfViewerProps } from "@/components/pdf-viewer"
import { Button, ButtonGroup } from "@/components/ui/button"
import { LucideChevronLeft, LucideChevronRight, LucideMaximize2 } from "lucide-react"
import useElementSize from "@/lib/use-element-size"
import Link from "next/link"
import dynamic from "next/dynamic"

interface PdfViewerWrapperProps extends Pick<PdfViewerProps, "file"> {
  fullscreenHref: string
}

const PdfViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
})

const PdfViewerWrapper = ({ file, fullscreenHref }: PdfViewerWrapperProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [horizontal, setHorizontal] = useState<boolean>(false)

  const viewerProps = {
    file,
    horizontal,
    pageNumber,
    numPages,
    setNumPages,
  }

  const [target, size] = useElementSize()

  return (
    <div className="h-full w-fit group relative mx-auto" ref={target}>
      <PdfViewer {...viewerProps} height={size?.height} />

      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {fullscreenHref && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3"
            aria-label="Vollbild"
            asChild
          >
            <Link href={fullscreenHref} prefetch={false}>
              <LucideMaximize2 />
            </Link>
          </Button>
        )}

        {numPages && numPages > 1 && (
          <div className="absolute bottom-3 left-[50%] translate-x-[-50%]">
            <ButtonGroup>
              <Button
                size="icon"
                variant="secondary"
                disabled={pageNumber === 1}
                onClick={() => setPageNumber(pageNumber - 1)}
                aria-label="Vorherige Seite"
              >
                <LucideChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                disabled={pageNumber === numPages}
                onClick={() => setPageNumber(pageNumber + 1)}
                aria-label="Nächste Seite"
              >
                <LucideChevronRight />
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
    </div>
  )
}
PdfViewerWrapper.displayName = "PdfViewerWrapper"

export { PdfViewerWrapper }
