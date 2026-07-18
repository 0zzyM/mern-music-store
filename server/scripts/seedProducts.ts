import mongoose from "mongoose";
import Product, { ProductDoc } from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Brand from "../models/brandModel.js";

import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

const IMAGE_RESIZE_OPTIONS = "h_1080,c_scale,q_auto,f_auto";

// These keys have a default value in the model if no data is passed by the script they will be defaulted to the value given to mongoose
// If I don't pass them as optional TS will throw errs
type DefaultedKeys =
  | "amountSold"
  | "reviewCount"
  | "rating"
  | "isOnSale"
  | "isActive"
  | "isFeatured"
  | "discountAmount"
  | "details"
  | "description";

// ! CHAOTIC HERE A BIT
// Take Produc Doc remove brand category subcategory etc.
// To make defaulted keys optional have choosen them via Pick and turned them to optional via Patrial
// and Slug fields were added at the end
// had to remove Defaulted keys from Omit otherwise required wins over optional from patrial
type ProductPreSeed = Omit<
  ProductDoc,
  | "createdAt"
  | "updatedAt"
  | "brand"
  | "category"
  | "subcategory"
  | DefaultedKeys
> &
  Partial<Pick<ProductDoc, DefaultedKeys>> & {
    brandSlug: string;
    categorySlug: string;
    subcategorySlug: string;
  };

type ProductSeed = Omit<ProductDoc, "createdAt" | "updatedAt" | DefaultedKeys> &
  Partial<Pick<ProductDoc, DefaultedKeys>>;

const products: ProductPreSeed[] = [
  {
    name: "Jackson American Series Soloist™ SL2MG",
    brandSlug: "jackson",
    images: [
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781603658/2802501820_jac_ins_frt_1_rr_g64vyw.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781603658/2802501820_jac_ins_bck_1_rl_enymrk.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781603659/2802501820_jac_ins_cbr_1_nr_qoexns.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781603659/2802501820_jac_ins_fbd_1_nr_xhrfms.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781603658/2802501820_jac_ins_hft_1_nr_jwpwj7.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781603658/2802501820_jac_ins_hbk_1_nr_ocpdju.png`,
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
    rating: 4,
    reviewCount: 4,
    amountSold: 12,
    description:
      "The American Series Soloist SL2MG HT is Jackson's flagship metal guitar, hand-built in Corona, California. Its through-body three-piece maple neck construction delivers extended sustain and rock-solid stability, while the compound-radius ebony fingerboard and 24 jumbo stainless steel frets enable fast, expressive playing across the entire neck. The EMG 81/85 active pickup pairing covers tight modern metal rhythm tones through the bridge and articulate, harmonically rich lead voicings from the neck. Equipped with a Hipshot fixed bridge, Gotoh locking tuners, and a Jackson Foam-Core hardshell case, it's a high-performance instrument built for serious players.",
  },
  {
    name: "Jackson JS Series Dinky JS32 DKAP",
    brandSlug: "jackson",
    images: [
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781889548/2918824557_jac_ins_frt_1_rr_pbg7y2.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781889547/2918824557_jac_ins_bck_1_rl_p7znrh.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781889549/2918824557_jac_ins_cbr_1_nr_blsugi.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781889550/2918824557_jac_ins_fbd_1_nr_wxz4oe.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781889547/2918824557_jac_ins_hft_1_nr_kavvgj.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781889548/2918824557_jac_ins_hbk_1_nr_afjf50.png`,
    ],
    price: 449,
    stock: 10,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: false,
    details: {
      bodyMaterial: "Poplar",
      bodyFinish: "Gloss",
      neckConstruction: "Bolt-On",
      neckMaterial: "Maple",
      fingerboardMaterial: "Amaranth",
      frets: "24, Jumbo",
      scaleLength: '25.5" (648mm)',
      pickupConfiguration: "HH",
      bridgePickup: "Jackson High-Output Humbucker",
      neckPickup: "Jackson High-Output Humbucker",
      controls: "Volume, Tone, 3-Way Toggle",
      bridge: "Floyd Rose Licensed Double-Locking Tremolo",
      tuners: "Die-Cast",
      hardwareFinish: "Black",
      countryOfOrigin: "Indonesia",
    },
    rating: 4,
    reviewCount: 5,
    amountSold: 5,
    description:
      "A fast-playing JS Series Dinky with a compound-radius fingerboard, dual high-output humbuckers, and a Floyd Rose tremolo system built for aggressive modern playing.",
  },

  {
    name: "Jackson X Series Soloist SLX DX",
    brandSlug: "jackson",
    images: [
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890019/2919904568_gtr_frt_001_rr_lpbelf.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890019/2919904568_gtr_bck_001_rl_s9xmwi.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890020/2919904568_gtr_frtangleright_001_rr_etdfxu.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890020/2919904568_gtr_frtangleleft_001_rr_ho5qlz.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890021/2919904568_gtr_frtbdydtl_001_nr_lxbw2t.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890023/2919904568_gtr_hdstckfrt_001_nr_ywolxs.png`,
    ],
    price: 899,
    stock: 7,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {
      bodyMaterial: "Poplar",
      bodyFinish: "Gloss",
      neckConstruction: "Neck-Through Body",
      neckMaterial: "3-Piece Maple",
      fingerboardMaterial: "Laurel",
      frets: "24, Jumbo",
      scaleLength: '25.5" (648mm)',
      pickupConfiguration: "HH",
      bridgePickup: "Seymour Duncan Distortion",
      neckPickup: "Seymour Duncan Distortion",
      controls: "Volume, Tone, 3-Way Toggle",
      bridge: "Floyd Rose Special Double-Locking Tremolo",
      tuners: "Jackson Sealed Die-Cast",
      hardwareFinish: "Black",
      countryOfOrigin: "Indonesia",
    },
    rating: 4,
    reviewCount: 5,
    amountSold: 15,
    description:
      "A neck-through Soloist designed for speed and sustain, featuring Seymour Duncan pickups and a Floyd Rose tremolo for expressive modern lead and rhythm work.",
  },

  {
    name: "Jackson JS Series Dinky JS12",
    brandSlug: "jackson",
    images: [
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890695/2910112503_gtr_frt_001_rr_d9rznx.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890694/2910112503_gtr_back_001_rl_eqngcl.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890696/2910112503_gtr_cntbdyright_001_nr_fsiyqw.png`,
    ],
    price: 199,
    stock: 15,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {
      bodyMaterial: "Poplar",
      bodyFinish: "Gloss",
      neckConstruction: "Bolt-On",
      neckMaterial: "Maple",
      fingerboardMaterial: "Amaranth",
      frets: "22, Jumbo",
      scaleLength: '25.5" (648mm)',
      pickupConfiguration: "HH",
      bridgePickup: "Jackson High-Output Humbucker",
      neckPickup: "Jackson High-Output Humbucker",
      controls: "Volume, Tone, 3-Way Toggle",
      bridge: "Hardtail Fixed Bridge",
      tuners: "Die-Cast",
      hardwareFinish: "Chrome",
      countryOfOrigin: "Indonesia",
    },
    rating: 3.8,
    reviewCount: 80,
    amountSold: 120,
    description:
      "An entry-level Dinky built for beginners, offering simple controls, dual humbuckers, and solid tuning stability for learning rock and metal fundamentals.",
  },

  {
    name: "Jackson X Series Rhoads RRX24",
    brandSlug: "jackson",
    images: [
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890911/2913636503_gtr_frt_001_rr_s6dvaj.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890909/2913636503_gtr_back_001_rl_pqubkz.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890914/2913636503_gtr_frtbdydtl_001_nr_aj6ftn.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890997/2913636503_gtr_hdstckfrt_001_nr_tywb9b.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890997/2913636503_gtr_hdstckfrt_001_nr_tywb9b.png`,
      `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1781890917/2913636503_gtr_hdstckbck_001_nr_l1itcl.png`,
    ],
    price: 1299,
    stock: 4,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {
      bodyMaterial: "Poplar",
      bodyFinish: "Gloss",
      neckConstruction: "Neck-Through Body",
      neckMaterial: "3-Piece Maple",
      fingerboardMaterial: "Laurel",
      frets: "24, Jumbo",
      scaleLength: '25.5" (648mm)',
      pickupConfiguration: "HH",
      bridgePickup: "Seymour Duncan Distortion",
      neckPickup: "Seymour Duncan Distortion",
      controls: "Volume, Tone, 3-Way Toggle",
      bridge: "Floyd Rose Special Tremolo",
      tuners: "Sealed Die-Cast",
      hardwareFinish: "Black",
      countryOfOrigin: "Indonesia",
    },
    rating: 4.5,
    reviewCount: 0,
    amountSold: 0,
    description:
      "A sharp-edged Rhoads model built for metal players, featuring neck-through construction, Seymour Duncan pickups, and a Floyd Rose tremolo system.",
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
    const categoryMap: Record<string, mongoose.Types.ObjectId> = {};
    categories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    //Sub-Categories
    const subcategories = await Subcategory.find({});
    const subcategoryMap: Record<string, mongoose.Types.ObjectId> = {};
    subcategories.forEach((subcat) => {
      subcategoryMap[subcat.slug] = subcat._id;
    });

    //Brands
    const brands = await Brand.find({});
    const brandMap: Record<string, mongoose.Types.ObjectId> = {};
    brands.forEach((brand) => {
      brandMap[brand.slug] = brand._id;
    });

    const productsWithIds: ProductSeed[] = products.map((product) => ({
      name: product.name,
      brand: brandMap[product.brandSlug],
      images: product.images,
      price: product.price,
      stock: product.stock,
      category: categoryMap[product.categorySlug],
      subcategory: subcategoryMap[product.subcategorySlug],
      isFeatured: product.isFeatured,
      amountSold: product.amountSold,
      discountAmount: product.discountAmount,
      isOnSale: product.isOnSale,
      details: product.details,
      description: product.description,
      rating: product.rating,
      reviewCount: product.reviewCount,
      isActive: product.isActive,
    }));

    // Insert products

    await Product.insertMany(productsWithIds);
    console.log("Products added to DB");
  } catch (error) {
    console.error("Error adding products", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
