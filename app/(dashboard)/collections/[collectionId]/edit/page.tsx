'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CollectionForm from '@/components/collections/CollectionForm';

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
    <CollectionForm initialData={collection} />
  );
}

export default CollectionDetails;
