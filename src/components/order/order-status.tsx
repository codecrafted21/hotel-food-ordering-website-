'use client';

import { cn } from '@/lib/utils';
import { Check, Loader, ChefHat, GlassWater } from 'lucide-react';
import type { OrderStatus as OrderStatusType } from '@/lib/types';

interface OrderStatusProps {
  currentStatus: OrderStatusType;
  statuses: OrderStatusType[];
}

const statusIcons = {
  'Preparing': <Loader />,
  'Cooking': <ChefHat />,
  'Served': <GlassWater />,
  'Canceled': <Check />, // Placeholder
};

export function OrderStatus({ currentStatus, statuses }: OrderStatusProps) {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-secondary -translate-y-1/2">
          <div
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
          />
        </div>

        {statuses.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={status} className="z-10 flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500',
                  isCompleted ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground',
                  isActive && 'bg-primary ring-4 ring-primary/30 text-primary-foreground'
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : 
                 React.cloneElement(statusIcons[status] || <Loader />, { className: cn('h-5 w-5', isActive && 'animate-spin') })
                }
              </div>
              <p
                className={cn(
                  'mt-2 text-xs md:text-sm font-semibold transition-colors duration-500',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
