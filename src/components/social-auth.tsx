// app/[locale]/(public)/auth/_components/SocialAuth.tsx
'use client';

import CustomButton from '@/components/custom-button';
import DiscrodIcon from '@/components/icons/discord-icon';
import GoogleIcon from '@/components/icons/google-icon';
import { CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { buildSocialUrl } from '@/lib/auth-client';
import { usePathname, useSearchParams } from 'next/navigation';

export default function SocialAuth() {
  const t = useTranslations('socialAuth');
  const [loading, setLoading] = useState<'google' | 'discord' | null>(null);
  const pathname = usePathname();
  const sp = useSearchParams();

  // Detecta locale desde el pathname: /es/..., /en/...
  const locale = useMemo(() => {
    const m = pathname?.match(/^\/([a-zA-Z]{2})(\/|$)/);
    return m ? m[1] : 'es';
  }, [pathname]);

  // Si llegaste con ?redirect=..., úsalo; sino, ir a /{locale}/dashboard
  const redirectTo = sp.get('redirect') || `/${locale}/dashboard`;

  const handleSocialLogin = (provider: 'google' | 'discord') => {
    setLoading(provider);
    const url = buildSocialUrl(provider, { redirect: redirectTo, locale });
    window.location.href = url;
  };

  return (
    <CardFooter className="flex-col w-full gap-4">
      <Separator />
      <p className="text-sm text-muted-foreground">{t('orContinueWith')}</p>
      <div className="flex gap-2 items-center w-full justify-center">
        <CustomButton
          variant="outline"
          size="icon"
          label=""
          isLoading={loading === 'discord'}
          aria-label="Discord login"
          onClick={() => handleSocialLogin('discord')}
        >
          <DiscrodIcon />
        </CustomButton>
        <CustomButton
          variant="outline"
          size="icon"
          isLoading={loading === 'google'}
          aria-label="Google login"
          onClick={() => handleSocialLogin('google')}
        >
          <GoogleIcon />
        </CustomButton>
      </div>
    </CardFooter>
  );
}
