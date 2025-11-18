'use client';

import { useState } from 'react';
import { TableCard } from './table-card';
import { TABLES, WAITERS } from '@/lib/data';
import type { Table, Waiter } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TablesClientPage() {
  const [tables, setTables] = useState<Table[]>(TABLES);
  const [waiters] = useState<Waiter[]>(WAITERS);
  const [filterWaiter, setFilterWaiter] = useState<string>('all');

  const handleAssignWaiter = (tableId: number, waiterId: string) => {
    setTables(prevTables =>
      prevTables.map(t => (t.id === tableId ? { ...t, waiterId } : t))
    );
  };

  const filteredTables = tables.filter(table =>
    filterWaiter === 'all' ? true : table.waiterId === filterWaiter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={filterWaiter} onValueChange={setFilterWaiter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by waiter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Waiters</SelectItem>
            {waiters.map(waiter => (
              <SelectItem key={waiter.id} value={waiter.id}>
                {waiter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTables.map(table => (
          <TableCard
            key={table.id}
            table={table}
            waiters={waiters}
            onAssignWaiter={handleAssignWaiter}
          />
        ))}
      </div>
    </div>
  );
}
