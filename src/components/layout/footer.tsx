import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { Icon: Twitter, href: '#', name: 'Twitter' },
    { Icon: Github, href: '#', name: 'GitHub' },
    { Icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Order from your table, effortlessly.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href, name }) => (
              <Link key={name} href={href} aria-label={`Follow us on ${name}`}>
                <Icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TableBites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
