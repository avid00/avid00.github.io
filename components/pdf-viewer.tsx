// components/PdfModal.tsx
"use client"

import React, { useState } from "react"
import { X } from "lucide-react"

type PdfModalProps = {
  href: string
  title?: string
}

export default function PdfModal({ href, title }: PdfModalProps) {
  const [open, setOpen] = useState(false)
  // null = unknown (we couldn't determine), true = can embed, false = won't embed (show download)
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null)

  const encodedHref = encodeURI(href)

  // check headers before opening modal to detect if embedding will work
  // this is optional but helps avoid a blank iframe when the server forces download
  async function handleOpen() {
    try {
      // HEAD is sufficient to inspect headers; same-origin public files should allow this
      const res = await fetch(encodedHref, { method: "HEAD" })
      const contentType = res.headers.get("content-type") || ""
      const contentDisposition = res.headers.get("content-disposition") || ""

      const isPdf = contentType.toLowerCase().includes("pdf")
      const forcedDownload = /attachment/i.test(contentDisposition)

      setCanEmbed(isPdf && !forcedDownload)
    } catch (err) {
      // If HEAD fails (CORS, network), leave canEmbed unknown so we still try to embed,
      // and fall back to the download link if the object/iframe remains blank.
      setCanEmbed(null)
      console.warn("Could not HEAD-check PDF:", err)
    } finally {
      setOpen(true)
    }
  }

  function handleClose() {
    setOpen(false)
    setCanEmbed(null)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="px-3 py-1 text-sm border border-fuchsia-500/60 rounded hover:bg-fuchsia-900/10 transition-colors duration-200"
      >
        {title || "View Report"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-5xl h-[85vh] bg-zinc-900 rounded-md shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              aria-label="Close PDF"
              className="absolute top-3 right-3 z-20 p-2 rounded bg-black/60 border border-gray-700"
            >
              <X size={16} className="text-white" />
            </button>

            {/* If we explicitly know embedding won't work, skip embedding and show fallback UI */}
            {canEmbed === false ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <p className="text-center text-gray-300 mb-4">
                  This file is served as a download and cannot be displayed inline.
                </p>
                <div className="flex gap-4">
                  <a
                    href={encodedHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-cyan-500 rounded text-cyan-100 hover:bg-cyan-900/20"
                  >
                    Open in new tab
                  </a>
                  <a
                    href={encodedHref}
                    download
                    className="px-4 py-2 border border-fuchsia-500 rounded text-fuchsia-100 hover:bg-fuchsia-900/20"
                  >
                    Download
                  </a>
                </div>
              </div>
            ) : (
              // Try to embed using <object>. <iframe> is fallback. If both fail, show the fallback links.
              <object
                data={encodedHref}
                type="application/pdf"
                className="w-full h-full"
                aria-label={title ?? "PDF viewer"}
              >
                <iframe
                  src={encodedHref}
                  title={title ?? "PDF Report"}
                  className="w-full h-full"
                  style={{ border: "none" }}
                />
                <div className="p-6 bg-zinc-900 text-center">
                  <p className="mb-4 text-gray-300">This browser cannot display the PDF inline.</p>
                  <a
                    href={encodedHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-cyan-300"
                  >
                    Open the report in a new tab
                  </a>
                  {" · "}
                  <a href={encodedHref} download className="underline text-fuchsia-300">
                    Download PDF
                  </a>
                </div>
              </object>
            )}
          </div>
        </div>
      )}
    </>
  )
}
