import React, { useState } from "react";

const CityServiceLinks = () => {
  const [showMore, setShowMore] = useState({
    pest: false,
    cockroach: false,
    mosquito: false,
    termite: false,
  });

  const toggleShow = (key) => {
    setShowMore((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const pestCities = [
  { name: "Pest Control in Pete area aggregate", url: "/pest-control/pete-area" },
  { name: "Pest Control in Panathur Road area", url: "/pest-control/panathur-road" },
  { name: "Pest Control in Ejipura", url: "/pest-control/ejipura" },
  { name: "Pest Control in Thanisandra Main Road", url: "/pest-control/thanisandra-main-road" },
  { name: "Pest Control in Vijayanagar", url: "/pest-control/vijayanagar" },
  { name: "Pest Control in Jigani", url: "/pest-control/jigani" },
  { name: "Pest Control in Richmond Town", url: "/pest-control/richmond-town" },
  { name: "Pest Control in Shivajinagar", url: "/pest-control/shivajinagar" },
  { name: "Pest Control in Kaikondrahalli", url: "/pest-control/kaikondrahalli" },
  { name: "Pest Control in Cooke Town", url: "/pest-control/cooke-town" },
  { name: "Pest Control in Sarjapur Road", url: "/pest-control/sarjapur-road" },
  { name: "Pest Control in Jogupalya", url: "/pest-control/jogupalya" },
  { name: "Pest Control in TC Palya Road area", url: "/pest-control/tc-palya-road" },
  { name: "Pest Control in Austin Town", url: "/pest-control/austin-town" },
  { name: "Pest Control in Cox Town", url: "/pest-control/cox-town" },
  { name: "Pest Control in Budigere locality", url: "/pest-control/budigere" },
  { name: "Pest Control in Hennur Road", url: "/pest-control/hennur-road" },
  { name: "Pest Control in Attibele Road vicinity", url: "/pest-control/attibele-road" },
  { name: "Pest Control in Vrishabhavathi region", url: "/pest-control/vrishabhavathi-region" },
  { name: "Pest Control in Indiranagar", url: "/pest-control/indiranagar" }
];

const cockroachCities = [
  { name: "Cockroach Control in Hagadooru", url: "/cockroach-control/hagadooru" },
  { name: "Cockroach Control in Kudlu Gate", url: "/cockroach-control/kudlu-gate" },
  { name: "Cockroach Control in Hoodi", url: "/cockroach-control/hoodi" },
  { name: "Cockroach Control in CV Raman Nagar", url: "/cockroach-control/cv-raman-nagar" },
  { name: "Cockroach Control in K R Puram corridor", url: "/cockroach-control/kr-puram" },
  { name: "Cockroach Control in K R Puram", url: "/cockroach-control/krishnarajapuram" },
  { name: "Cockroach Control in Gandhi Nagar", url: "/cockroach-control/gandhi-nagar" },
  { name: "Cockroach Control in Vasanth Nagar", url: "/cockroach-control/vasanth-nagar" },
  { name: "Cockroach Control in Nagarbhavi", url: "/cockroach-control/nagarbhavi" },
  { name: "Cockroach Control in Old Madras Road area", url: "/cockroach-control/old-madras-road" },
  { name: "Cockroach Control in Kamakshipalya", url: "/cockroach-control/kamakshipalya" },
  { name: "Cockroach Control in Halasuru", url: "/cockroach-control/ulsoor" },
  { name: "Cockroach Control in Ramamurthy Nagar", url: "/cockroach-control/ramamurthy-nagar" },
  { name: "Cockroach Control in Koramangala", url: "/cockroach-control/koramangala" },
  { name: "Cockroach Control in Electronic City", url: "/cockroach-control/electronic-city" },
  { name: "Cockroach Control in Rajarajeshwari Nagar", url: "/cockroach-control/rajarajeshwari-nagar" },
  { name: "Cockroach Control in Brookefield", url: "/cockroach-control/brookefield" },
  { name: "Cockroach Control in Chickpet", url: "/cockroach-control/chickpet" },
  { name: "Cockroach Control in Yelahanka", url: "/cockroach-control/yelahanka" },
  { name: "Cockroach Control in Rajajinagar", url: "/cockroach-control/rajajinagar" }
];

const bedbugCities = [
  { name: "Bed Bug Control in Basavanagudi", url: "/bedbug-control/basavanagudi" },
  { name: "Bed Bug Control in HSR Layout", url: "/bedbug-control/hsr-layout" },
  { name: "Bed Bug Control in Mathikere", url: "/bedbug-control/mathikere" },
  { name: "Bed Bug Control in Old Airport Road corridor", url: "/bedbug-control/old-airport-road" },
  { name: "Bed Bug Control in Dayanandanagar", url: "/bedbug-control/dayanandanagar" },
  { name: "Bed Bug Control in Varthur", url: "/bedbug-control/varthur" },
  { name: "Bed Bug Control in Yelahanka", url: "/bedbug-control/yelahanka" },
  { name: "Bed Bug Control in Arekere", url: "/bedbug-control/arekere" },
  { name: "Bed Bug Control in JP Nagar", url: "/bedbug-control/jp-nagar" },
  { name: "Bed Bug Control in R.T. Nagar", url: "/bedbug-control/rt-nagar" },
  { name: "Bed Bug Control in Sadashivanagar", url: "/bedbug-control/sadashivanagar" },
  { name: "Bed Bug Control in Prakashnagar", url: "/bedbug-control/prakashnagar" },
  { name: "Bed Bug Control in Adugodi", url: "/bedbug-control/adugodi" },
  { name: "Bed Bug Control in Srirama Mandir area", url: "/bedbug-control/srirama-mandir" },
  { name: "Bed Bug Control in Hoysalanagar", url: "/bedbug-control/hoysalanagar" },
  { name: "Bed Bug Control in Thanisandra", url: "/bedbug-control/thanisandra" },
  { name: "Bed Bug Control in Nandini Layout", url: "/bedbug-control/nandini-layout" },
  { name: "Bed Bug Control in Fraser Town", url: "/bedbug-control/fraser-town" },
  { name: "Bed Bug Control in Chamarajpet", url: "/bedbug-control/chamarajpet" },
  { name: "Bed Bug Control in Rajajinagar", url: "/bedbug-control/rajajinagar" }
];

const termiteCities = [
  { name: "Termite Control in Seshadripuram", url: "/termite-control/seshadripuram" },
  { name: "Termite Control in Bellandur", url: "/termite-control/bellandur" },
  { name: "Termite Control in Kaveripura", url: "/termite-control/kaveripura" },
  { name: "Termite Control in Doddenakundi", url: "/termite-control/doddenakundi" },
  { name: "Termite Control in Thanisandra & adjacent", url: "/termite-control/thanisandra" },
  { name: "Termite Control in Banashankari", url: "/termite-control/banashankari" },
  { name: "Termite Control in Harlur", url: "/termite-control/harlur" },
  { name: "Termite Control in Jeevanabima Nagar", url: "/termite-control/jeevanabima-nagar" },
  { name: "Termite Control in Sarvagnanagar", url: "/termite-control/sarvagnanagar" },
  { name: "Termite Control in Malleshwaram", url: "/termite-control/malleshwaram" },
  { name: "Termite Control in Hoskote", url: "/termite-control/hoskote" },
  { name: "Termite Control in Whitefield", url: "/termite-control/whitefield" },
  { name: "Termite Control in Kadugodi", url: "/termite-control/kadugodi" },
  { name: "Termite Control in BTM Layout", url: "/termite-control/btm-layout" },
  { name: "Termite Control in Mahadevapura", url: "/termite-control/mahadevapura" },
  { name: "Termite Control in Kaggadasapura", url: "/termite-control/kaggadasapura" },
  { name: "Termite Control in Basaveshwaranagar", url: "/termite-control/basaveshwaranagar" },
  { name: "Termite Control in Nayandahalli", url: "/termite-control/nayandahalli" },
  { name: "Termite Control in Jayanagar", url: "/termite-control/jayanagar" },
  { name: "Termite Control in Marathahalli", url: "/termite-control/marathahalli" }
];


  const renderCityList = (cities, type) => {
    const isExpanded = showMore[type];
    const visibleCities = isExpanded ? cities : cities.slice(0, 3);

    return (
      <>
        <ul className="space-y-2 text-green-600">
          {visibleCities.map((city, index) => (
            <li key={index}>
              <a href={city.url}>{city.name}</a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => toggleShow(type)}
          className="text-black mt-3 text-sm focus:outline-none"
        >
          {isExpanded ? "show less" : "click here to see more"}
        </button>
      </>
    );
  };

  return (
    <div className="py-5 px-4 sm:px-8 lg:px-6">
      <h2 className="text-2xl sm:text-2xl font-medium text-center mb-10 -mt-8">
        Select Your Area for Best Pest Control Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left text-xs sm:text-base">
        {/* Pest Control */}
        <div>
          <h3 className="font-medium mb-4">
            Pest Control in Popular Areas
          </h3>
          {renderCityList(pestCities, "pest")}
        </div>

        {/* Cockroach Control */}
        <div>
          <h3 className="font-medium mb-4">
            Cockroach Control  in Popular Areas
          </h3>
          {renderCityList(cockroachCities, "cockroach")}
        </div>

        {/* Mosquito Control */}
        <div>
          <h3 className="font-medium mb-4">
            BedBugs Control in Popular Areas
          </h3>
          {renderCityList(bedbugCities, "bedbugs")}
        </div>

        {/* Termite Control */}
        <div>
          <h3 className="font-medium mb-4">
            Termite Treatment in Popular Areas
          </h3>
          {renderCityList(termiteCities, "termite")}
        </div>
      </div>
    </div>
  );
};

export default CityServiceLinks;
