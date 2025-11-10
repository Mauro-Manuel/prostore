'use server'
import { LATEST_PRODUCTS_LIMIT } from "../constants";
//import { PrismaClient } from '@prisma/client';
import { convertToPlainObject } from "../utils"
import { prisma } from "@/db/prisma";

// Get latest products
export async function getLatestProducts() {

 //const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  const normalized = data.map((p) => ({
    ...p,
    price: p.price.toString(),
    rating: p.rating?.toString() ?? "0",
  }));

  return convertToPlainObject(normalized);
}


// Get single product by it's slug
export async function getProductBySlug(slug: string) {
   //const prisma = new PrismaClient();
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}