'use client'
import ProductsPage from '@/components/templates/ProductsPage/ProductsPage'
import { productCategories } from '@/constants/product'
import { useParams, notFound } from 'next/navigation'

export default function Category() {
  const params = useParams()
  const categoryParam = Array.isArray(params.category) ? params.category[0] : params.category
  
  if (!categoryParam || !productCategories.includes(categoryParam)) {
    notFound()
  }

  return <ProductsPage searchParams={params || {}} pageName={categoryParam} />
}
