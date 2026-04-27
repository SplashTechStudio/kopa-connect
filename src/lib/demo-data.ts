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
  { id: "p3", title: "Full Room Setup Bundle", price: 65_000, seller: "Kopa Vendor", sellerRating: 4.9, sellerSales: 312, state: "Lagos", lga: "Yaba", category: "Bundle", condition: "Mixed used", img: "📦", gallery: ["📦", "🛏️", "🌀", "🍳"], inStock: 5, postedAt: "Today", description: "Curated by Kopa Vendor. Includes mattress, standing fan, gas cylinder, kettle, reading lamp, and basic kitchenware. Perfect for new corpers landing at camp. Delivery available across Lagos within 48 hours." },
  { id: "p4", title: "Gas cylinder 6kg", price: 14_000, seller: "Bola K.", sellerRating: 4.7, sellerSales: 9, state: "Oyo", lga: "Ibadan North", category: "Declutter", condition: "Used — good", img: "🔥", gallery: ["🔥", "🍳"], inStock: 1, postedAt: "1 week ago", description: "6kg cylinder. Just refilled — comes with about 5kg of gas in it. Hose and burner included. Selling cheap because I'm leaving Ibadan after POP." },
  { id: "p5", title: "Reading lamp (rechargeable)", price: 4_200, seller: "Chuka E.", sellerRating: 5.0, sellerSales: 3, state: "Imo", lga: "Owerri Municipal", category: "Declutter", condition: "Used — like new", img: "💡", gallery: ["💡"], inStock: 1, postedAt: "3 days ago", description: "Saved my life during NEPA outages. Battery still holds 6+ hours on a full charge. USB-C charging." },
  { id: "p6", title: "Corper Hoodie • limited", price: 6_500, seller: "Kopa Merch", sellerRating: 4.9, sellerSales: 540, state: "Nationwide", lga: "Ships nationwide", category: "Marketplace", condition: "New", img: "👕", gallery: ["👕", "🧥"], inStock: 120, postedAt: "Restocked today", description: "Heavyweight 320gsm cotton hoodie with embroidered Corper crest. Sizes S–XXL. Ships to all 36 states + FCT in 3–5 days." },
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
];

export const DEMO_ROOMMATES = [
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
  { id: "r1", name: "Chiamaka O.", age: 24, state: "Lagos", lga: "Ikeja", vibe: "Quiet, early sleeper", smokes: false, budget: 80_000, occupation: "ICT corper at Andela", bio: "Working remotely most days. I cook, I clean, and I'm usually in bed by 10pm. Looking for someone with similar energy — no late-night parties, please.", cleanliness: 9, socialBattery: 4, movesIn: "Available now", habits: ["Cooks at home", "WFH most days", "Non-smoker", "No pets"], verified: true },
  { id: "r2", name: "Femi A.", age: 26, state: "Lagos", lga: "Lekki", vibe: "Tech bro, works from home", smokes: false, budget: 120_000, occupation: "Backend engineer (NYSC)", bio: "Building a side project on the side of NYSC. Need fast WiFi and someone who respects deep-work hours during the day. Down to split groceries and weekend movie nights.", cleanliness: 7, socialBattery: 6, movesIn: "From May 1st", habits: ["WFH 5 days", "Loves football", "Non-smoker"], verified: true },
  { id: "r3", name: "Hauwa M.", age: 23, state: "Abuja", lga: "Gwarinpa", vibe: "Loves cooking, neat", smokes: false, budget: 100_000, occupation: "Pharmacy corper", bio: "I cook every weekend and I'd rather share groceries than do separate kitchens. Very neat — like, the kind of neat where the spices are alphabetical. Looking for a sister-roommate vibe.", cleanliness: 10, socialBattery: 7, movesIn: "Available now", habits: ["Loves cooking", "Early riser", "Non-smoker", "Plays Afrobeats"], verified: true },
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
    author: "Kopa Devotional",
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
];

export const DEMO_ANNOUNCEMENTS = [
  { id: "an1", title: "April Allawee disbursement update", body: "All Batch A members will receive their April allowance by the 28th.", target: "Nationwide", time: "2h" },
  { id: "an2", title: "POP date confirmed for Stream II", body: "Stream II POP holds Thursday, July 10, 2025.", target: "Nationwide", time: "1d" },
  { id: "an3", title: "CDS sports tournament — Lagos", body: "Inter-platoon football kicks off Saturday at Teslim Balogun.", target: "Lagos", time: "3d" },
];

export const DEMO_JOBS = [
  { id: "j1", title: "Junior Frontend Engineer", company: "Paystack", location: "Lagos (Hybrid)", type: "Post-NYSC", pay: "₦450k–₦650k" },
  { id: "j2", title: "Marketing Associate", company: "Flutterwave", location: "Remote", type: "Post-NYSC", pay: "₦400k+" },
  { id: "j3", title: "Field Sales Intern", company: "Sabi", location: "Abuja", type: "Internship", pay: "₦80k stipend" },
];

export const DEMO_COURSES = [
  { id: "c1", title: "Frontend with React (8 weeks)", instructor: "Kopa Academy", level: "Beginner", students: 1_240 },
  { id: "c2", title: "Personal finance for corpers", instructor: "Qreva Money", level: "All levels", students: 3_512 },
  { id: "c3", title: "Freelancing on Upwork", instructor: "Onyinye E.", level: "Intermediate", students: 980 },
];

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];
