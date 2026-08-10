import { config } from "dotenv";
import { resolve } from "path";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  categories,
  posts,
  siteSettings,
  faqs,
  testimonials,
} from "../db/schema";

config({ path: resolve(__dirname, "../.env") });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("🌱 Seeding database...\n");

  // 1. Categories
  console.log("📁 Creating categories...");
  const categoryData = [
    { name: "Berita Kampus", slug: "berita-kampus" },
    { name: "Penelitian", slug: "penelitian" },
    { name: "Pengabdian Masyarakat", slug: "pengabdian-masyarakat" },
    { name: "Penghargaan", slug: "penghargaan" },
    { name: "Kegiatan", slug: "kegiatan" },
  ];

  for (const cat of categoryData) {
    try {
      await db.insert(categories).values(cat).onConflictDoNothing();
      console.log(`  ✅ ${cat.name}`);
    } catch (e: any) {
      console.log(`  ⚠️  ${cat.name} (might already exist)`);
    }
  }

  // 2. Site Settings (from professor data)
  console.log("\n⚙️  Creating site settings...");
  try {
    await db
      .insert(siteSettings)
      .values({
        id: 1,
        siteName: "Prof. Dr. Ahmad, S.E., M.Si.",
        siteDescription:
          "Rektor Universitas Lambung Mangkurat - Profil Akademik dan Portofolio",
        phone: "0811-4190-8478",
        email: "ahmadalimbachri@ulm.ac.id",
        address:
          "Jalan Perdagangan Komplek Perdagangan Permai 2 No. 27 Kayu Tangi, Banjarmasin 70123",
        whatsapp: "6281141908478",
        donationInfo:
          "Silakan hubungi kami untuk informasi donasi lebih lanjut.",
        bankName: "",
        bankAccountNumber: "",
        bankAccountName: "",
      })
      .onConflictDoUpdate({
        target: siteSettings.id,
        set: {
          siteName: "Prof. Dr. Ahmad, S.E., M.Si.",
          siteDescription:
            "Rektor Universitas Lambung Mangkurat - Profil Akademik dan Portofolio",
          phone: "0811-4190-8478",
          email: "ahmadalimbachri@ulm.ac.id",
          address:
            "Jalan Perdagangan Komplek Perdagangan Permai 2 No. 27 Kayu Tangi, Banjarmasin 70123",
          whatsapp: "6281141908478",
        },
      });
    console.log("  ✅ Site settings created/updated");
  } catch (e: any) {
    console.log("  ⚠️  Site settings (might already exist)");
  }

  // 3. Sample Posts (from publications)
  console.log("\n📝 Creating sample posts...");
  const postData = [
    {
      title: "Analisis Faktor-Faktor yang Mempengaruhi Niat Beralih Konsumen dari Pembayaran Tunai ke Pembayaran Digital QRIS",
      slug: "analisis-faktor-niat-beralih-qris",
      excerpt:
        "Penelitian ini menganalisis faktor-faktor yang mempengaruhi niat beralih konsumen dari pembayaran tunai ke pembayaran digital QRIS (Quick Response Code Indonesian Standard).",
      content:
        "<p>Penelitian ini menganalisis faktor-faktor yang mempengaruhi niat beralih konsumen dari pembayaran tunai ke pembayaran digital QRIS (Quick Response Code Indonesian Standard). Publikasi ini diterbitkan di International Journal of Financial Studies dengan indeks Q2.</p>",
      status: "published",
      categorySlug: "penelitian",
    },
    {
      title: "Pemberdayaan Guru melalui Pengembangan Profesional Berkelanjutan",
      slug: "pemberdayaan-guru-pengembangan-profesional",
      excerpt:
        "Bagaimana budaya sekolah yang berorientasi pada pemberdayaan memperkuat profesionalisme guru.",
      content:
        "<p>Penelitian ini membahas bagaimana budaya sekolah yang berorientasi pada pemberdayaan dapat memperkuat profesionalisme guru melalui pengembangan profesi berkelanjutan. Diterbitkan di Jurnal Eduscience dengan indeks SINTA 2.</p>",
      status: "published",
      categorySlug: "penelitian",
    },
    {
      title: "Narasumber Monitoring Program Direktif Presiden bersama DPR RI",
      slug: "narasumber-monitoring-program-direktif-presiden",
      excerpt:
        "Menjadi narasumber dalam kegiatan Monitoring dan Evaluasi Pelaksanaan Program Direktif Presiden bersama Komisi II DPR RI.",
      content:
        "<p>Berdikasi dalam kegiatan Monitoring dan Evaluasi Pelaksanaan Program Direktif Presiden bersama Komisi II DPR RI Batch III di Kalimantan Selatan tahun 2026.</p>",
      status: "published",
      categorySlug: "pengabdian-masyarakat",
    },
    {
      title: "Penghargaan Dedikasi Pendidikan Tinggi dari DPRD Kalsel",
      slug: "penghargaan-dedikasi-pendidikan-tinggi-dprd-kalsel",
      excerpt:
        "Penghargaan atas dedikasi, komitmen, dan kontribusi nyata dalam memajukan pendidikan tinggi di Kalimantan Selatan.",
      content:
        "<p>Menerima Penghargaan Dedikasi Pendidikan Tinggi dari Dewan Perwakilan Rakyat Daerah Kalimantan Selatan atas dedikasi, komitmen, dan kontribusi nyata dalam memajukan pendidikan tinggi, memperkuat bidang riset, serta memperluas pengabdian masyarakat di wilayah Kalimantan Selatan.</p>",
      status: "published",
      categorySlug: "penghargaan",
    },
  ];

  // Get category IDs
  const allCategories = await db.select().from(categories);
  const categoryMap = new Map(allCategories.map((c) => [c.slug, c.id]));

  for (const post of postData) {
    try {
      const categoryId = categoryMap.get(post.categorySlug) || null;
      await db
        .insert(posts)
        .values({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          status: post.status,
          categoryId,
          publishedAt: new Date(),
        })
        .onConflictDoNothing();
      console.log(`  ✅ ${post.title.substring(0, 50)}...`);
    } catch (e: any) {
      console.log(`  ⚠️  ${post.title.substring(0, 50)}... (might already exist)`);
    }
  }

  // 4. FAQs
  console.log("\n❓ Creating FAQs...");
  const faqData = [
    {
      question: "Siapa Prof. Dr. Ahmad, S.E., M.Si.?",
      answer:
        "Prof. Dr. Ahmad, S.E., M.Si. adalah akademisi senior dan pemimpin pendidikan tinggi yang saat ini menjabat sebagai Rektor Universitas Lambung Mangkurat. Beliau memiliki pengalaman lebih dari tiga dekade di bidang pendidikan, penelitian, dan pengabdian masyarakat.",
      order: 1,
      status: "published",
    },
    {
      question: "Apa saja bidang penelitian yang digeluti?",
      answer:
        "Bidang penelitian meliputi Manajemen Sumber Daya Manusia, Kepemimpinan Transformasional, Ekonomi Pembangunan, Digital Payment & Fintech, dan Perilaku Organisasi.",
      order: 2,
      status: "published",
    },
    {
      question: "Bagaimana cara menghubungi Prof. Ahmad?",
      answer:
        "Anda dapat menghubungi melalui email ahmadalimbachri@ulm.ac.id atau telepon/WhatsApp ke 0811-4190-8478. Alamat kantor: Jalan Perdagangan Komplek Perdagangan Permai 2 No. 27 Kayu Tangi, Banjarmasin 70123.",
      order: 3,
      status: "published",
    },
    {
      question: "Apa saja penghargaan yang pernah diterima?",
      answer:
        "Beberapa penghargaan antara lain: Dosen Berprestasi Peringkat Satu (2003), Gelar Kehormatan Datu Natawarga Laksana dari Kesultanan Banjar (2021), dan Penghargaan Dedikasi Pendidikan Tinggi dari DPRD Kalimantan Selatan (2025).",
      order: 4,
      status: "published",
    },
  ];

  for (const faq of faqData) {
    try {
      await db.insert(faqs).values(faq).onConflictDoNothing();
      console.log(`  ✅ ${faq.question.substring(0, 50)}...`);
    } catch (e: any) {
      console.log(`  ⚠️  ${faq.question.substring(0, 50)}... (might already exist)`);
    }
  }

  // 5. Testimonials
  console.log("\n💬 Creating testimonials...");
  const testimonialData = [
    {
      name: "Dr. H. Sahbirin Noor",
      role: "Gubernur Kalimantan Selatan",
      content:
        "Prof. Ahmad adalah pemimpin pendidikan yang visioner dan berkomitmen tinggi dalam memajukan pendidikan tinggi di Kalimantan Selatan.",
      featured: true,
      order: 1,
    },
    {
      name: "Prof. Dr. H. Muhammad Hasan",
      role: "Rektor Universitas Hasanuddin",
      content:
        "Sebagai kolega dan senior, Prof. Ahmad telah memberikan kontribusi luar biasa dalam pengembangan ilmu manajemen di Indonesia timur.",
      featured: true,
      order: 2,
    },
    {
      name: "Dewan Perwakilan Rakyat Daerah Kalsel",
      role: "DPRD Kalimantan Selatan",
      content:
        "Penghargaan diberikan atas dedikasi, komitmen, dan kontribusi nyata dalam memajukan pendidikan tinggi, memperkuat bidang riset, serta memperluas pengabdian masyarakat.",
      featured: false,
      order: 3,
    },
  ];

  for (const t of testimonialData) {
    try {
      await db.insert(testimonials).values(t).onConflictDoNothing();
      console.log(`  ✅ ${t.name}`);
    } catch (e: any) {
      console.log(`  ⚠️  ${t.name} (might already exist)`);
    }
  }

  console.log("\n🎉 Seeding completed!");
  console.log("\n📋 Summary:");
  console.log("  - 5 Categories");
  console.log("  - 1 Site Settings");
  console.log("  - 4 Sample Posts");
  console.log("  - 4 FAQs");
  console.log("  - 3 Testimonials");
  console.log("\n🔑 Login credentials:");
  console.log("  URL: /admin/login");
  console.log("  Password: admin123");
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  });
