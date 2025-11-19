'use client';

import { useState } from 'react';
import type { Table, Waiter } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { QrCode, User } from 'lucide-react';
import { QrCodeDialog } from './qr-code-dialog';

type TableManagementClientProps = {
  tables: Table[];
  waiters: Waiter[];
};

export function TableManagementClient({ tables: initialTables, waiters }: TableManagementClientProps) {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [selectedQr, setSelectedQr] = useState<{ tableId: number, waiter?: Waiter } | null>(null);

  const handleAssignWaiter = (tableId: number, waiterId: string) => {
    setTables(currentTables =>
      currentTables.map(table =>
        table.id === tableId ? { ...table, waiterId } : table
      )
    );
  };
  
  const getQrUrl = (tableId: number) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/?table=${tableId}`;
    }
    return `/?table=${tableId}`;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tables.map(table => {
          const waiter = waiters.find(w => w.id === table.waiterId);
          return (
            <Card key={table.id}>
              <CardHeader>
                <CardTitle className="font-headline">Table {table.id}</CardTitle>
                <CardDescription>Assign a waiter and manage settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="font-semibold text-sm">Assigned Waiter</p>
                  <Select
                    value={table.waiterId}
                    onValueChange={(waiterId) => handleAssignWaiter(table.id, waiterId)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a waiter...">
                        <div className="flex items-center gap-2">
                          {waiter ? (
                            <>
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={waiter.avatarUrl} alt={waiter.name} />
                                <AvatarFallback>{waiter.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{waiter.name}</span>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>No waiter assigned</span>
                            </div>
                          )}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {waiters.map(w => (
                        <SelectItem key={w.id} value={w.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={w.avatarUrl} alt={w.name} />
                              <AvatarFallback>{w.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{w.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setSelectedQr({ tableId: table.id, waiter })}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Show QR Code
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {selectedQr && (
          <QrCodeDialog
            tableId={selectedQr.tableId}
            waiterName={selectedQr.waiter?.name}
            qrUrl={getQrUrl(selectedQr.tableId)}
            onOpenChange={(isOpen) => !isOpen && setSelectedQr(null)}
          />
      )}
    </>
  );
}
