// scripts/generate-tos-pdf.mjs
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "Fynd-Terms-of-Service.pdf");

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 60, bottom: 60, left: 60, right: 60 },
  info: { Title: "Fynd - Terms of Service", Author: "Fynd", Subject: "Terms of Service" },
});

const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

const GREEN = "#22C55E";
const DARK  = "#111827";
const GREY  = "#4B5563";
const LIGHT = "#6B7280";
const W     = doc.page.width - 120;

function sectionTitle(text) {
  doc.moveDown(1.2).fontSize(13).fillColor(DARK).font("Helvetica-Bold").text(text, { width: W });
  const y = doc.y + 3;
  doc.moveTo(60, y).lineTo(60 + W, y).strokeColor("#E5E7EB").lineWidth(0.5).stroke();
  doc.moveDown(0.5);
}

function body(text) {
  doc.fontSize(10).fillColor(GREY).font("Helvetica").text(text, { width: W, lineGap: 3 });
}

function bullet(items) {
  items.forEach(item => {
    doc.fontSize(10).fillColor(GREY).font("Helvetica")
      .text("- " + item, { width: W - 14, indent: 14, lineGap: 3 });
  });
}

doc.rect(0, 0, doc.page.width, 8).fill(GREEN);
doc.moveDown(1);
doc.fontSize(28).fillColor(GREEN).font("Helvetica-Bold").text("Fynd");
doc.fontSize(10).fillColor(LIGHT).font("Helvetica").text("fyndplaces.com");
doc.moveDown(0.4);
doc.fontSize(22).fillColor(DARK).font("Helvetica-Bold").text("Terms of Service");
doc.fontSize(9).fillColor(LIGHT).font("Helvetica").text("Last Updated: March 4, 2026");
doc.moveDown(0.8);
doc.moveTo(60, doc.y).lineTo(60 + W, doc.y).strokeColor(GREEN).lineWidth(1.5).stroke();
doc.moveDown(0.6);

body('Welcome to Fynd. These Terms of Service ("Terms") govern your access to and use of the Fynd website, mobile application, and related services (collectively, the "Service"). By using Fynd, you agree to these Terms.\n\nIf you do not agree to these Terms, please do not use the Service.');

sectionTitle("1. About Fynd");
body("Fynd is a travel discovery platform designed to help users explore places, build itineraries, and discover experiences using AI-powered suggestions.\n\nFynd provides informational recommendations only and does not guarantee the accuracy, availability, or suitability of any suggested location, business, or service.");

sectionTitle("2. Acceptance of Terms");
body("By accessing or using the Service, you confirm that:");
bullet(["You are at least 13 years of age.", "You agree to comply with these Terms.", "You will use the Service only for lawful purposes."]);

sectionTitle("3. Use of the Service");
body("Fynd grants you a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes.\n\nYou agree not to:");
bullet(["Copy, modify, or distribute any part of the Service without permission.", "Use the Service for unlawful or harmful activities.", "Attempt to interfere with or disrupt the Service or its infrastructure.", "Attempt to reverse engineer or exploit the platform."]);

sectionTitle("4. Content and Information");
body("Fynd aggregates information from various public sources and uses artificial intelligence to generate travel suggestions.\n\nBecause of this:");
bullet(["Information may occasionally be inaccurate or outdated.", "Businesses, locations, or services may change without notice.", "Fynd does not guarantee availability or quality of recommended places."]);
doc.moveDown(0.3);
body("Users are responsible for verifying information before visiting locations.");

sectionTitle("5. Third-Party Services");
body("The Service may include links to third-party websites, maps, or services such as:");
bullet(["Google Maps", "Travel websites", "Tourism blogs", "Local businesses"]);
doc.moveDown(0.3);
body("Fynd is not responsible for the content, policies, or services of third-party providers. Your use of those services is governed by their own terms.");

sectionTitle("6. No Travel Guarantee");
body("Fynd provides travel suggestions for informational purposes only. Fynd does not:");
bullet(["Operate or manage any locations.", "Provide travel booking services.", "Guarantee safety, accessibility, or availability of locations."]);
doc.moveDown(0.3);
body("Users assume all responsibility when visiting suggested locations.");

sectionTitle("7. Intellectual Property");
body("All content on Fynd, including logos, branding, design, software, and platform features, is the intellectual property of Fynd and is protected by copyright and applicable laws.\n\nYou may not reproduce or distribute any content without permission.");

sectionTitle("8. Service Availability");
body("We strive to keep the Service available and functional, but we do not guarantee uninterrupted access. Fynd may modify, suspend, or discontinue parts of the Service at any time without notice.");

sectionTitle("9. Limitation of Liability");
body("To the maximum extent permitted by law, Fynd and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising from:");
bullet(["Use of the Service.", "Travel decisions made based on recommendations.", "Inaccurate information or location data.", "Third-party services linked from the platform."]);
doc.moveDown(0.3);
body("Your use of the Service is at your own risk.");

sectionTitle("10. Disclaimer of Warranties");
body('The Service is provided "as is" and "as available."\n\nFynd makes no warranties regarding:');
bullet(["Accuracy of recommendations.", "Availability of locations.", "Reliability of AI-generated suggestions."]);

sectionTitle("11. Changes to the Terms");
body('We may update these Terms from time to time. If changes are made, the updated Terms will be posted on the website with a revised "Last Updated" date.\n\nContinued use of the Service after updates constitutes acceptance of the revised Terms.');

sectionTitle("12. Privacy");
body("Your use of the Service is also governed by our Privacy Policy, which explains how we collect and use data. Full Privacy Policy: https://fyndplaces.com/privacy");

doc.moveDown(2);
doc.moveTo(60, doc.y).lineTo(60 + W, doc.y).strokeColor("#E5E7EB").lineWidth(0.5).stroke();
doc.moveDown(0.5);
doc.fontSize(8).fillColor(LIGHT).font("Helvetica")
  .text("(c) 2026 Fynd. All rights reserved.   |   fyndplaces.com   |   Last updated March 4, 2026.", { align: "center", width: W });
doc.rect(0, doc.page.height - 8, doc.page.width, 8).fill(GREEN);

doc.end();
stream.on("finish", () => console.log("\n PDF saved to: " + outPath + "\n"));
stream.on("error", err => console.error("Error:", err));
