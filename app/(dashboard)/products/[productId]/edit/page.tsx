'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductForm from '@/components/products/ProductForm';

function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const [Product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
 

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
   
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch Product');
        }
        const data: ProductType = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err)
        
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Product) {
    return <div>Product not found</div>;
  }

  return (
    <ProductForm initialData={Product} />
  );
}

export default ProductDetails;
