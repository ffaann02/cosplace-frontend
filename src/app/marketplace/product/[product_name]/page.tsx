import React from 'react'

const Product = async ({ params }: { params: { product_name: string } }) => {
    const { product_name } = params;
  return (
    <div>page: {product_name}</div>
  )
}

export default Product