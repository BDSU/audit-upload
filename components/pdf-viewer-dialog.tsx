"use client"

import * as React from "react"
import { useState } from "react"
import { PdfViewerProps } from "@/components/pdf-viewer"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import useElementSize from "@/lib/use-element-size"
import { Button, ButtonGroup } from "@/components/ui/button"
import { LucideGalleryVertical, LucideZoomIn, LucideZoomOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import dynamic from "next/dynamic"

const PdfViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
})

interface PdfViewerSizedProps extends Omit<PdfViewerProps, "height" | "width"> {
  zoom: number
}

const PdfViewerSized = ({ zoom, horizontal, ...viewerProps }: PdfViewerSizedProps) => {
  const [target, size] = useElementSize()

  return (
    <div className="overflow-auto h-full w-full" ref={target}>
      <PdfViewer
        {...viewerProps}
        horizontal={horizontal}
        height={horizontal && size ? size?.height * zoom : undefined}
        width={!horizontal && size ? size?.width * zoom : undefined}
        loadingFallback={
          <div className="w-full h-full flex justify-center items-center">
            <Spinner className="w-16 h-16" />
          </div>
        }
      />
    </div>
  )
}

interface PdfViewerDialogProps extends Pick<PdfViewerProps, "file"> {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  fileType: string
  applicantName: string
}

const PdfViewerDialog = ({
  file,
  isOpen,
  setIsOpen,
  fileType,
  applicantName,
}: PdfViewerDialogProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [zoom, setZoom] = useState<number>(100)
  const [horizontal, setHorizontal] = useState<boolean>(true)

  const [menuVisible, setMenuVisible] = useState<boolean>(true)
  let timer: NodeJS.Timeout
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!menuVisible) return setMenuVisible(true)

    clearTimeout(timer)
    timer = setTimeout(() => setMenuVisible(false), 1500)
  }

  const viewerProps = {
    file,
    horizontal,
    pageNumber: -1,
    numPages,
    setNumPages,
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-none">
        <div
          className="relative mx-auto"
          style={{ height: "calc(100vh - 3rem)", width: "calc(100vw - 3rem)" }}
          onMouseMove={handleMouseMove}
        >
          <PdfViewerSized {...viewerProps} zoom={zoom / 100} />

          <div
            className="absolute top-3 left-3 z-10 bg-secondary p-3 pb-2 rounded-md opacity-0 data-[visible=true]:opacity-100 transition-opacity duration-500"
            data-visible={menuVisible}
          >
            <DialogTitle>{fileType}</DialogTitle>
            <DialogDescription>{applicantName}</DialogDescription>
          </div>

          <div
            className="absolute bottom-3 left-[50%] translate-x-[-50%] z-10 opacity-0 data-[visible=true]:opacity-100 transition-opacity duration-500"
            data-visible={menuVisible}
          >
            <ButtonGroup>
              <Button
                size="icon"
                variant="secondary"
                aria-label="Verkleinern"
                onClick={() => setZoom(Math.max(10, zoom - 10))}
              >
                <LucideZoomOut />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary">{zoom}%</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Zoom</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={String(zoom)}
                    onValueChange={(z) => setZoom(Number(z))}
                  >
                    {[10, 30, 50, 80, 100, 120, 150, 170, 200].map((z) => (
                      <DropdownMenuRadioItem key={z} value={z.toString()}>
                        {z}%
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                size="icon"
                variant="secondary"
                aria-label="Vergrößern"
                onClick={() => setZoom(zoom + 10)}
              >
                <LucideZoomIn />
              </Button>

              <Button size="icon" variant="secondary" onClick={() => setHorizontal(!horizontal)}>
                <LucideGalleryVertical
                  className="data-[horizontal=true]:rotate-90 transition-transform"
                  data-horizontal={horizontal}
                />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
PdfViewerDialog.displayName = "PdfViewerDialog"

export { PdfViewerDialog }
