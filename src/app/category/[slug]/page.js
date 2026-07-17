import { products, categories } from "@/data/products";
import CategoryDetailClient from "@/components/CategoryDetailClient";

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | Indivolt",
    };
  }

  return {
    title: `${category.label} Collection | Indivolt Premium Appliances`,
    description: `Browse the finest range of Indivolt ${category.label.toLowerCase()}. Engineered for efficiency, performance, and long-lasting durability.`,
    openGraph: {
      title: `${category.label} Collection | Indivolt`,
      description: `Browse the finest range of Indivolt ${category.label.toLowerCase()}.`,
      images: [
        {
          url: category.image,
          alt: category.label,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Find current category
  const category = categories.find((cat) => cat.slug === slug);
  
  // Filter products matching this category
  const filteredProducts = products.filter((prod) => prod.category === category?.id);

  return (
    <CategoryDetailClient 
      category={category} 
      filteredProducts={filteredProducts} 
    />
  );
}
