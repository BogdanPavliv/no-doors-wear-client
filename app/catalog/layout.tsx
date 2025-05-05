import CatalogLayout from '../../components/layouts/CatalogLayout'

export const metadata = {
  title: 'NO DOORS | Каталог',
}

export default function ComparisonRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CatalogLayout>{children}</CatalogLayout>
}
