import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const contactImage = PlaceHolderImages.find((img) => img.id === 'contact-us');

  return (
    <div className="w-full">
      <section className="relative h-[40vh] w-full">
        {contactImage && (
          <Image
            src={contactImage.imageUrl}
            alt={contactImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={contactImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight">
            Get in Touch
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Contact Us</CardTitle>
              <CardDescription>
                Have a question or feedback? Fill out the form below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this about?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} />
                </div>
                <Button type="submit" className="w-full" size="lg">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
