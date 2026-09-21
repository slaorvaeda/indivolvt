import { getCategories, getProducts } from "@/utils/api";
import CategoryDetailClient from "@/components/CategoryDetailClient";
import { notFound } from "next/navigation";

function findCategoryBySlug(categories, slug) {
  if (!slug) return null;
  const decoded = decodeURIComponent(slug).toLowerCase();
  const normalized = decoded.replace(/ /g, '-');
  
  const stripS = (str) => str.endsWith('s') ? str.slice(0, -1) : str;
  const normalizedStripped = stripS(normalized);
  const decodedStripped = stripS(decoded);

  return categories.find((cat) => {
    const catNameLower = cat.name.toLowerCase();
    const catNameNormalized = catNameLower.replace(/ /g, '-');
    const catIdLower = cat.id.toLowerCase();
    
    const catNameLowerStripped = stripS(catNameLower);
    const catNameNormalizedStripped = stripS(catNameNormalized);
    const catIdLowerStripped = stripS(catIdLower);

    return catNameLower === decoded || 
           catNameNormalized === normalized || 
           catIdLower === ('cat-' + normalized) ||
           catIdLower === decoded ||
           catIdLower === ('cat-' + decoded) ||
           catNameLowerStripped === decodedStripped ||
           catNameNormalizedStripped === normalizedStripped ||
           catIdLowerStripped === ('cat-' + normalizedStripped) ||
           catIdLowerStripped === ('cat-' + decodedStripped);
  }) || null;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.name.toLowerCase().replace(/ /g, '-'),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const categories = await getCategories();
  const category = findCategoryBySlug(categories, slug);

  if (!category) {
    return {
      title: "Category Not Found | Indivolt",
    };
  }

  return {
    title: `${category.name} Collection | Indivolt Premium Appliances`,
    description: `Browse the finest range of Indivolt ${category.name.toLowerCase()}. Engineered for efficiency, performance, and long-lasting durability.`,
    openGraph: {
      title: `${category.name} Collection | Indivolt`,
      description: `Browse the finest range of Indivolt ${category.name.toLowerCase()}.`,
      images: [
        {
          url: category.imageUrl,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const categories = await getCategories();
  const category = findCategoryBySlug(categories, slug);
  
  if (!category) {
    notFound();
  }
  
  const filteredProducts = await getProducts({ category: category.name });

  // Map category data to format expected by CategoryDetailClient (id, label, image)
  const mappedCategory = category ? {
    id: category.id,
    label: category.name,
    slug: category.name.toLowerCase(),
    image: category.imageUrl
  } : null;

  // Map products data to format expected by CategoryDetailClient (with specs and badges)
  const mappedProducts = filteredProducts.map(prod => ({
    id: String(prod.id),
    category: prod.category.toLowerCase(),
    name: prod.name,
    price: prod.price,
    originalPrice: prod.mrp,
    badge: prod.metadata?.badge || null,
    image: prod.imageUrl,
    rating: prod.metadata?.rating || 5.0,
    description: prod.description,
    specs: prod.metadata?.specs || []
  }));

  return (
    <CategoryDetailClient 
      category={mappedCategory} 
      filteredProducts={mappedProducts} 
    />
  );
}
