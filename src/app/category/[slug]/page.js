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
  const canonicalUrl = `https://indivoltappliances.com/category/${slug}/`;
  const isFanCategory = slug.includes("fan") || catName.toLowerCase().includes("fan");
  const isKitchenCategory = slug.includes("plate") || slug.includes("mixer") || slug.includes("kettle") || catName.toLowerCase().includes("plate") || catName.toLowerCase().includes("mixer");

  const keywords = isFanCategory
    ? [
        "bldc fan",
        "bldc ceiling fan",
        "wall fan",
        "wallfan",
        "high speed wall fan",
        "oscillating wall fan",
        "wall mounted fan",
        "table fan",
        "pedestal fan",
        "zigma fan",
        "zigma tiktik",
        "zigma zenith",
        "zigma bldc fan",
        "5 star bldc fan",
        "silent bldc fan",
        "energy saving fan",
        "fans india",
        "buy fan online",
      ]
    : isKitchenCategory
    ? [
        "airfryer",
        "air fryer",
        "digital air fryer",
        "zigma air fryer",
        "hot plate",
        "infrared cooker",
        "mixer grinder",
        "electric kettle",
        "zigma kitchen appliances",
        "healthy oil free fryer",
        "best air fryer in india",
      ]
    : [
        `zigma ${catName.toLowerCase()}`,
        `${catName.toLowerCase()} price in india`,
        `buy ${catName.toLowerCase()} online`,
        "zigma appliances",
        "zigma products",
        "indivolt appliances",
      ];

  const catDesc = isFanCategory
    ? `Explore official Zigma fans on Indivolt: 5-star energy saving BLDC ceiling fans, heavy-duty high-speed wall fans, portable table fans, and pedestal fans with 1-year brand warranty & free delivery.`
    : isKitchenCategory
    ? `Shop official Zigma kitchen appliances: digital air fryers, smart infrared hot plates, powerful mixer grinders, and fast-boiling electric kettles with 100% manufacturer warranty.`
    : `Browse the finest range of genuine Zigma ${catName.toLowerCase()} on Indivolt. Engineered for maximum efficiency, safety, and long-lasting durability with free delivery across India.`;

  return {
    title: `Zigma ${catName} - Buy Online at Best Price in India | Indivolt`,
    description: catDesc,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Zigma ${catName} | Indivolt Appliances Official Store`,
      description: catDesc,
      url: canonicalUrl,
      siteName: "Indivolt Appliances",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: category.imageUrl || category.image || "/catogeries/fan.png",
          alt: `Zigma ${catName} Collection`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Zigma ${catName} | Indivolt`,
      description: catDesc,
      images: [category.imageUrl || category.image || "/catogeries/fan.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
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
    slug: (category.slug || category.name || category.label || "").toLowerCase().trim().replace(/[\s_]+/g, "-"),
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

  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Zigma ${mappedCategory?.label || "Appliances"} Collection`,
    "description": `Browse genuine Zigma ${mappedCategory?.label || "appliances"} online on Indivolt Appliances.`,
    "url": `https://indivoltappliances.com/category/${slug}/`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": mappedProducts.length,
      "itemListElement": mappedProducts.map((p, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": p.name,
        "url": `https://indivoltappliances.com/product/${p.id}/`,
        "image": p.image,
      }))
    }
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://indivoltappliances.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": mappedCategory?.label || "Category",
        "item": `https://indivoltappliances.com/category/${slug}/`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <CategoryDetailClient 
        category={mappedCategory} 
        filteredProducts={mappedProducts} 
      />
    </>
  );
}
