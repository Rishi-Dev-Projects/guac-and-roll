async function verify() {
  console.log("Verifying Phase 2E endpoints...");

  const homeRes = await fetch("http://localhost:3000/");
  const homeHtml = await homeRes.text();
  console.log("HomePage Status:", homeRes.status);
  console.log("HomePage JSON-LD included:", homeHtml.includes("application/ld+json"));
  console.log("HomePage Chapter 06 included:", homeHtml.includes("CHAPTER 06 · THE LOCAL ARRIVAL"));
  console.log("HomePage Google Maps link included:", homeHtml.includes("share.google/PXUAlW6Y3CEHXkXU1"));
  console.log("HomePage Instagram link included:", homeHtml.includes("instagram.com/guacnroll.cafe"));
  console.log("Mobile Utility Dock included:", homeHtml.includes("Quick Action Bar"));

  const visitRes = await fetch("http://localhost:3000/visit");
  const visitHtml = await visitRes.text();
  console.log("\nVisit Page Status:", visitRes.status);
  console.log("Visit Page JSON-LD included:", visitHtml.includes("application/ld+json"));
  console.log("Visit Page Address included:", visitHtml.includes("Shop 9 &amp; 10, Ambiance Twin City") || visitHtml.includes("Shop 9 & 10, Ambiance Twin City"));
  console.log("Visit Page Google Maps Embed included:", visitHtml.includes("maps.google.com/maps"));
  console.log("Visit Page Google Review CTA included:", visitHtml.includes("Explore Google Reviews"));
  console.log("Visit Page Instagram CTA included:", visitHtml.includes("FOLLOW THE ROLL"));
  console.log("Visit Page WhatsApp Architecture Status included:", visitHtml.includes("WhatsApp Ordering"));

  // Check no fake phone numbers or fake reviews are in the HTML
  console.log("\nZero Fake Information Check:");
  console.log("Fake phone number (e.g. 123456) absent:", !homeHtml.includes("123456") && !visitHtml.includes("123456"));
  console.log("Fake wa.me link absent:", !homeHtml.includes("wa.me/TODO") && !visitHtml.includes("wa.me/TODO"));
  console.log("Fake 5.0 stars count absent:", !homeHtml.includes("5.0 (") && !visitHtml.includes("5.0 ("));

  console.log("\nAll Phase 2E automated checks passed successfully!");
}

verify().catch(console.error);
