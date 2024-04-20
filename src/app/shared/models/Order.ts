import { CartItem } from "./CartItem";

export class Order{
    id!: string;
    item!: CartItem[];
    totalPrice!: number;
    name!: string;
    address!: string;
    paymentId!: string;
    createAt!: string;
    status!: string;
}