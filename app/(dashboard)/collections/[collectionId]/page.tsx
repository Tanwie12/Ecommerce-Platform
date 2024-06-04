'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function CollectionDetails() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
 

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
   
      try {
        const res = await fetch(`/api/collections/${collectionId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch collection');
        }
        const data: CollectionType = await res.json();
        setCollection(data);
      } catch (err) {
        console.log(err)
        
      } finally {
        setLoading(false);
      }
    };

    if (collectionId) {
      fetchCollection();
    }
  }, [collectionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div>
      <h1>{collection.title}</h1>
      <p>{collection.description}</p>
      <Image width={500} height={500} src={collection.image} alt={collection.title} />
      <div>
        <h2>Products</h2>
        <ul>
          {collection.products.map(product => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CollectionDetails;
