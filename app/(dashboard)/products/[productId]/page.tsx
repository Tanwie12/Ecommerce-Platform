'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setproduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
 

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
   
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: ProductType = await res.json();
        setproduct(data);
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

  if (!product) {
    return <div>product not found</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <Image width={500} height={500} src={product.media[0]} alt={product.title} />
      <div>
        <h2>Products</h2>
        <ul>
          {product.collections.map(collection => (
            <li key={collection._id}>{collection.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductDetails;
