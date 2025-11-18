'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type CategoryCarouselProps = {
  categories: Category[];
  currentCategory: string;
};

export function CategoryCarousel({ categories, currentCategory }: CategoryCarouselProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 pb-4">
          {categories.map((category) => (
            <Link key={category.id} href={`${pathname}?category=${category.id}#menu`} scroll={false}>
              <Button
                variant={currentCategory === category.id ? 'default' : 'secondary'}
                className={cn(
                  'rounded-full px-6 py-2 transition-all duration-300',
                  currentCategory === category.id ? 'font-bold' : 'text-muted-foreground'
                )}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
