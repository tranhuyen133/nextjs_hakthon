import { NextResponse } from "next/server";
import { products } from "@/app/api/database/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(products);
  }

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(name.toLowerCase())
  );

  return NextResponse.json(filteredProducts);
}
