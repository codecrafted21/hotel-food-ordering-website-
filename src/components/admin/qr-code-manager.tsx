'use client';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function QrCodeManager() {
  const [tableNumber, setTableNumber] = useState('1');
  const [qrValue, setQrValue] = useState('');

  const generateQrCode = () => {
    // This should be the URL of your deployed application
    // For local development, you might need to find your public dev URL
    const baseUrl = window.location.origin;
    setQrValue(`${baseUrl}/?table=${tableNumber}`);
  };

  const printQrCode = () => {
    const qrCodeElement = document.getElementById('qr-code-to-print');
    if (qrCodeElement) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Print QR Code</title>');
            printWindow.document.write('<style>@media print { body { display: flex; justify-content: center; align-items: center; height: 100vh; } }</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write(qrCodeElement.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    }
  };

  return (
    <Card className="mt-6">
        <CardHeader>
            <CardTitle className="font-headline">Table QR Code Generator</CardTitle>
            <CardDescription>Generate and print a QR code for each table in your restaurant.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
             <div className="w-full max-w-xs space-y-2">
                <Label htmlFor="table-number">Table Number</Label>
                <Input
                    id="table-number"
                    type="number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    min="1"
                />
            </div>
            <Button onClick={generateQrCode}>Generate QR Code</Button>

            {qrValue && (
                <div className="mt-4 flex flex-col items-center gap-4 p-6 bg-secondary rounded-lg">
                    <div id="qr-code-to-print" className="p-4 bg-white">
                        <QRCode value={qrValue} size={256} />
                    </div>
                     <p className="text-sm text-center text-muted-foreground">For Table {tableNumber}</p>
                    <Button variant="outline" onClick={printQrCode}>Print QR Code</Button>
                </div>
            )}
        </CardContent>
    </Card>
  );
}
