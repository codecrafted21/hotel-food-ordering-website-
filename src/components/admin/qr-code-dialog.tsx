'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { Printer } from "lucide-react";

type QrCodeDialogProps = {
  tableId: number;
  waiterName?: string;
  qrUrl: string;
  onOpenChange: (open: boolean) => void;
};

export function QrCodeDialog({ tableId, waiterName, qrUrl, onOpenChange }: QrCodeDialogProps) {
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const qrCodeSVG = document.getElementById(`qr-code-for-table-${tableId}`)?.outerHTML;
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code for Table ${tableId}</title>
            <style>
              body { font-family: sans-serif; text-align: center; padding: 50px; }
              svg { max-width: 80%; height: auto; }
              h1 { font-size: 2rem; }
              p { font-size: 1.2rem; }
            </style>
          </head>
          <body>
            <h1>Table ${tableId}</h1>
            <p>Scan to Order</p>
            ${qrCodeSVG || ''}
            ${waiterName ? `<p>Your waiter: ${waiterName}</p>` : ''}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };


  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center">QR Code for Table {tableId}</DialogTitle>
          <DialogDescription className="text-center">
            Customers can scan this code to access the menu for this table.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 bg-white rounded-lg flex items-center justify-center">
          <QRCode
            id={`qr-code-for-table-${tableId}`}
            value={qrUrl}
            size={256}
            viewBox={`0 0 256 256`}
          />
        </div>
         {waiterName && (
            <p className="text-center text-muted-foreground">Assigned Waiter: <strong>{waiterName}</strong></p>
        )}
        <DialogFooter>
            <Button onClick={handlePrint} className="w-full">
                <Printer className="mr-2 h-4 w-4" />
                Print
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
