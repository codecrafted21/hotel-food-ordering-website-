import { TABLES, WAITERS } from '@/lib/data';
import { TableManagementClient } from '@/components/admin/table-management-client';

export default function TablesPage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-6">Table Management</h1>
      <TableManagementClient tables={TABLES} waiters={WAITERS} />
    </div>
  );
}
