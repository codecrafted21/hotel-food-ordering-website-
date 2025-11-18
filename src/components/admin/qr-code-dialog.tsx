'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import QRCode from 'react-qr-code';

type QrCodeDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  tableNumber: number;
  qrUrl: string;
};

export function QrCodeDialog({
  isOpen,
  onOpenChange,
  tableNumber,
  qrUrl,
}: QrCodeDialogProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const qrCodeEl = document.getElementById(`qr-code-for-table-${tableNumber}`);
      if (qrCodeEl) {
        printWindow.document.write(`
          <html>
            <head>
              <title>QR Code for Table ${tableNumber}</title>
              <style>
                @media print {
                  body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: sans-serif;
                    text-align: center;
                  }
                  .print-container {
                    border: 2px dashed #000;
                    padding: 40px;
                  }
                  @page {
                    size: A5;
                    margin: 0;
                  }
                }
              </style>
            </head>
            <body>
              <div class="print-container">
                <h1>Table ${tableNumber}</h1>
                <p>Scan to order</p>
                ${qrCodeEl.outerHTML}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">QR Code for Table {tableNumber}</DialogTitle>
          <DialogDescription>
            Customers can scan this code to open the menu for this table.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4 bg-white rounded-lg">
          <div id={`qr-code-for-table-${tableNumber}`}>
            <QRCode value={qrUrl} size={256} />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button type="button" onClick={handlePrint}>
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
