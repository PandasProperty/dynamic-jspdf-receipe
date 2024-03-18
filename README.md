# dynamic-jspdf-receipt - Pdf receipt generator with [jsPDF](https://www.npmjs.com/package/jspdf) and [jsPDF-AutoTable](https://www.npmjs.com/package/jspdf-autotable)

**Generate PDF tables with Javascript**

This jsPDF plugin adds the ability to generate PDF tables either by parsing HTML tables or by using Javascript data directly.

![sample javascript table pdf](sample.png)

## Installation

Get jsPDF, jsPDF-AutoTable and this plugin by doing one of these things:

- `npm install jspdf jspdf-autotable dynamic-jspdf-receipt`

## Usage

```js
import jsPDF from 'jspdf'
import generatePdfreceipt from 'dynamic-jspdf-receipt'

const doc = new JsPDF({
  compress: true,
});

generatePdfReceipt(doc, {
  logo: {
    source: images[language],
    extension: 'PNG',
    ratioWidthPerHeigh: ratioWidthPerHeigh[language],
  },
  companyDetails: [
    {
      name: 'Company name',
      value: 'Yalla Bus',
    },
    {
      name: 'Company address',
      value: 'Baghdad, str My street',
    },
    {
      name: 'Company phone',
      value: YALLA_BUS_PHONE_NUMBER,
    },
  ],
  receiptDetails: [
    {
      name: 'Receipe nr.',
      value: '00000001',
    },
    {
      name: 'Receipe date',
      value: dayjs(new Date()).format('ddd, DD MMM YYYY, HH:MM'),
    },
  ],
  purchaseTable: {
    headers: ['Ticket', 'Quantity', 'Cost'],
    items: [
      ['Baghdad - Basra', '2', '12$'],
      ['Basra - Baghdad', '2', '14$'],
    ],
    headerColor: [0, 95, 173],
  },
  additionalInfo: ['Test footer'],
  ammountDetails: [
    {
      name: 'Total Cost',
      value: '52$',
    },
    {
      name: 'Discount',
      value: '4$',
    },
    {
      name: 'Total Cost',
      value: '48$',
    },
  ],
});

doc.save('table.pdf')
```