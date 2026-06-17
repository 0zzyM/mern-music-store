import mongoose from "mongoose";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Brand from "../models/brandModel.js";

import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

const products = [
  {
    name: "American Series Soloist™ SL2MG",
    brandSlug: "jackson",
    images: [
      "https://res.cloudinary.com/drbhtzgcs/image/upload/q_auto/f_auto/v1781603658/2802501820_jac_ins_frt_1_rr_g64vyw.png",
      "https://res.cloudinary.com/drbhtzgcs/image/upload/q_auto/f_auto/v1781603658/2802501820_jac_ins_bck_1_rl_enymrk.png",
      "https://res.cloudinary.com/drbhtzgcs/image/upload/q_auto/f_auto/v1781603659/2802501820_jac_ins_cbr_1_nr_qoexns.png",
      "https://res.cloudinary.com/drbhtzgcs/image/upload/q_auto/f_auto/v1781603659/2802501820_jac_ins_fbd_1_nr_xhrfms.png",
      "https://res.cloudinary.com/drbhtzgcs/image/upload/q_auto/f_auto/v1781603658/2802501820_jac_ins_hft_1_nr_jwpwj7.png",
      "https://res.cloudinary.com/drbhtzgcs/image/upload/q_auto/f_auto/v1781603658/2802501820_jac_ins_hbk_1_nr_ocpdju.png",
    ],
    price: 2629,
    stock: 5,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {
      bodyMaterial: "Alder",
      bodyFinish: "Matte",
      neckConstruction: "Neck-Through Body with Graphite Reinforcement",
      neckMaterial: "3-Piece Maple",
      neckShape: "Speed Neck",
      fingerboardMaterial: "Ebony",
      fingerboardRadius: '12" - 16" Compound',
      frets: "24, Jumbo Stainless Steel",
      scaleLength: '25.5" (648mm)',
      nutWidth: '1.6875"',
      nutMaterial: "Graph Tech TUSQ XL",
      pickupConfiguration: "HH",
      bridgePickup: "EMG 81",
      neckPickup: "EMG 85",
      controls: "Volume, Tone, 3-Way Blade Switch",
      bridge: "Hipshot 6 Fixed",
      tuners: "Gotoh MG-T Locking",
      hardwareFinish: "Black",
      color: "Matte Army Drab",
      case: "Jackson Foam-Core Hardshell Case Included",
      countryOfOrigin: "USA (Corona, California)",
    },
    amountSold: 12,
    description:
      "The American Series Soloist SL2MG HT is Jackson's flagship metal guitar, hand-built in Corona, California. Its through-body three-piece maple neck construction delivers extended sustain and rock-solid stability, while the compound-radius ebony fingerboard and 24 jumbo stainless steel frets enable fast, expressive playing across the entire neck. The EMG 81/85 active pickup pairing covers tight modern metal rhythm tones through the bridge and articulate, harmonically rich lead voicings from the neck. Equipped with a Hipshot fixed bridge, Gotoh locking tuners, and a Jackson Foam-Core hardshell case, it's a high-performance instrument built for serious players.",
  },
  {
    name: "Fender USA Professional Classic Stratocaster",
    brandSlug: "fender",
    images: ["https://i.imgur.com/zy1wwrA.png"],
    price: 1849,
    stock: 1,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
    amountSold: 5,
  },
  {
    name: "Marshall JVM 410",
    brandSlug: "marshall",
    images: ["https://i.imgur.com/NssFQbY.png"],
    price: 1299,
    stock: 1,
    categorySlug: "amplification",
    subcategorySlug: "amp-heads",
    isFeatured: true,
    details: {},
    amountSold: 10,
  },
  {
    name: "Product 4",
    brandSlug: "jackson",
    images: ["https://picsum.photos/400/300"],
    price: 2000,
    stock: 5,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 5",
    brandSlug: "marshall",
    images: ["https://picsum.photos/400/300"],
    price: 1222,
    stock: 9,
    categorySlug: "amplification",
    subcategorySlug: "combo-amps",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 6",
    brandSlug: "fender",
    images: ["https://picsum.photos/400/300"],
    price: 22,
    stock: 1,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 7",
    brandSlug: "ibanez",
    images: ["https://picsum.photos/400/300"],
    price: 379,
    stock: 4,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "EVH 5150",
    brandSlug: "evh",
    images: ["https://picsum.photos/400/300"],
    price: 1849,
    stock: 9,
    categorySlug: "amplification",
    subcategorySlug: "amp-heads",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 9",
    brandSlug: "fender",
    images: ["https://picsum.photos/400/300"],
    price: 2211,
    stock: 1,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    //Clear existing data first
    await Product.deleteMany({});

    // Build slug to ObjectId map for each

    //Categories
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    //Sub-Categories
    const subcategories = await Subcategory.find({});
    const subcategoryMap = {};
    subcategories.forEach((subcat) => {
      subcategoryMap[subcat.slug] = subcat._id;
    });

    //Brands
    const brands = await Brand.find({});
    const brandMap = {};
    brands.forEach((brand) => {
      brandMap[brand.slug] = brand._id;
    });

    const productsWithIds = products.map((product) => ({
      name: product.name,
      brand: brandMap[product.brandSlug],
      images: product.images,
      price: product.price,
      stock: product.stock,
      category: categoryMap[product.categorySlug],
      subcategory: subcategoryMap[product.subcategorySlug],
      isFeatured: product.isFeatured,
      details: product.details,
    }));

    // Insert products

    await Product.insertMany(productsWithIds);
    console.log("Products added to DB");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding products", error);
    mongoose.connection.close();
  }
};

seedDatabase();
