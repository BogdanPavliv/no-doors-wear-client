'use client'
import { useParams, notFound } from 'next/navigation'
import { productCategories } from '@/constants/product'
import ProductPage from '@/components/templates/ProductPage/ProductPage'

export default function Product() {
  const params = useParams()
  const categoryParam = Array.isArray(params.category) ? params.category[0] : params.category
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId

  if (!categoryParam || !productCategories.includes(categoryParam) || !productId) {
    notFound()
  }

  return <ProductPage productId={productId} category={categoryParam} />
}
