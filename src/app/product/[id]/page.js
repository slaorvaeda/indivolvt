import { getProductById, getProducts, getCategories } from "@/utils/api";
import { products as fallbackProducts, categories as fallbackCategories } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const dbProducts = await getProducts();
  const allProducts = dbProducts && dbProducts.length > 0 ? dbProducts : fallbackProducts;
  
  // Combine all IDs to ensure full static generation coverage
  const ids = new Set([
    ...fallbackProducts.map((p) => String(p.id)),
    ...(dbProducts || []).map((p) => String(p.id)),
  ]);

  return Array.from(ids).map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  let product = await getProductById(productId);
  if (!product) {
    product = fallbackProducts.find((p) => String(p.id) === String(productId));
  }

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
          url: product.imageUrl || product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  let product = await getProductById(productId);
  if (!product) {
    product = fallbackProducts.find((p) => String(p.id) === String(productId));
  }

  if (!product) {
    notFound();
  }

  let categories = await getCategories();
  if (!categories || categories.length === 0) {
    categories = fallbackCategories.map((c) => ({
      id: c.id,
      name: c.label,
      imageUrl: c.image,
    }));
  }

  const mappedProduct = product
    ? {
        id: String(product.id),
        category: (product.category || "").toLowerCase(),
        name: product.name,
        price: product.price,
        originalPrice: product.mrp || product.originalPrice,
        badge: product.metadata?.badge || product.badge || null,
        image: product.imageUrl || product.image,
        rating: product.metadata?.rating || product.rating || 5.0,
        description: product.description,
        specs: Array.isArray(product.metadata?.specs)
          ? product.metadata.specs
          : Array.isArray(product.specs)
          ? product.specs
          : [],
        images: Array.isArray(product.metadata?.images)
          ? product.metadata.images
          : Array.isArray(product.images)
          ? product.images
          : [],
      }
    : null;

  const category = categories.find(
    (cat) => (cat.name || "").toLowerCase() === (product?.category || "").toLowerCase()
  );
  const mappedCategory = category
    ? {
        id: category.id,
        label: category.name || category.label,
        slug: (category.name || category.slug || "").toLowerCase(),
        image: category.imageUrl || category.image,
      }
    : null;

  return (
    <ProductDetailClient
      product={mappedProduct}
      category={mappedCategory}
    />
  );
}
