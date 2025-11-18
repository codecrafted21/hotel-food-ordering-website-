'use client';

import { useState } from 'react';
import type { Table, Waiter } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QrCode, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { QrCodeDialog } from './qr-code-dialog';

type TableCardProps = {
  table: Table;
  waiters: Waiter[];
  onAssignWaiter: (tableId: number, waiterId: string) => void;
};

export function TableCard({
  table,
  waiters,
  onAssignWaiter,
}: TableCardProps) {
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const assignedWaiter = waiters.find(w => w.id === table.waiterId);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const qrUrl = `${origin}/?table=${table.id}`;

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Table {table.id}</CardTitle>
          <CardDescription>Assign a waiter and manage this table.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Assigned Waiter</p>
          </div>
          <Select
            value={table.waiterId}
            onValueChange={waiterId => onAssignWaiter(table.id, waiterId)}
          >
            <SelectTrigger className="w-full">
              <SelectValue asChild>
                <div className="flex items-center gap-2">
                  {assignedWaiter && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={assignedWaiter.avatarUrl} alt={assignedWaiter.name} />
                      <AvatarFallback>{assignedWaiter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <span>{assignedWaiter?.name || 'Unassigned'}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {waiters.map(waiter => (
                <SelectItem key={waiter.id} value={waiter.id}>
                   <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={waiter.avatarUrl} alt={waiter.name} />
                        <AvatarFallback>{waiter.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{waiter.name}</span>
                    </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsQrDialogOpen(true)}
          >
            <QrCode className="mr-2 h-4 w-4" />
            Show QR Code
          </Button>
        </CardFooter>
      </Card>
      <QrCodeDialog
        isOpen={isQrDialogOpen}
        onOpenChange={setIsQrDialogOpen}
        tableNumber={table.id}
        qrUrl={qrUrl}
      />
    </>
  );
}
