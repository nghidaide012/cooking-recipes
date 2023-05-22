export class Categories
{
    id?: number;
    name?: string;
}


export class Recipes {
    id?: number;
    name?: string;
    image?: string;
    description?: string;
    ingredients?: string[];
    methods?: string[];
    categoryId?: number;
}
