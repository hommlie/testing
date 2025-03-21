import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.hommlie.com";
const BASE_API_URL = "https://www.hommlie.com/hommlieserver";
const VITE_BASE_URL = ""; // Extract from your config if needed, otherwise use empty string

async function generateSitemap() {
  try {
    // Fetch dynamic data
    const [
      productsResponse,
      categoriesResponse,
      subcategoriesResponse,
      blogsResponse,
      seoResponse,
      servicesResponse,
    ] = await Promise.all([
      axios.get(`${BASE_API_URL}/api/allproducts`),
      axios.get(`${BASE_API_URL}/api/allcategories`),
      axios.get(`${BASE_API_URL}/api/allsubcategories`),
      axios.get(`${BASE_API_URL}/api/blogs/getall`),
      axios.get(`${BASE_API_URL}/api/seopage/getall`),
      axios.get(`${BASE_API_URL}/api/landing/getall`),
    ]);

    const products = productsResponse.data?.data || [];
    const categories = categoriesResponse.data?.data || [];
    const subcategories = subcategoriesResponse.data?.data || [];
    const blogs = blogsResponse.data?.data || [];
    const seoPages = seoResponse.data?.data || [];
    const services = servicesResponse.data?.data || [];

    // Static pages based on your routes
    const staticPages = [
      `${VITE_BASE_URL}/`,
      `${VITE_BASE_URL}/home`,
      `${VITE_BASE_URL}/services`,
      `${VITE_BASE_URL}/blogs`,
      `${VITE_BASE_URL}/about-us`,
      `${VITE_BASE_URL}/contact-us`,
      `${VITE_BASE_URL}/women-empowerment`,
      `${VITE_BASE_URL}/privacy-policy`,
      `${VITE_BASE_URL}/terms-conditions`,
      `${VITE_BASE_URL}/careers`,
      `${VITE_BASE_URL}/partner-us`,
      `${VITE_BASE_URL}/register-free-listing`,
    ];

    // Dynamic URLs
    const dynamicUrls = [
      // Category pages
      ...categories.map(
        (category) => `${VITE_BASE_URL}/${category.slug}/${category.id}`
      ),

      // Subcategory pages
      ...subcategories.map(
        (subcategory) =>
          `${VITE_BASE_URL}/subcategory/${subcategory.slug}/${subcategory.id}`
      ),

      // Product list pages
      ...subcategories.map(
        (subcategory) =>
          `${VITE_BASE_URL}/products/${subcategory.slug}/${subcategory.id}`
      ),

      // Product detail pages
      ...products.map(
        (product) => `${VITE_BASE_URL}/product/${product.id}/${product.slug}`
      ),

      // Blog pages
      ...blogs.map((blog) => `${VITE_BASE_URL}/blog/${blog.slug}`),

      // SEO pages
      ...seoPages.map((page) => `${VITE_BASE_URL}/page/${page.slug}`),

      // Landing pages
      ...services.map((service) => `${VITE_BASE_URL}/service/${service.slug}`),
    ];

    // Combine all URLs
    const allUrls = [...staticPages, ...dynamicUrls];

    // Generate XML format with last modified date and change frequency
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>`;

    // Ensure the directory exists
    const publicDir = path.join(__dirname, "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Save to `public/sitemap.xml`
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    fs.writeFileSync(sitemapPath, sitemapContent, "utf8");

    console.log("✅ Sitemap generated successfully at:", sitemapPath);
    console.log(`Total URLs in sitemap: ${allUrls.length}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    console.error("Error details:", error.message);
    if (error.response) {
      console.error("API response error:", error.response.data);
    }
  }
}

generateSitemap();
