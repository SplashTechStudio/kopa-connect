import { Member, Wallet, Loan, LedgerEntry } from "./api";

// Demo data so the app is fully explorable without a live backend.

export const DEMO_MEMBER: Member = {
  _id: "demo-1",
  callUpNumber: "NYSC/LAG/2024/123456",
  stateCode: "LA/24A/1234",
  fullName: "Adaeze Okonkwo",
  state: "Lagos",
  lga: "Ikeja",
  cdsGroup: "ICT Development",
  isVerified: true,
  isAdmin: false,
  creditScore: 742,
};

export const DEMO_ADMIN: Member = {
  ...DEMO_MEMBER,
  _id: "admin-1",
  fullName: "NYSC Admin",
  isAdmin: true,
  callUpNumber: "NYSC/ADMIN/2024/000001",
};

export const DEMO_WALLET: Wallet = {
  memberId: "demo-1",
  balance: 87_450,
  savingsBalance: 22_000,
  locked: false,
  currency: "NGN",
};

export const DEMO_LEDGER: LedgerEntry[] = [
  { transactionId: "tx_001", memberId: "demo-1", accountType: "wallet", amount: 33_000, balanceAfter: 87_450, description: "Allawee credit • November" },
  { transactionId: "tx_002", memberId: "demo-1", accountType: "wallet", amount: -2_500, balanceAfter: 54_450, description: "Airtel data 6GB" },
  { transactionId: "tx_003", memberId: "demo-1", accountType: "wallet", amount: -8_000, balanceAfter: 56_950, description: "Safetrade • Mattress (used)" },
  { transactionId: "tx_004", memberId: "demo-1", accountType: "savings", amount: 5_000, balanceAfter: 22_000, description: "CDS group save-up" },
  { transactionId: "tx_005", memberId: "demo-1", accountType: "wallet", amount: 25_000, balanceAfter: 64_950, description: "Allawee Advance disbursed" },
  { transactionId: "tx_006", memberId: "demo-1", accountType: "wallet", amount: -1_500, balanceAfter: 39_950, description: "MTN airtime" },
];

export const DEMO_LOANS: Loan[] = [
  {
    _id: "loan_001",
    memberId: "demo-1",
    amount: 25_000,
    purpose: "Transport to PPA",
    status: "disbursed",
    interest: 1_250,
    repaymentDate: "2025-05-28",
    createdAt: "2025-04-12",
  },
  {
    _id: "loan_002",
    memberId: "demo-1",
    amount: 10_000,
    purpose: "Data subscription",
    status: "repaid",
    interest: 500,
    repaymentDate: "2025-03-28",
    createdAt: "2025-03-05",
  },
];

export interface DemoProduct {
  id: string;
  title: string;
  price: number;
  seller: string;
  sellerRating: number;
  sellerSales: number;
  state: string;
  lga: string;
  category: string;
  condition: string;
  img: string;
  description: string;
  gallery: string[];
  inStock: number;
  postedAt: string;
}

export const DEMO_PRODUCTS: DemoProduct[] = [
  { id: "p1", title: "Foam mattress (6x6, used 4 mo.)", price: 18_000, seller: "Tunde A.", sellerRating: 4.8, sellerSales: 14, state: "Lagos", lga: "Ikeja", category: "Declutter", condition: "Used — like new", img: "🛏️", gallery: ["🛏️", "🛌", "📐"], inStock: 1, postedAt: "2 days ago", description: "Selling because I'm posted to Abuja for the next month. Mattress is 4 months old, no stains, kept in a smoke-free room. Includes the original cover. Pickup in Ikeja or pay-on-delivery within Lagos." },
  { id: "p2", title: "Standing fan + extension", price: 9_500, seller: "Ngozi U.", sellerRating: 4.6, sellerSales: 7, state: "Lagos", lga: "Lekki", category: "Declutter", condition: "Used — good", img: "🌀", gallery: ["🌀", "🔌"], inStock: 1, postedAt: "5 days ago", description: "Powerful standing fan, 16-inch blades, three speed settings. Comes with a 4-yard extension. Reason for sale: POP next month, won't be needing it back home." },
  { id: "p4", title: "Gas cylinder 6kg", price: 14_000, seller: "Bola K.", sellerRating: 4.7, sellerSales: 9, state: "Oyo", lga: "Ibadan North", category: "Declutter", condition: "Used — good", img: "🔥", gallery: ["🔥", "🍳"], inStock: 1, postedAt: "1 week ago", description: "6kg cylinder. Just refilled — comes with about 5kg of gas in it. Hose and burner included. Selling cheap because I'm leaving Ibadan after POP." },
  { id: "p5", title: "Reading lamp (rechargeable)", price: 4_200, seller: "Chuka E.", sellerRating: 5.0, sellerSales: 3, state: "Imo", lga: "Owerri Municipal", category: "Declutter", condition: "Used — like new", img: "💡", gallery: ["💡"], inStock: 1, postedAt: "3 days ago", description: "Saved my life during NEPA outages. Battery still holds 6+ hours on a full charge. USB-C charging." },
  { id: "p6", title: "Corper Hoodie • limited", price: 6_500, seller: "CorperOne Merch", sellerRating: 4.9, sellerSales: 540, state: "Nationwide", lga: "Ships nationwide", category: "Marketplace", condition: "New", img: "👕", gallery: ["👕", "🧥"], inStock: 120, postedAt: "Restocked today", description: "Heavyweight 320gsm cotton hoodie with embroidered Corper crest. Sizes S–XXL. Ships to all 36 states + FCT in 3–5 days." },
  { id: "p7", title: "Canvas Sneakers (White)", price: 8_500, seller: "CorperOne Merch", sellerRating: 4.9, sellerSales: 210, state: "Nationwide", lga: "Ships nationwide", category: "Marketplace", condition: "New", img: "👟", gallery: ["👟"], inStock: 45, postedAt: "Yesterday", description: "Perfect for CDS and orientation camp. Durable canvas material with rubber soles. Available in sizes 38–45." },
  { id: "p8", title: "Logitech Wireless Mouse", price: 12_000, seller: "Femi A.", sellerRating: 4.8, sellerSales: 2, state: "Lagos", lga: "Lekki", category: "Declutter", condition: "Used — like new", img: "🖱️", gallery: ["🖱️"], inStock: 1, postedAt: "4 hours ago", description: "Logitech M185 wireless mouse. Works perfectly, comes with the USB dongle. Selling because I upgraded to a MX Master." },
  { id: "p9", title: "Indomie Carton (70g x 40)", price: 11_500, seller: "Wholesale Corp", sellerRating: 4.5, sellerSales: 1200, state: "Nationwide", lga: "Ships nationwide", category: "Marketplace", condition: "New", img: "🍜", gallery: ["🍜"], inStock: 50, postedAt: "10 mins ago", description: "Bulk indomie for the smart corper. Save money by buying in bulk. Instant delivery within major state capitals." },
  { id: "p10", title: "Used Laptop Stand", price: 5_000, seller: "Chiamaka O.", sellerRating: 4.9, sellerSales: 1, state: "Lagos", lga: "Ikeja", category: "Declutter", condition: "Used — good", img: "💻", gallery: ["💻"], inStock: 1, postedAt: "Yesterday", description: "Aluminum laptop stand, adjustable height. Very sturdy. Selling as I'm moving and reducing my luggage." },
  { id: "p11", title: "Electric Kettle (New)", price: 12_500, seller: "CorperOne Home", sellerRating: 4.7, sellerSales: 89, state: "Lagos", lga: "Yaba", category: "Marketplace", condition: "New", img: "🫖", gallery: ["🫖"], inStock: 20, postedAt: "2 hours ago", description: "Fast boiling 1.8L electric kettle. Durable stainless steel design. Perfect for the hostel." },
  { id: "p12", title: "Study Desk & Chair", price: 35_000, seller: "Tobi L.", sellerRating: 4.6, sellerSales: 3, state: "Oyo", lga: "Ibadan", category: "Declutter", condition: "Used — like new", img: "🪑", gallery: ["🪑", "📑"], inStock: 1, postedAt: "3 days ago", description: "Compact study desk with an ergonomic chair. Used for only 6 months. Great for remote work corpers." },
  { id: "p13", title: "Solar Power Bank (50,000mAh)", price: 22_000, seller: "Green Energy Corp", sellerRating: 4.9, sellerSales: 156, state: "Nationwide", lga: "Ships nationwide", category: "Marketplace", condition: "New", img: "🔋", gallery: ["🔋", "☀️"], inStock: 50, postedAt: "1 hour ago", description: "High-capacity solar power bank. Charges up to 4 devices simultaneously. Built-in LED flashlight and compass. Perfect for off-grid PPAs." },
];

export interface DemoListing {
  id: string;
  title: string;
  price: number;
  type: string;
  state: string;
  lga: string;
  img: string;
  verified: boolean;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  landlord: string;
  landlordPhone: string;
  gallery: string[];
  distanceToPPA: string;
}

export const DEMO_LISTINGS: DemoListing[] = [
  { id: "a1", title: "Self-con near GRA", price: 220_000, type: "Annual", state: "Lagos", lga: "Ikeja", img: "🏠", verified: true, bedrooms: 1, bathrooms: 1, amenities: ["Prepaid meter", "Water borehole", "Tiled floor", "Fence + gate", "Wardrobe"], landlord: "Mr. Adekunle (verified landlord)", landlordPhone: "+234 803 ••• ••12", gallery: ["🏠", "🛏️", "🚿", "🍳"], distanceToPPA: "8 min drive to Ikeja secretariat", description: "Newly painted self-contained apartment in a quiet, gated compound 2 minutes off Awolowo Way. Tiled, en-suite bathroom, kitchen counter, prepaid meter so no NEPA wahala. Landlord lives off-site, agent on-call." },
  { id: "a2", title: "Mini-flat (2 corpers, 1 free)", price: 90_000, type: "Per Corper / yr", state: "Imo", lga: "Owerri", img: "🏡", verified: true, bedrooms: 2, bathrooms: 1, amenities: ["Shared kitchen", "Tiled floor", "Borehole", "Generator backup"], landlord: "Existing corpers (Chika & Tola)", landlordPhone: "+234 815 ••• ••44", gallery: ["🏡", "🛋️", "🛏️"], distanceToPPA: "10 min walk to Owerri secretariat", description: "Two of us are already living here, looking for a third corper to take the spare room. Quiet, female-only flat, 5 minutes from CDS venue. Rent is per corper per year — utilities split three ways." },
  { id: "a3", title: "Shared room — quiet", price: 45_000, type: "Per Corper / yr", state: "Oyo", lga: "Ibadan", img: "🛋️", verified: false, bedrooms: 1, bathrooms: 1, amenities: ["Shared kitchen", "Mattress provided"], landlord: "Posted by corper (unverified)", landlordPhone: "+234 706 ••• ••71", gallery: ["🛋️"], distanceToPPA: "20 min bus to PPA", description: "Looking for one more corper to share a room. Beds are partitioned, you get your own wardrobe. Landlord is fine with it as long as we're respectful." },
  { id: "a4", title: "Studio with WiFi", price: 320_000, type: "Annual", state: "Abuja", lga: "Gwarinpa", img: "🏢", verified: true, bedrooms: 1, bathrooms: 1, amenities: ["Free WiFi", "AC", "Prepaid meter", "24h security", "Inverter"], landlord: "Hilltop Properties (verified)", landlordPhone: "+234 802 ••• ••03", gallery: ["🏢", "🛏️", "🛋️", "🚿"], distanceToPPA: "15 min drive to NYSC HQ", description: "Premium studio in Gwarinpa estate. Comes furnished with bed, sofa, AC, and the most reliable WiFi in the area. 24-hour estate security, two boreholes, and inverter backup for at least 6 hours of power outage." },
  { id: "a5", title: "2 Bedroom Flat near Secretariat", price: 450_000, type: "Annual", state: "Lagos", lga: "Ikeja", img: "🏢", verified: true, bedrooms: 2, bathrooms: 2, amenities: ["Security", "Parking", "Water"], landlord: "Chief Okoro", landlordPhone: "+234 803 ••• ••99", gallery: ["🏢"], distanceToPPA: "5 min walk to Secretariat", description: "Spacious 2-bedroom flat, perfect for a group of 4 corpers to share. Gated compound, constant water, and secure parking." },
  { id: "a6", title: "Self-con (Female only)", price: 180_000, type: "Annual", state: "Rivers", lga: "Port Harcourt", img: "🏠", verified: true, bedrooms: 1, bathrooms: 1, amenities: ["Prepaid meter", "Tiled"], landlord: "Mrs. Benson", landlordPhone: "+234 805 ••• ••22", gallery: ["🏠"], distanceToPPA: "12 min drive to PPA", description: "Clean self-contained in a very secure neighborhood. Landlady prefers a female corper. Prepaid meter installed." },
];


export interface DemoRoommate {
  id: string;
  name: string;
  age: number;
  state: string;
  lga: string;
  vibe: string;
  smokes: boolean;
  budget: number;
  occupation: string;
  bio: string;
  cleanliness: number;
  socialBattery: number;
  movesIn: string;
  habits: string[];
  verified: boolean;
}

export const DEMO_ROOMMATES: DemoRoommate[] = [
  { id: "r1", name: "Chiamaka O.", age: 24, state: "Lagos", lga: "Ikeja", vibe: "Quiet, early sleeper", smokes: false, budget: 80_000, occupation: "ICT corper at Andela", bio: "Working remotely most days. I cook, I clean, and I'm usually in bed by 10pm. Looking for someone with similar energy — no late-night parties, please.", cleanliness: 9, socialBattery: 4, movesIn: "Available now", habits: ["Cooks at home", "full work from Home most days", "Non-smoker", "No pets"], verified: true },
  { id: "r2", name: "Femi A.", age: 26, state: "Lagos", lga: "Lekki", vibe: "Tech bro, works from home", smokes: false, budget: 120_000, occupation: "Backend engineer (NYSC)", bio: "Building a side project on the side of NYSC. Need fast WiFi and someone who respects deep-work hours during the day. Down to split groceries and weekend movie nights.", cleanliness: 7, socialBattery: 6, movesIn: "From May 1st", habits: ["full work from Home 5 days", "Loves football", "Non-smoker"], verified: true },
  { id: "r3", name: "Hauwa M.", age: 23, state: "Abuja", lga: "Gwarinpa", vibe: "Loves cooking, neat", smokes: false, budget: 100_000, occupation: "Pharmacy corper", bio: "I cook every weekend and I'd rather share groceries than do separate kitchens. Very neat — like, the kind of neat where the spices are alphabetical. Looking for a sister-roommate vibe.", cleanliness: 10, socialBattery: 7, movesIn: "Available now", habits: ["Loves cooking", "Early riser", "Non-smoker", "Plays Afrobeats"], verified: true },
  { id: "r4", name: "Segun J.", age: 25, state: "Lagos", lga: "Yaba", vibe: "Outgoing, loves sports", smokes: false, budget: 90_000, occupation: "Education corper", bio: "Always out for CDS or sports. Looking for a chill roommate to share a flat in Yaba. I'm rarely home but I'm clean when I am.", cleanliness: 8, socialBattery: 9, movesIn: "Available now", habits: ["Loves football", "Weekend traveler", "Non-smoker"], verified: false },
  { id: "r5", name: "Bose A.", age: 24, state: "Oyo", lga: "Ibadan", vibe: "Studious, calm", smokes: false, budget: 50_000, occupation: "Medical corper", bio: "Most of my time is spent at the hospital. Need a quiet place to sleep and study. Very respectful of boundaries.", cleanliness: 9, socialBattery: 3, movesIn: "Next month", habits: ["Early riser", "Non-smoker", "No pets"], verified: true },
];

export const DEMO_FEED = [
  {
    id: "f1",
    author: "NYSC Lagos State",
    handle: "@nysc_lagos",
    verified: true,
    official: true,
    state: "Lagos",
    category: "News",
    time: "2h",
    body: "All Batch A corps members in Lagos: clearance for the month of April begins Monday 28th. Bring your call-up letter and CDS card. Late arrivals will not be processed.",
    upvotes: 412,
    comments: 87,
  },
  {
    id: "f2",
    author: "Adaeze Okonkwo",
    handle: "@adaeze",
    verified: true,
    official: false,
    state: "Lagos",
    category: "Discussion",
    time: "5h",
    body: "Best PPA in Ikeja for ICT corpers? Looking for somewhere that actually lets you build things. Drop your experiences 👇",
    upvotes: 96,
    comments: 41,
  },
  {
    id: "f3",
    author: "CorperOne Devotional",
    handle: "@devotional",
    verified: true,
    official: false,
    state: "Nationwide",
    category: "Religious",
    time: "Today",
    body: "Daily Word — \"Commit your work to the Lord, and your plans will be established.\" Proverbs 16:3. A short prayer for your service year is on the feed.",
    upvotes: 1_204,
    comments: 56,
  },
  {
    id: "f4",
    author: "CDS • ICT Development",
    handle: "@cds_ict",
    verified: true,
    official: false,
    state: "Lagos",
    category: "Programs",
    time: "1d",
    body: "Reminder: Friday CDS at the secretariat by 9am sharp. Bring laptops — we're shipping the literacy app to two schools next week.",
    upvotes: 188,
    comments: 23,
  },
  {
    id: "f5",
    author: "CorperOne Voices",
    handle: "@corperonevoices",
    verified: true,
    official: false,
    state: "Nationwide",
    category: "Discussion",
    time: "3h",
    body: "Service year isn't just about the stipend, it's about the social capital. Who else is using this year to build a network for their startup? Let's talk collaborative growth 🚀",
    upvotes: 342,
    comments: 112,
  },
  {
    id: "f6",
    author: "Tech Corpers Hub",
    handle: "@tech_corpers",
    verified: true,
    official: false,
    state: "Lagos",
    category: "Programs",
    time: "6h",
    body: "Lagos Tech Corpers: We're hosting a 'Build-in-Public' session this Saturday. No matter your stack, come show what you're building! Community over competition always.",
    upvotes: 215,
    comments: 45,
  },
  {
    id: "f7",
    author: "Sustainability Squad",
    handle: "@green_nysc",
    verified: true,
    official: false,
    state: "Abuja",
    category: "News",
    time: "1d",
    body: "Started a plastic recycling drive at my PPA today. Small steps lead to big changes. If you want to start one in your local govt, DM for the roadmap! 🌍",
    upvotes: 876,
    comments: 98,
  },
];

export const DEMO_ANNOUNCEMENTS = [
  { id: "an1", title: "April Allawee disbursement update", body: "All Batch A members will receive their April allowance by the 28th.", target: "Nationwide", time: "2h" },
  { id: "an2", title: "POP date confirmed for Stream II", body: "Stream II POP holds Thursday, July 10, 2025.", target: "Nationwide", time: "1d" },
  { id: "an3", title: "CDS sports tournament — Lagos", body: "Inter-platoon football kicks off Saturday at Teslim Balogun.", target: "Lagos", time: "3d" },
];

export const DEMO_JOBS = [
  { id: "j1", title: "Junior Frontend Engineer", company: "Paystack", location: "Lagos (Hybrid)", type: "Post-NYSC", pay: "₦450k–₦650k", description: "We are looking for a Junior Frontend Engineer to join our core product team. You will be working with React, TypeScript, and Tailwind CSS to build world-class financial tools.", requirements: ["Proficiency in React/JS", "Strong CSS skills", "NYSC completion certificate or currently serving", "Portfolio of projects"] },
  { id: "j2", title: "Marketing Associate", company: "Flutterwave", location: "Remote", type: "Post-NYSC", pay: "₦400k+", description: "Join our growth team to expand our footprint across Africa. You will manage digital campaigns and partner relationships.", requirements: ["Strong communication skills", "Data-driven mindset", "Experience with social media marketing"] },
  { id: "j3", title: "Field Sales Intern", company: "Sabi", location: "Abuja", type: "Internship", pay: "₦80k stipend", description: "Work on the field to onboard merchants and manage logistics data. Great for corpers looking for on-ground experience.", requirements: ["Mobile literacy", "Fluency in local language is a plus", "Energetic and self-motivated"] },
  { id: "j4", title: "Product Designer", company: "Kuda", location: "Lagos", type: "Post-NYSC", pay: "₦350k–₦500k", description: "Help us design the future of banking in Africa. You will work on user research, wireframing, and high-fidelity prototyping.", requirements: ["Figma proficiency", "User-centric design thinking", "Strong visual design skills"] },
  { id: "j5", title: "Operations Analyst", company: "Moniepoint", location: "Lagos (On-site)", type: "Post-NYSC", pay: "₦300k+", description: "Support our operations team in managing agent networks and transaction flows.", requirements: ["Analytical mindset", "Excel proficiency", "Problem-solving skills"] },
];

export interface DemoCourse {
  id: string;
  title: string;
  instructor: string;
  level: string;
  students: number;
  duration: string;
  price: number;
  rating: number;
  emoji: string;
  blurb: string;
  outcomes: string[];
  modules: { title: string; lessons: number; duration: string }[];
  tags: string[];
  certificate: boolean;
}

export const DEMO_COURSES: DemoCourse[] = [
  {
    id: "c1",
    title: "Frontend with React (8 weeks)",
    instructor: "CorperOne Academy",
    level: "Beginner",
    students: 1_240,
    duration: "8 weeks · ~6 hrs/week",
    price: 0,
    rating: 4.8,
    emoji: "⚛️",
    blurb: "Build production-ready interfaces in React from zero. Designed for corpers with 6 hours a week — finish before POP and ship a portfolio site that gets you hired.",
    outcomes: ["Build and deploy a full React app", "Master Tailwind & component design", "Connect to APIs with React Query", "Land a junior frontend role after POP"],
    modules: [
      { title: "Web fundamentals refresher", lessons: 6, duration: "2 hrs" },
      { title: "React in 90 minutes", lessons: 8, duration: "3 hrs" },
      { title: "State, hooks & data fetching", lessons: 10, duration: "5 hrs" },
      { title: "Tailwind & design systems", lessons: 7, duration: "3.5 hrs" },
      { title: "Routing, auth & deployment", lessons: 9, duration: "4 hrs" },
      { title: "Capstone — ship your portfolio", lessons: 4, duration: "1 week" },
    ],
    tags: ["Tech", "Most popular", "Job-ready"],
    certificate: true,
  },
  {
    id: "c2",
    title: "Personal finance for corpers",
    instructor: "Qreva Money",
    level: "All levels",
    students: 3_512,
    duration: "3 weeks · ~2 hrs/week",
    price: 0,
    rating: 4.9,
    emoji: "💸",
    blurb: "Stretch your ₦33k allowance, start a savings habit you'll keep after POP, and avoid the loan-trap that catches most corpers in their first three months.",
    outcomes: ["Budget your allawee in under 10 minutes", "Build a 3-month emergency fund", "Pick the right savings tools", "Negotiate your first salary post-POP"],
    modules: [
      { title: "Where your allawee actually goes", lessons: 4, duration: "45 min" },
      { title: "The corper budget that works", lessons: 5, duration: "1 hr" },
      { title: "Saving + investing on a stipend", lessons: 6, duration: "1.5 hrs" },
      { title: "Surviving emergencies & loans", lessons: 4, duration: "1 hr" },
    ],
    tags: ["Finance", "Beginner-friendly"],
    certificate: true,
  },
  {
    id: "c3",
    title: "Freelancing on Upwork",
    instructor: "Onyinye E.",
    level: "Intermediate",
    students: 980,
    duration: "5 weeks · ~4 hrs/week",
    price: 0,
    rating: 4.7,
    emoji: "🌍",
    blurb: "Land your first international client while still serving. Real client templates, profile reviews, and a private community of corpers earning in dollars.",
    outcomes: ["Build a profile that converts", "Win your first 3 contracts", "Price yourself in USD", "Get paid into a Naira wallet legally"],
    modules: [
      { title: "Profile + portfolio audit", lessons: 5, duration: "2 hrs" },
      { title: "Proposals that actually win", lessons: 6, duration: "2.5 hrs" },
      { title: "Pricing + scope conversations", lessons: 4, duration: "1.5 hrs" },
      { title: "Receiving payments in Nigeria", lessons: 4, duration: "1.5 hrs" },
      { title: "Scaling beyond Upwork", lessons: 5, duration: "2 hrs" },
    ],
    tags: ["Income", "Intermediate"],
    certificate: true,
  },
  {
    id: "c4",
    title: "Digital Marketing for Brands",
    instructor: "Sarah O.",
    level: "Beginner",
    students: 2150,
    duration: "6 weeks · ~4 hrs/week",
    price: 0,
    rating: 4.6,
    emoji: "📈",
    blurb: "Master SEO, SEM, and Social Media Ads. Learn how to help small businesses grow and earn as a consultant during your service year.",
    outcomes: ["Run profitable Facebook & IG ads", "Understand SEO fundamentals", "Build a marketing strategy", "Manage email marketing campaigns"],
    modules: [
      { title: "Marketing fundamentals", lessons: 5, duration: "2 hrs" },
      { title: "Social media mastery", lessons: 8, duration: "4 hrs" },
      { title: "Search engine optimization", lessons: 6, duration: "3 hrs" },
      { title: "Analytics and reporting", lessons: 4, duration: "2 hrs" },
    ],
    tags: ["Marketing", "Beginner"],
    certificate: true,
  },
  {
    id: "c5",
    title: "Content Creation Mastery",
    instructor: "CorperOne Studios",
    level: "Beginner",
    students: 1840,
    duration: "4 weeks · ~3 hrs/week",
    price: 0,
    rating: 4.9,
    emoji: "🎬",
    blurb: "Learn to shoot, edit, and distribute content that goes viral. Perfect for corpers looking to build a personal brand or work in media.",
    outcomes: ["Mobile video editing with CapCut", "Scriptwriting for short-form video", "Lighting and audio on a budget", "Monetizing your content"],
    modules: [
      { title: "Storytelling basics", lessons: 4, duration: "1.5 hrs" },
      { title: "Mobile cinematography", lessons: 6, duration: "3 hrs" },
      { title: "Pro editing on your phone", lessons: 10, duration: "5 hrs" },
      { title: "Platform algorithms (TikTok/IG)", lessons: 5, duration: "2 hrs" },
    ],
    tags: ["Creative", "Most popular"],
    certificate: true,
  },
];

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

export const PRODUCT_CATEGORIES = ["Declutter", "Marketplace", "Electronics", "Kitchen", "Apparel"];
export const ACCOMMODATION_TYPES = ["Self-contained", "Mini-flat", "Shared room", "Studio", "2-bedroom flat"];

export interface DemoNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: "official" | "finance" | "marketplace" | "community";
  read: boolean;
}

export const DEMO_NOTIFICATIONS: DemoNotification[] = [
  { id: "n1", title: "April allawee credited", body: "₦33,000 has been added to your wallet by NYSC Finance.", time: "2h", type: "finance", read: false },
  { id: "n2", title: "Tunde A. accepted your offer", body: "Foam mattress is held in Safetrade. Confirm pickup to release ₦18,000.", time: "5h", type: "marketplace", read: false },
  { id: "n3", title: "NYSC Lagos posted an announcement", body: "Clearance for Batch A begins Monday 28th. Tap to read.", time: "Yesterday", type: "official", read: false },
  { id: "n4", title: "Allawee Advance approved", body: "Your ₦25,000 advance is in your wallet. Repaid on next allowance.", time: "2 days", type: "finance", read: true },
  { id: "n5", title: "Hauwa M. wants to roommate", body: "She matched your budget and lives close to your CDS venue.", time: "3 days", type: "community", read: true },
];

export interface DemoTicket {
  id: string;
  title: string;
  status: "open" | "in_review" | "resolved";
  category: string;
  body: string;
  time: string;
  assigned?: string;
}

export const DEMO_TICKETS: DemoTicket[] = [
  { id: "t1", title: "Allowance not credited for March", status: "resolved", category: "Allowance", body: "I didn't receive my March allowance. Resolved after providing my new account details.", time: "3 weeks ago", assigned: "Lagos State NYSC Finance" },
  { id: "t2", title: "PPA rejection — request relocation", status: "in_review", category: "PPA", body: "PPA refused to accept me citing that they don't take corpers in my course. Requesting reposting.", time: "5 days ago", assigned: "Zonal Inspector" },
];

export interface DemoWelfareHistory {
  id: string;
  type: string;
  amount?: number;
  status: "approved" | "pending" | "declined";
  date: string;
  reason: string;
}

export const DEMO_WELFARE_HISTORY: DemoWelfareHistory[] = [
  { id: "w1", type: "Medical Support", amount: 15000, status: "approved", date: "2025-03-12", reason: "Emergency dental checkup" },
  { id: "w2", type: "Transport Subsidy", amount: 5000, status: "pending", date: "2025-04-20", reason: "Relocation to new PPA" },
  { id: "w3", type: "Food Provisions", status: "declined", date: "2025-02-15", reason: "Monthly provision request" },
];

export interface DemoComment {
  id: string;
  postId: string;
  parentId: string | null;
  author: string;
  handle: string;
  verified: boolean;
  official?: boolean;
  time: string;
  body: string;
  upvotes: number;
}

export const DEMO_COMMENTS: DemoComment[] = [
  // f1 — official NYSC announcement
  { id: "c1", postId: "f1", parentId: null, author: "Tunde A.", handle: "@tundea", verified: true, time: "1h", body: "Will Saturday clearance also be open for those who missed the Monday slot? Some of us have CDS conflicts.", upvotes: 24 },
  { id: "c2", postId: "f1", parentId: "c1", author: "NYSC Lagos State", handle: "@nysc_lagos", verified: true, official: true, time: "55m", body: "Yes — Saturday 10am–2pm at the Surulere office only. Bring your CDS card to confirm the conflict.", upvotes: 41 },
  { id: "c3", postId: "f1", parentId: "c1", author: "Ngozi U.", handle: "@ngoziu", verified: true, time: "30m", body: "Thank you, just confirmed with my LI. Saturday works.", upvotes: 6 },
  { id: "c4", postId: "f1", parentId: null, author: "Femi A.", handle: "@femi", verified: true, time: "45m", body: "Please how long does processing usually take on the day? Trying to plan around it.", upvotes: 11 },

  // f2 — Adaeze asking about PPAs
  { id: "c5", postId: "f2", parentId: null, author: "Femi A.", handle: "@femi", verified: true, time: "3h", body: "Andela actually takes corpers and lets you ship. I'm there now — DM if you want a referral.", upvotes: 38 },
  { id: "c6", postId: "f2", parentId: "c5", author: "Adaeze Okonkwo", handle: "@adaeze", verified: true, time: "2h", body: "Sliding into your DMs — thank you 🙏", upvotes: 4 },
  { id: "c7", postId: "f2", parentId: null, author: "Chuka E.", handle: "@chukae", verified: true, time: "2h", body: "Paystack and Flutterwave both have structured corper programs — apply early though, slots fill fast.", upvotes: 19 },

  // f3 — devotional
  { id: "c8", postId: "f3", parentId: null, author: "Hauwa M.", handle: "@hauwam", verified: true, time: "4h", body: "Amen. Needed this today 🙏", upvotes: 87 },
  { id: "c9", postId: "f3", parentId: null, author: "Bola K.", handle: "@bolak", verified: true, time: "2h", body: "Sharing with my platoon group right now.", upvotes: 22 },

  // f4 — CDS reminder
  { id: "c10", postId: "f4", parentId: null, author: "Adaeze Okonkwo", handle: "@adaeze", verified: true, time: "20h", body: "I'll bring the deployment laptop. Anyone got a spare HDMI cable?", upvotes: 9 },
  { id: "c11", postId: "f4", parentId: "c10", author: "Tunde A.", handle: "@tundea", verified: true, time: "18h", body: "I gat you. Meet me at the gate by 8:45.", upvotes: 3 },
];

export interface DemoSavingsPlan {
  id: string;
  type: "flexible" | "targeted" | "group";
  title: string;
  balance: number;
  target?: number;
  interestRate: string;
  nextPayout?: string;
  groupName?: string;
  membersCount?: number;
  rules?: string;
  history?: { id: string; date: string; amount: number; description: string }[];
}

export const DEMO_SAVINGS: DemoSavingsPlan[] = [
  { 
    id: "s1", type: "flexible", title: "Allawee Reserve", balance: 5000, interestRate: "8% p.a.", nextPayout: "May 1st",
    history: [
      { id: "th1", date: "Apr 20, 2024", amount: 2000, description: "Direct Deposit" },
      { id: "th2", date: "Apr 15, 2024", amount: 3000, description: "Initial Deposit" }
    ]
  },
  { 
    id: "s2", type: "targeted", title: "Post-NYSC Mac Studio", balance: 120000, target: 800000, interestRate: "12% p.a.", nextPayout: "On target completion",
    history: [
      { id: "th3", date: "Apr 22, 2024", amount: 50000, description: "Monthly Contribution" },
      { id: "th4", date: "Mar 22, 2024", amount: 70000, description: "Initial Deposit" }
    ]
  },
  { 
    id: "s3", type: "group", title: "Batch A Techies Esusu", balance: 45000, interestRate: "10% p.a.", groupName: "Batch A Techies", membersCount: 12, nextPayout: "June 15th", rules: "1. Monthly contribution of ₦5,000. 2. Payout is rotational. 3. Late payments attract ₦500 fine.",
    history: [
      { id: "th5", date: "Apr 25, 2024", amount: 5000, description: "April Contribution" },
      { id: "th6", date: "Mar 25, 2024", amount: 5000, description: "March Contribution" }
    ]
  },
  { 
    id: "s4", type: "group", title: "Lagos Platoon 4 Ajo", balance: 15000, interestRate: "10% p.a.", groupName: "Platoon 4", membersCount: 30, nextPayout: "July 1st", rules: "1. Bi-weekly contribution of ₦2,000. 2. Funds used for platoon projects and individual payouts.",
    history: [
      { id: "th7", date: "Apr 10, 2024", amount: 2000, description: "Bi-weekly Contribution" }
    ]
  },
  { 
    id: "s5", type: "group", title: "ICT CDS Savings", balance: 25000, interestRate: "10% p.a.", groupName: "ICT CDS", membersCount: 15, nextPayout: "August 15th", rules: "1. Monthly contribution of ₦3,000. 2. Strictly for ICT related purchases or emergencies.",
    history: [
      { id: "th8", date: "Apr 05, 2024", amount: 3000, description: "Monthly Contribution" }
    ]
  },
];
