import { Document, Page, pdfjs } from "react-pdf"
import React from "react"
import { Spinner } from "@/components/ui/spinner"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString()

export interface PdfViewerProps {
  file: string
  width?: number
  height?: number
  horizontal: boolean
  pageNumber: number
  numPages: number | null
  setNumPages: React.Dispatch<React.SetStateAction<number | null>>
  loadingFallback?: React.ReactNode
  errorFallback?: React.ReactNode
}

export default function PdfViewer({
  file,
  width,
  height,
  horizontal,
  pageNumber,
  numPages,
  setNumPages,
  loadingFallback = <Spinner />,
  errorFallback = <span>PDF konnte nicht geladen werden.</span>,
}: PdfViewerProps) {
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => setNumPages(numPages)

  return (
    <Document
      file={file}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={loadingFallback}
      error={errorFallback}
      onContextMenu={(e) => e.preventDefault()}
      className="overflow-auto h-full w-full print:hidden"
    >
      {pageNumber !== -1 ? (
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          width={width}
          height={height}
        />
      ) : (
        <div
          className="flex w-fit mx-auto flex-col data-[orientation=horizontal]:flex-row gap-6"
          data-orientation={horizontal ? "horizontal" : "vertical"}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              width={width}
              height={height}
            />
          ))}
        </div>
      )}
    </Document>
  )
}
