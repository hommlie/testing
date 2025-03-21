import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.hommlie.com/";
const BASE_API_URL = "https://www.hommlie.com/hommlieserver";

async function generateSitemap() {
  try {
    // Fetch dynamic routes (e.g., products and categories)
    const productsResponse = await axios.get(`${BASE_API_URL}/api/allproducts`);
    const categoriesResponse = await axios.get(`${BASE_API_URL}/api/category`);

    const products = productsResponse.data || [];
    const categories = categoriesResponse.data || [];

    // Static pages
    const staticPages = ["/", "/shop", "/contact", "/about"];

    // Dynamic product pages
    const productUrls = products.map(
      (product) => `/product/${product.slug}/${product.id}`
    );
    const categoryUrls = categories.map(
      (category) => `/category/${category.slug}`
    );

    // Combine all URLs
    const allUrls = [...staticPages, ...productUrls, ...categoryUrls];

    // Generate XML format
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `<url><loc>${BASE_URL}${url}</loc></url>`).join("\n")}
</urlset>`;

    // Save to `public/sitemap.xml`
    const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
    fs.writeFileSync(sitemapPath, sitemapContent, "utf8");

    console.log("✅ Sitemap generated successfully!");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

generateSitemap();
