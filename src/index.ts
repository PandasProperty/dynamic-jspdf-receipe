import autoTable from 'jspdf-autotable';

import { type generateReceipt } from './types';

const MARGIN_LATERAL = 10;
const MARGIN_VERTICAL = 10;
const GAP = 4;

const FONT_SIZE = 12;
const LINE_HEIGHT = 6;
const FONT_COLOR = [60, 60, 60] as const;

const LOGO_HEIGHT = 50;

export const generatePdfReceipt: generateReceipt = (
  doc, {
    logo,
    companyDetails,
    receiptDetails,
    purchaseTable,
    additionalInfo,
    ammountDetails,
    autoTableUserOptions
  }) => {
  doc.setFontSize(FONT_SIZE);
  doc.setTextColor(...FONT_COLOR);

  const WIDTH = doc.internal.pageSize.getWidth();
  let cursorY = MARGIN_VERTICAL;
  const cursorX = MARGIN_LATERAL;

  if (logo) {
    let logoWidth = LOGO_HEIGHT * logo.ratioWidthPerHeigh;
    let logoHeight = LOGO_HEIGHT;

    if (logoWidth > WIDTH) {
      const factor = (WIDTH - 2 * MARGIN_LATERAL) / logoWidth;

      logoWidth = logoWidth * factor;
      logoHeight = logoHeight * factor;
    }

    doc.addImage(
      logo.source,
      logo.extension,
      (WIDTH - logoWidth) / 2,
      cursorY,
      logoWidth,
      logoHeight
    );

    cursorY += logoHeight + 4 * GAP;
  }

  let companyCursorY = cursorY;
  companyDetails.map(({ name, value }) => {
    doc.text(
      `${name}: ${value}`,
      cursorX,
      companyCursorY,
      { align: 'left' }
    );
    companyCursorY += LINE_HEIGHT;
  });

  let receiptCursorY = cursorY;
  receiptDetails.map(({ name, value }) => {
    doc.text(
      `${name}: ${value}`,
      (WIDTH - cursorX),
      receiptCursorY,
      { align: 'right' }
    );
    receiptCursorY += LINE_HEIGHT;
  });

  cursorY = Math.max(companyCursorY, receiptCursorY) + GAP;

  doc.line(cursorX, cursorY, WIDTH - cursorX, cursorY);

  cursorY += GAP;

  autoTable(doc, {
    theme: 'grid',
    startY: cursorY,
    head: [purchaseTable.headers],
    body: purchaseTable.items,
    margin: cursorX,
    styles: { fillColor: [255, 255, 255] },
    headStyles: purchaseTable.headerColor
      ? {
          fillColor: purchaseTable.headerColor
        }
      : undefined,
    didDrawPage: function(data) {
      if (data.cursor) {
        cursorY = data.cursor.y + 2 * GAP;
      }
    },
    ...autoTableUserOptions
  });

  if (ammountDetails) {
    cursorY += GAP;

    ammountDetails.map(({ name, value }) => {
      doc.text(
        name,
        WIDTH - 50,
        cursorY,
        { align: 'right' }
      );
      doc.text(
        value,
        WIDTH - cursorX,
        cursorY,
        { align: 'right' }
      );
      doc.setDrawColor(230, 230, 230);
      doc.line(cursorX, cursorY + 2, WIDTH - cursorX, cursorY + 2);
      cursorY += LINE_HEIGHT + 2;
    });
  }

  cursorY += GAP;

  if (additionalInfo) {
    additionalInfo.map((text) => {
      doc.text(
        text,
        WIDTH / 2,
        cursorY,
        { align: 'center' }
      );
      cursorY += LINE_HEIGHT;
    });
  }
}
