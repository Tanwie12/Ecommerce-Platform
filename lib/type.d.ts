type CollectionType = {
    _id: string | number;
    title: string;
    description?: string;
    image: string;
    status:string
    products: ProductType[];
    
}