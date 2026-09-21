import { getProductById, getProducts, getCategories } from "@/utils/api";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  const product = await getProductById(productId);

  if (!product) {
    return {
      title: "Product Not Found | Indivolt",
    };
  }

  return {
    title: `${product.name} | Indivolt Home Appliances`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Indivolt`,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const product = await getProductById(productId);
  if (!product) {
    notFound();
  }
  const categories = await getCategories();
  
  const mappedProduct = product ? {
    id: String(product.id),
    category: product.category.toLowerCase(),
    name: product.name,
    price: product.price,
    originalPrice: product.mrp,
    badge: product.metadata?.badge || null,
    image: product.imageUrl,
    rating: product.metadata?.rating || 5.0,
    description: product.description,
    specs: Array.isArray(product.metadata?.specs) ? product.metadata.specs : [],
    images: Array.isArray(product.metadata?.images) ? product.metadata.images : []
  } : null;

  const category = categories.find((cat) => cat.name.toLowerCase() === product?.category.toLowerCase());
  const mappedCategory = category ? {
    id: category.id,
    label: category.name,
    slug: category.name.toLowerCase(),
    image: category.imageUrl
  } : null;

  return (
    <ProductDetailClient 
      product={mappedProduct} 
      category={mappedCategory} 
    />
  );
}
