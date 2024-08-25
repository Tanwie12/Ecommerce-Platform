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