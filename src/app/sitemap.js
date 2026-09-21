import { getProducts, getCategories } from "@/utils/api";

export const dynamic = 'force-static';

export default async function sitemap() {
  const baseUrl = "https://indivoltappliances.com";

  const categories = await getCategories();
  const products = await getProducts();

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
  ];

  // Category routes
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.name.toLowerCase()}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...productRoutes];
}
