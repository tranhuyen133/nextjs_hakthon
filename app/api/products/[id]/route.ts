import { NextResponse } from "next/server";
import { products } from "@/app/api/database/products";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
//Put
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productIndex = products.findIndex((p) => p.id === Number(params.id));
  if (productIndex === -1)
    return NextResponse.json({ message: "Product not found" }, { status: 404 });

  const { productName, price, image, quantity } = await request.json();

  if (!productName || !price || !image || !quantity) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  products[productIndex] = {
    id: products[productIndex].id,
    productName,
    price,
    image,
    quantity,
  };

  return NextResponse.json(products[productIndex]);
}
//DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productIndex = products.findIndex((p) => p.id === Number(params.id));

  if (productIndex === -1) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  products.splice(productIndex, 1);
  return NextResponse.json({ message: "Product deleted successfully" });
}
