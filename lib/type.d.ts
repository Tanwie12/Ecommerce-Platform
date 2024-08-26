type CollectionType = {
    _id: string | number;
    title: string;
    description?: string;
    image: string;
    status:string
    products: ProductType[];
    
}
type ProductType = {
    _id: string | number;
    title: string;
    description?: string;
    media: [string];
    price: number;
    cost:number;
    colors:[string];
    sizes:[string];
    tags:[string];
    collections:[CollectionType];
    status:string
    category:string;
    createdAt:Date;
    updatedAt:Date;
}
type OrderColumnType = {
    _id: string;
    customer: string;
    products: number;
    totalAmount: number;
    createdAt: string;
  }
  
  type OrderItemType = {
    product: ProductType
    color: string;
    size: string;
    quantity: number;
  }
  
  type CustomerType = {
    clerkId: string;
    name: string;
    email: string;
  }