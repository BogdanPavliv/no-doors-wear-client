'use client'
import { useParams, notFound } from 'next/navigation'
import ComparisonList from '@/components/modules/Comparison/ComparisonList'
import { productTypes } from '@/constants/product'
import { useComparisonItems } from '@/hooks/useComparisonItems'

export default function ComparisonType() {
  const params = useParams()
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type

  if (!typeParam || !productTypes.includes(typeParam)) {
    notFound()
  }

  const { items } = useComparisonItems(typeParam)

  return <ComparisonList items={items} />
}
