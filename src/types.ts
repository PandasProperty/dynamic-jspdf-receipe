import type jsPDF from 'jspdf';
import { type UserOptions } from 'jspdf-autotable';

interface Field {
  name: string
  value: string
}

interface Logo {
  source: string
  extension: string
  ratioWidthPerHeigh: number
}

export interface GenerateReceiptOptions {
  autoTableUserOptions?: UserOptions
  logo?: Logo
  companyDetails: Field[]
  receiptDetails: Field[]
  purchaseTable: {
    headers: string[]
    items: string[][]
    headerColor?: [number, number, number]
  }
  additionalInfo?: string[]
  ammountDetails?: Field[]
}

export type generateReceipt = (
  doc: jsPDF,
  options: GenerateReceiptOptions
) => void;
