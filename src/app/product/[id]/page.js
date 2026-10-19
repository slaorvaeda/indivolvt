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
      title: "Product Not Found | Indivolt Appliances",
      robots: { index: false },
    };
  }

  const productName = product.name;
  const productDesc = product.description && product.description.length > 20
    ? product.description
    : `Buy genuine ${productName} by Zigma Appliances online at the best price in India on Indivolt. High efficiency, 1-year brand warranty, express pan-India shipping.`;
  const productImg = product.imageUrl || product.image || "/catogeries/fan.png";
  const canonicalUrl = `https://indivoltappliances.com/product/${productId}/`;

  return {
    title: `${productName} | Zigma Appliances - Indivolt Official Store`,
    description: productDesc,
    keywords: [
      productName,
      `buy ${productName}`,
      `zigma ${productName}`,
      "zigma",
      "zigma appliances",
      "zigma products",
      "zigma fan",
      "bldc fan",
      "bldc ceiling fan",
      "wall fan",
      "wallfan",
      "high speed wall fan",
      "airfryer",
      "air fryer",
      "digital air fryer",
      "indivolt",
      "indivolt appliances",
      product.category || "home appliances",
      "best price online india",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${productName} | Zigma Appliances Official Store`,
      description: productDesc,
      url: canonicalUrl,
      siteName: "Indivolt Appliances",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: productImg,
          alt: productName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${productName} | Zigma Appliances`,
      description: productDesc,
      images: [productImg],
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
        hasVariants: Boolean(product.hasVariants),
        variants: Array.isArray(product.variants) && product.variants.length > 0
          ? product.variants
          : Array.isArray(product.options) && product.options.length > 0
          ? product.options
          : Array.isArray(product.metadata?.variants) && product.metadata.variants.length > 0
          ? product.metadata.variants
          : [],
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

  const prodCatNorm = (product?.category || "").toLowerCase().replace(/[-_ ]+/g, '');
  const category = categories.find((cat) => {
    const catNameNorm = (cat.name || "").toLowerCase().replace(/[-_ ]+/g, '');
    const catSlugNorm = (cat.slug || "").toLowerCase().replace(/[-_ ]+/g, '');
    const catIdNorm = (cat.id || "").toLowerCase().replace(/^(cat-)/, '').replace(/[-_ ]+/g, '');
    return catNameNorm === prodCatNorm || catSlugNorm === prodCatNorm || catIdNorm === prodCatNorm;
  });

  const catSlug = (category?.slug || category?.name || category?.label || product?.category || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');

  const mappedCategory = category
    ? {
        id: category.id,
        label: category.name || category.label || product?.category,
        slug: catSlug,
        image: category.imageUrl || category.image,
      }
    : (product?.category ? {
        id: product.category,
        label: product.category,
        slug: catSlug,
        image: "/catogeries/fan.png",
      } : null);

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": mappedProduct.name,
    "image": mappedProduct.images && mappedProduct.images.length > 0 ? mappedProduct.images : [mappedProduct.image],
    "description": mappedProduct.description || `Official Zigma ${mappedProduct.name} available at Indivolt Appliances.`,
    "sku": `ZIGMA-${productId}`,
    "mpn": `ZIGMA-${productId}`,
    "brand": {
      "@type": "Brand",
      "name": "Zigma"
    },
    "category": mappedCategory?.label || "Home Appliances",
    "offers": {
      "@type": "Offer",
      "url": `https://indivoltappliances.com/product/${productId}/`,
      "priceCurrency": "INR",
      "price": mappedProduct.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Indivolt Appliances"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(mappedProduct.rating || "4.9"),
      "reviewCount": "214",
      "bestRating": "5",
      "worstRating": "1"
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
      ...(mappedCategory ? [{
        "@type": "ListItem",
        "position": 2,
        "name": mappedCategory.label,
        "item": `https://indivoltappliances.com/category/${mappedCategory.slug}/`
      }] : []),
      {
        "@type": "ListItem",
        "position": mappedCategory ? 3 : 2,
        "name": mappedProduct.name,
        "item": `https://indivoltappliances.com/product/${productId}/`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ProductDetailClient
        product={mappedProduct}
        category={mappedCategory}
      />
    </>
  );
}
