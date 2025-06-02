// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const inspectionRoutes = require("./routes/inspection");
app.use("/api/inspection", inspectionRoutes);

const smartRoutes = require("./routes/smart");
app.use("/api/smart", smartRoutes);

const gridRoutes = require("./routes/grid");
app.use("/api/grid", gridRoutes);

const managementRoutes = require("./routes/management");
app.use("/api/management", managementRoutes);

const reviewRoutes = require("./routes/reviews");
app.use("/api/reviews", reviewRoutes);

const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

const pestCardsRoutes = require("./routes/pestcards");
app.use("/api/pestcards", pestCardsRoutes);

const trendingRoutes = require("./routes/trendingpests");
app.use("/api/trending", trendingRoutes);

const faqRoutes = require("./routes/faq");
app.use("/api/faq", faqRoutes);

const headerRoutes = require("./routes/header");
app.use("/api/header", headerRoutes);

const termiteRoutes = require("./routes/termite");
app.use("/api/termite", termiteRoutes);

const heroRoutes = require("./routes/hero");
app.use("/api/hero", heroRoutes);

const pestTabsRoutes = require("./routes/pestTabs");
app.use("/api/pest", pestTabsRoutes);

const pestRoutes = require("./routes/pests");
app.use("/api/pests", pestRoutes);

const pestPageRoutes = require("./routes/pestspage");
app.use("/api/pestspage", pestPageRoutes);

const industryHeroRoutes = require("./routes/industryHero");
app.use("/api/industry-hero", industryHeroRoutes);

const industryLocalSupportRoutes = require("./routes/industryLocalSupport");
app.use("/api/industry-local-support", industryLocalSupportRoutes);

const industryServicesRoutes = require("./routes/industryServices");
app.use("/api/industry-services", industryServicesRoutes);

const industryRoutes = require("./routes/industry");
app.use("/api/industry", industryRoutes);

const aboutusRoute = require("./routes/aboutus");
app.use(aboutusRoute);

const contactUsRoute = require("./routes/contactus");
app.use(contactUsRoute);
