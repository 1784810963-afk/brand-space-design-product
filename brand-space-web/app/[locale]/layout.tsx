import { Locale, i18n, getDictionary } from '@/lib/i18n';
import Navbar from '@/components/Navbar';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Navbar locale={locale as Locale} dict={{ ...dict.nav, search: dict.search }} />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
