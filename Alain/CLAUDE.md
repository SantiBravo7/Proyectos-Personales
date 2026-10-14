# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

No code exists yet. The full spec is [requisitos-cotizaciones-v4.md](requisitos-cotizaciones-v4.md) (in Spanish) — read it before implementing anything; it is the source of truth and records which design decisions were already approved. User-facing text and the generated document are in Spanish (Argentina).

## What is being built

A quote ("cotización") PDF generator for the business *jtclimatizacion & electricidad*, based on a reference PDF (quote 000150). The user fills a form on a phone, previews the document, then downloads and/or shares it as a PDF.

## Hard constraints

- **Single self-contained HTML file**, opened directly from the phone's storage (`file://`), no server, no internet. Every script, style, font, logo and icon must be inlined (embedded SVG / data URIs). No CDN libraries — any PDF library must be pasted inline.
- **Mobile-first, touch-first**: small screen, large tap targets. Desktop is not the target.
- PDF generation happens entirely on the device.

## Key behaviors (details in the spec)

- **Quote number**: persisted on the device (localStorage), zero-padded to 6 digits (`000150`), auto-increments by one each time a PDF is generated, but remains editable; manual edits become the new base.
- **Items**: add/remove rows of description, quantity, unit price. Line amount = qty × unit price; total = sum of lines. Money format `$ 280.000,00` (dot thousands, comma decimals).
- **Item row layout**: description left, quantity slightly right of it (always shown), line amount flush right; unit price shown under the description in small grey text (`PU $ 280.000,00`). Total after extra spacing.
- **Observaciones**: prominent block near the total (soft background, red stripe, red title) — never a footnote.
- **Header**: logo + issuer data (Tel: `11 6250-7088`, Mail: jtclimatizacion@gmail.com, Zona: Capital) on the left; quote number and date top right; client name below issuer data.
- **Footer on every page**: separator line, WhatsApp and Instagram with their *official* logos (embedded), centered copyright line with year and business name. WhatsApp/Instagram come from the form; hide Instagram if empty.
- **Preview** button shows the document before generating the PDF.
- **Download and Share are separate actions**, both available after generation and from the preview. Share uses the Web Share API with files (`navigator.canShare({files})`); if unsupported, hide or warn and keep download. File name: `Cotizacion-<número>.pdf` for both.
- Approved visual direction: white background, logo colors (blue and red) as accents, colored top band, soft-background blocks for client and observations, blue bar for the total. Livelier than the original but not ultramodern. No "CamScanner" mark.

## Known risks to verify on a real phone

- Web Share with files may be disabled on `file://` pages (not a secure context in some browsers).
- localStorage may not persist for locally opened files on some mobile browsers.

## Pending inputs from the client

New logo file, real Instagram handle, WhatsApp number (may equal the header phone), and whether "Forma de pago" (`Efectivo/transferencia`) and "Validez" (`3 días`) stay editable or become fixed text.
