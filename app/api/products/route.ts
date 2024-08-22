import { NextResponse } from "next/server";
import { products, Product } from "@/app/api/database/products";

export async function GET() {
  return NextResponse.json(products);
}
//POST
export async function POST(request: Request) {
  const body = await request.json();
  const { productName, price, image, quantity } = body;

  if (!productName || !price || !image || !quantity) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const newProduct: Product = {
    id: products.length + 1,
    productName,
    price,
    image,
    quantity,
  };

  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
