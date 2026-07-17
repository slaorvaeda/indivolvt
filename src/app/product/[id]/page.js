import { products, categories } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  const product = products.find((p) => p.id === productId);

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
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // Find product in database
  const product = products.find((p) => p.id === productId);
  
  // Find associated category
  const category = categories.find((cat) => cat.id === product?.category);

  return (
    <ProductDetailClient 
      product={product} 
      category={category} 
    />
  );
}
