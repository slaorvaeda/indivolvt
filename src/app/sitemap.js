import { getProducts, getCategories } from "@/utils/api";
import { products as fallbackProducts, categories as fallbackCategories } from "@/data/products";

export const dynamic = 'force-static';

export default async function sitemap() {
  const baseUrl = "https://indivoltappliances.com";
  const now = new Date().toISOString();

  let categories = await getCategories();
  if (!categories || categories.length === 0) {
    categories = fallbackCategories.map((c) => ({
      id: c.id,
      name: c.label,
      slug: c.slug,
    }));
  }

  let dbProducts = await getProducts();
  const allProducts = [
    ...(Array.isArray(dbProducts) ? dbProducts : []),
    ...fallbackProducts,
  ];

  // Base routes
  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Category routes (deduplicated by slug)
  const categorySlugs = new Set();
  const categoryRoutes = [];
  categories.forEach((category) => {
    const slug = (category.slug || category.name || category.label || "")
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-");
    if (slug && !categorySlugs.has(slug)) {
      categorySlugs.add(slug);
      categoryRoutes.push({
        url: `${baseUrl}/category/${slug}/`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.9,
      });
    }
  });

  // Product routes (deduplicated by id)
  const productIds = new Set();
  const productRoutes = [];
  allProducts.forEach((product) => {
    const id = String(product.id);
    if (id && !productIds.has(id)) {
      productIds.add(id);
      productRoutes.push({
        url: `${baseUrl}/product/${id}/`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  });

  return [...routes, ...categoryRoutes, ...productRoutes];
}
