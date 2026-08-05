import type { SocialPlatformKey } from "@/lib/data";

interface IconProps {
  className?: string;
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

export function ThreadsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.19 10.87c-.09-.04-.18-.08-.27-.12-.15-2.83-1.7-4.46-4.31-4.47h-.03c-1.56 0-2.86.66-3.66 1.87l1.44.99c.6-.9 1.53-1.09 2.22-1.09h.02c.86.01 1.51.26 1.93.75.31.36.51.85.62 1.48-.79-.13-1.65-.18-2.55-.13-2.55.15-4.19 1.62-4.08 3.68.06 1.04.58 1.94 1.46 2.53.75.51 1.72.75 2.74.7 1.34-.07 2.4-.58 3.13-1.53.56-.72.91-1.65 1.07-2.83.63.38 1.1.88 1.36 1.48.44 1.02.47 2.69-.9 4.06-1.19 1.19-2.63 1.71-4.79 1.72-2.4-.02-4.22-.78-5.4-2.28C7.09 16.29 6.5 14.36 6.48 12s.61-4.29 1.72-5.68c1.18-1.5 3-2.27 5.4-2.28 2.42.02 4.26.79 5.49 2.28.6.73 1.06 1.65 1.36 2.72l1.72-.46c-.36-1.31-.94-2.44-1.73-3.36C18.87 3.36 16.62 2.41 13.6 2.4c-3.02.01-5.22.96-6.7 2.83C5.51 6.86 4.75 9.24 4.72 12s.79 5.14 2.19 6.77c1.48 1.87 3.68 2.82 6.7 2.83 2.64-.02 4.51-.65 6.06-2.2 2.03-2.02 1.97-4.55 1.3-6.11-.48-1.09-1.4-2.02-2.59-2.42zm-4.44 4.28c-1.14.06-2.32-.45-2.38-1.55-.04-.81.58-1.72 2.44-1.83.21-.01.42-.02.62-.02.63 0 1.22.06 1.75.18-.2 2.5-1.37 3.14-2.43 3.22z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SnackVideoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </svg>
  );
}

export const platformConfig: Record<
  SocialPlatformKey,
  { label: string; icon: React.ComponentType<IconProps> }
> = {
  instagram:  { label: "Instagram",   icon: InstagramIcon },
  facebook:   { label: "Facebook",    icon: FacebookIcon },
  youtube:    { label: "YouTube",     icon: YouTubeIcon },
  tiktok:     { label: "TikTok",      icon: TikTokIcon },
  threads:    { label: "Threads",     icon: ThreadsIcon },
  x:          { label: "X (Twitter)", icon: XIcon },
  snackvideo: { label: "Snack Video", icon: SnackVideoIcon },
};
