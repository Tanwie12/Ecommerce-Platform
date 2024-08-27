'use client'
import React from 'react';

const SubmitProducts = () => {
  const products = [
    {
      title: "bangles",
      description: "A beautiful African bangle, perfect for any occasion.",
      media: [
        "https://www.themaasaishop.com/cdn/shop/products/africanbeaded.jpg?v=1617372588",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.takealot.com%2Fafrican-traditional-bangles-3-piece%2FPLID93889045&psig=AOvVaw3EBg1qxyvy-cfA1VxwkunM&ust=1724855216303000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCJrMWwlYgDFQAAAAAdAAAAABAE",
      ],
      category: "Clothing",
      collections: ["66cce52f10f0bc760dc6e7b1"],
      tags: ["african", "dress", "maxi", "fashion"],
      price: 49.99,
      cost: 25.00,
      colors: ["Red", "Blue", "Yellow"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      title: "Handmade Beaded Necklace",
      description: "A stunning handmade necklace with colorful beads.",
      media: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgOHhdb680CaI2lBpBzUBFpmYkkGs8PvdLew&s",
        "https://www.laviye.com/cdn/shop/products/L17Sep-477_500x.jpg?v=1665763106"
      ],
      category: "Jewelry",
      collections: ["64a7b9c2f3e21c1a5d6789ac"],
      tags: ["handmade", "necklace", "beads", "accessories"],
      price: 19.99,
      cost: 8.50,
      colors: ["Multicolor"],
      sizes: ["One Size"],
    },
    {
      title: "drum",
      description: "Comfortable and stylish drum.",
      media: [
        "https://th.bing.com/th/id/R.7363e965ef38de4f8b85029a91d8557d?rik=pgzmmvtlAaYSww&pid=ImgRaw&r=0",
      ],
      category: "Footwear",
      collections: ["64a7b9c2f3e21c1a5d6789ad"],
      tags: ["black", "drum", "footwear"],
      price: 34.99,
      cost: 15.00,
      colors: ["Brown", "Black"],
      sizes: ["7", "8", "9", "10", "11"],
    },
  ];

  const submitProducts = async () => {
    try {
      for (const product of products) {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Product added:', result);
        } else {
          console.error('Failed to add product:', await response.text());
        }
      }
      alert('All products submitted successfully!');
    } catch (error) {
      console.error('Error submitting products:', error);
      alert('An error occurred while submitting the products.');
    }
  };

  return (
    <div>
      <button onClick={submitProducts}>Submit Products</button>
    </div>
  );
};

export default SubmitProducts;
