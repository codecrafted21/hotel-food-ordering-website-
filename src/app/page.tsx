'use client';

import { Suspense, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { CATEGORIES, DISHES as STATIC_DISHES } from '@/lib/data';
import { DishCard } from '@/components/menu/dish-card';
import { CategoryCarousel } from '@/components/menu/category-carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth, useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { collection } from 'firebase/firestore';
import type { Dish } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

// Helper to create a loading skeleton UI for dish cards
const MenuLoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-10">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);


function MenuContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const [signInAttempted, setSignInAttempted] = useState(false);

  const currentCategory = searchParams.get('category') || CATEGORIES[0].id;
  const table = searchParams.get('table');

  // Real-time fetching of dishes from Firestore
  const dishesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    const restaurantId = 'tablebites-restaurant';
    return collection(firestore, `restaurants/${restaurantId}/dishes`);
  }, [firestore]);

  const { data: firestoreDishes, isLoading: isLoadingDishes } = useCollection<Dish>(dishesRef);

  // Combine Firestore data with local static data (for imageId mapping)
  // In a full production app, imageId/URL would be in Firestore too.
  const allDishes = useMemo(() => {
    const staticDishMap = new Map(STATIC_DISHES.map(d => [d.name, d]));
    
    if (!firestoreDishes) {
        // Fallback to static dishes if firestore is not ready
        return STATIC_DISHES;
    }

    const liveDishes = firestoreDishes.map(dish => {
        const staticData = staticDishMap.get(dish.name);
        return {
            ...dish,
            // Use existing imageId from static data if available, otherwise a default
            imageId: staticData?.imageId || 'dish-starter-1', 
        };
    });

    // We can merge static and live, but for now let's prioritize live data
    return liveDishes;
  }, [firestoreDishes]);
  

  useEffect(() => {
    if (table) {
      localStorage.setItem('tableNumber', table);
      router.replace(`/?category=${currentCategory}#menu`);
    } else if (!localStorage.getItem('tableNumber')) {
      console.log("No table number found in URL or local storage.");
    }
  }, [table, router, currentCategory]);

  useEffect(() => {
    if (!isUserLoading && !user && auth && !signInAttempted) {
        initiateAnonymousSignIn(auth);
        setSignInAttempted(true);
    }
  }, [auth, user, isUserLoading, signInAttempted]);


  const filteredDishes = allDishes.filter(
    (dish) => dish.categoryId === currentCategory
  );

  return (
    <div className="w-full">
      <section className="relative h-[40vh] md:h-[50vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight leading-tight">
              A Symphony of Indian Flavors
            </h1>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/90">
              Explore our curated menu and order directly from your table.
            </p>
          </div>
        </div>
      </section>

      <section id="menu" className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline text-center font-bold mb-10">
            Explore Our Menu
          </h2>
          <CategoryCarousel
            categories={CATEGORIES}
            currentCategory={currentCategory!}
          />
          {isLoadingDishes ? (
            <MenuLoadingSkeleton />
          ) : filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-10">
              {filteredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          ) : (
             <p className="text-center text-muted-foreground mt-10">No dishes found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}


export default function Home() {
  return (
    <Suspense fallback={<MenuLoadingSkeleton />}>
      <MenuContent />
    </Suspense>
  )
}
