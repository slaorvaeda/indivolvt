import { getProductById, getProducts, getCategories } from "@/utils/api";
import { products as fallbackProducts, categories as fallbackCategories } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const dbProducts = await getProducts();
  if (dbProducts && dbProducts.length > 0) {
    return dbProducts.map((p) => ({
      id: String(p.id),
    }));
  }
  return fallbackProducts.map((p) => ({
    id: String(p.id),
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
        images: [
          ...(product.imageUrl ? [product.imageUrl] : []),
          ...(Array.isArray(product.metadata?.images)
            ? product.metadata.images
            : Array.isArray(product.images)
            ? product.images
            : [])
        ].filter((img, idx, arr) => img && arr.indexOf(img) === idx),
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
