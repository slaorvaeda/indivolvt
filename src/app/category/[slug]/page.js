import { getCategories, getProducts } from "@/utils/api";
import { categories as fallbackCategories, products as fallbackProducts } from "@/data/products";
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
    const catName = (cat.name || cat.label || "").toLowerCase();
    const catNameNormalized = catName.replace(/ /g, '-');
    const catId = (cat.id || "").toLowerCase();
    
    const catNameLowerStripped = stripS(catName);
    const catNameNormalizedStripped = stripS(catNameNormalized);
    const catIdLowerStripped = stripS(catId);

    return catName === decoded || 
           catNameNormalized === normalized || 
           catId === ('cat-' + normalized) ||
           catId === decoded ||
           catId === ('cat-' + decoded) ||
           catNameLowerStripped === decodedStripped ||
           catNameNormalizedStripped === normalizedStripped ||
           catIdLowerStripped === ('cat-' + normalizedStripped) ||
           catIdLowerStripped === ('cat-' + decodedStripped);
  }) || null;
}

export async function generateStaticParams() {
  const dbCategories = await getCategories();
  const allCategories = dbCategories && dbCategories.length > 0 ? dbCategories : fallbackCategories;
  
  const slugs = new Set([
    ...fallbackCategories.map((c) => c.slug || c.label.toLowerCase().replace(/ /g, '-')),
    ...(dbCategories || []).map((c) => (c.name || "").toLowerCase().replace(/ /g, '-')),
  ]);

  return Array.from(slugs)
    .filter(Boolean)
    .map((slug) => ({
      slug,
    }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  let categories = await getCategories();
  if (!categories || categories.length === 0) {
    categories = fallbackCategories.map((c) => ({
      id: c.id,
      name: c.label,
      imageUrl: c.image,
    }));
  }
  
  let category = findCategoryBySlug(categories, slug);
  if (!category) {
    category = findCategoryBySlug(fallbackCategories.map(c => ({ id: c.id, name: c.label, imageUrl: c.image })), slug);
  }

  if (!category) {
    return {
      title: "Category Not Found | Indivolt",
    };
  }

  const catName = category.name || category.label || "Appliances";

  return {
    title: `${catName} Collection | Indivolt Premium Appliances`,
    description: `Browse the finest range of Indivolt ${catName.toLowerCase()}. Engineered for efficiency, performance, and long-lasting durability.`,
    openGraph: {
      title: `${catName} Collection | Indivolt`,
      description: `Browse the finest range of Indivolt ${catName.toLowerCase()}.`,
      images: [
        {
          url: category.imageUrl || category.image,
          alt: catName,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let categories = await getCategories();
  if (!categories || categories.length === 0) {
    categories = fallbackCategories.map((c) => ({
      id: c.id,
      name: c.label,
      imageUrl: c.image,
    }));
  }
  
  let category = findCategoryBySlug(categories, slug);
  if (!category) {
    category = findCategoryBySlug(fallbackCategories.map(c => ({ id: c.id, name: c.label, imageUrl: c.image })), slug);
  }
  
  if (!category) {
    notFound();
  }
  
  const catName = category.name || category.label;
  let filteredProducts = await getProducts({ category: catName });
  if (!filteredProducts || filteredProducts.length === 0) {
    filteredProducts = fallbackProducts.filter(
      (p) => p.category.toLowerCase() === (category.id || catName || "").toLowerCase()
    );
  }

  // Map category data to format expected by CategoryDetailClient (id, label, image)
  const mappedCategory = category ? {
    id: category.id,
    label: category.name || category.label,
    slug: (category.name || category.slug || category.label || "").toLowerCase(),
    image: category.imageUrl || category.image
  } : null;

  // Map products data to format expected by CategoryDetailClient (with specs and badges)
  const mappedProducts = filteredProducts.map(prod => ({
    id: String(prod.id),
    category: (prod.category || "").toLowerCase(),
    name: prod.name,
    price: prod.price,
    originalPrice: prod.mrp || prod.originalPrice,
    badge: prod.metadata?.badge || prod.badge || null,
    image: prod.imageUrl || prod.image,
    rating: prod.metadata?.rating || prod.rating || 5.0,
    description: prod.description,
    specs: Array.isArray(prod.metadata?.specs) ? prod.metadata.specs : (Array.isArray(prod.specs) ? prod.specs : [])
  }));

  return (
    <CategoryDetailClient 
      category={mappedCategory} 
      filteredProducts={mappedProducts} 
    />
  );
}
