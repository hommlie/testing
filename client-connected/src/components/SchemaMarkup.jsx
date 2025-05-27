import { Helmet } from "react-helmet";

const SchemaMarkup = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hommlie",
    image: "https://www.hommlie.com/logo.png",
    "@id": "https://www.hommlie.com",
    url: "https://www.hommlie.com",
    telephone: "6363865658",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "57 2nd Floor, Place Building, 6th Main Rd, Nagendra Block, Banashankari 1st Stage, Banashankari",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560050",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.9336",
      longitude: "77.5661",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    priceRange: "From ₹399",
    sameAs: [
      "https://www.instagram.com/hommlie/",
      "https://www.facebook.com/hommlie",
      "https://in.pinterest.com/hommlie2024/",
      "https://x.com/HommlieOfficial",
      "https://www.linkedin.com/company/hommlie/",
      "https://www.youtube.com/@hommlie",
    ],
    description:
      "Hommlie is a trusted home service brand in Bangalore offering 24/7 professional pest control, deep cleaning, COVID disinfection, bird netting, and mosquito net installations for homes and businesses.",
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SchemaMarkup;
