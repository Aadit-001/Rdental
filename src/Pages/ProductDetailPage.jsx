import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetailPage() {
  const { category, id } = useParams();
  return (
    <div>ProductDetailPage: {category} {id}</div>
  )
}

export default ProductDetailPage