import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us');

  return (
    <div className="w-full">
      <section className="relative h-[40vh] w-full">
        {aboutImage && (
          <Image
            src={aboutImage.imageUrl}
            alt={aboutImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={aboutImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight">
            Our Story
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert prose-lg mx-auto text-foreground/90 prose-headings:font-headline prose-headings:text-primary-foreground prose-a:text-primary hover:prose-a:text-primary/80">
            <p>
              Welcome to TableBites, where culinary passion meets modern technology. Founded in 2024, our mission is to revolutionize the dine-in experience. We believe that dining out should be a seamless and enjoyable journey from the moment you sit down to the moment you leave.
            </p>
            <p>
              Our founders, a team of food lovers and tech enthusiasts, grew tired of the traditional restaurant hustle—waiting for menus, flagging down waiters, and dealing with payment queues. They envisioned a world where ordering is as simple as a tap on your phone, giving you more time to connect with the people you're with and savor the flavors on your plate.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              "We're not just serving food; we're serving an experience. Every detail is crafted to make your meal memorable."
            </blockquote>
            <p>
              At TableBites, we combine the finest ingredients with cutting-edge technology to bring you an intuitive, elegant, and efficient ordering system. Our platform is designed for you, the modern diner, who values both quality and convenience. Thank you for being a part of our story.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
