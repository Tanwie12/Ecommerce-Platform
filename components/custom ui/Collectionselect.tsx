'use client'
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import toast from 'react-hot-toast';

interface CollectionType {
  _id: string;
  title: string;
}

interface CollectionSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  collections: CollectionType[];
  state:boolean
}

const CollectionSelect: React.FC<CollectionSelectProps> = ({
  value,
  onChange,
  collections,
  state
}) => {
  // const [collections, setCollections] = useState<CollectionType[]>(collections);
  // const [loading, setLoading] = useState(!collections?.length);
  
   const initialTitles = collections?.map(collection => collection.title) || [];

  // useEffect(() => {
  //   if (!collections?.length) {
  //     const fetchCollections = async () => {
  //       try {
  //         const res = await fetch("/api/collections");
  //         if (!res.ok) {
  //           throw new Error("Failed to fetch collections");
  //         }
  //         const data = await res.json();
  //         setCollections(data);
  //       } catch (error: any) {
  //         toast.error(error.message || "Something went wrong");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchCollections();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [collections]);

  const options: SelectProps['options'] = collections?.map(collection => ({
    label: collection.title,
    value: collection._id,
  }));

  return (
    <Select
      mode="multiple"
      allowClear
      loading={state}
      style={{ width: '100%' }}
      placeholder="Please select"
      value={value.length ? value : initialTitles}
      onChange={onChange}
      options={options}
    />
  );
};

export default CollectionSelect;
