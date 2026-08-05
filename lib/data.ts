export const professor = {
  name: "Prof. Dr. Ahmad, S.E., M.Si.",
  nameShort: "Prof. Dr. Ahmad",
  nameDisplay: "Ahmad",
  title: "Rektor Universitas Lambung Mangkurat",
  titleEn: "Rector, Universitas Lambung Mangkurat",
  university: "Universitas Lambung Mangkurat",
  universityShort: "ULM",
  department: "Fakultas Ekonomi dan Bisnis",
  email: "ahmadalimbachri@ulm.ac.id",
  phone: "0811-4190-8478",
  address: "Jalan Perdagangan Komplek Perdagangan Permai 2 No. 27 Kayu Tangi, Banjarmasin 70123",
  birthplace: "Pangluburan – Enrekang",
  birthdate: "31 Desember 1967",
  researchInterests: [
    "Manajemen Sumber Daya Manusia",
    "Kepemimpinan Transformasional",
    "Ekonomi Pembangunan",
    "Digital Payment & Fintech",
    "Perilaku Organisasi",
  ],
  bio: "Prof. Dr. Ahmad, S.E., M.Si. adalah akademisi senior dan pemimpin pendidikan tinggi berpengalaman yang saat ini menjabat sebagai Rektor Universitas Lambung Mangkurat. Dengan pengalaman lebih dari tiga dekade di bidang pendidikan, penelitian, dan pengabdian masyarakat, beliau telah memberikan kontribusi signifikan terhadap pengembangan ilmu manajemen dan ekonomi di Kalimantan Selatan.",
  bioEn: "Prof. Dr. Ahmad, S.E., M.Si. is a senior academic and experienced higher education leader currently serving as the Rector of Universitas Lambung Mangkurat. With more than three decades of experience in education, research, and community service, he has made significant contributions to the development of management and economics in South Kalimantan.",
};

export interface Education {
  degree: string;
  degreeEn: string;
  institution: string;
  location: string;
  faculty: string;
  major: string;
  year: number;
}

export const education: Education[] = [
  {
    degree: "S1 (Sarjana)",
    degreeEn: "Bachelor's Degree",
    institution: "Universitas Hasanuddin",
    location: "Makassar",
    faculty: "Fakultas Ekonomi",
    major: "Jurusan Manajemen",
    year: 1991,
  },
  {
    degree: "S2 (Magister)",
    degreeEn: "Master's Degree",
    institution: "Universitas Hasanuddin",
    location: "Makassar",
    faculty: "Fakultas Ekonomi",
    major: "Jurusan Manajemen",
    year: 1999,
  },
  {
    degree: "S3 (Doktor)",
    degreeEn: "Doctoral Degree",
    institution: "Universitas Hasanuddin",
    location: "Makassar",
    faculty: "Fakultas Ekonomi",
    major: "Jurusan Manajemen",
    year: 2007,
  },
];

export interface Award {
  title: string;
  issuer: string;
  year: number;
  description?: string;
}

export const awards: Award[] = [
  {
    title: "Dosen Berprestasi Peringkat Satu",
    issuer: "Fakultas Ekonomi Unlam Banjarmasin",
    year: 2003,
    description: "Penghargaan tertinggi bagi dosen berprestasi di Fakultas Ekonomi Universitas Lambung Mangkurat.",
  },
  {
    title: "Gelar Kehormatan Datu Natawarga Laksana (DNWL)",
    issuer: "Kesultanan Banjar",
    year: 2021,
    description: "Gelar kehormatan atas peranan dalam mengayomi dan membina kerukunan hubungan Suku Bangsa (Bugis - Banjar) dengan masyarakat etnis lainnya di Banua Banjar.",
  },
  {
    title: "Penghargaan Dedikasi Pendidikan Tinggi",
    issuer: "Dewan Perwakilan Rakyat Daerah Kalimantan Selatan",
    year: 2025,
    description: "Penghargaan atas dedikasi, komitmen, dan kontribusi nyata dalam memajukan pendidikan tinggi, memperkuat bidang riset, serta memperluas pengabdian masyarakat di wilayah Kalimantan Selatan.",
  },
];

export interface Experience {
  period: string;
  startYear: number;
  endYear: number | null;
  role: string;
  organization: string;
  location?: string;
  category: "academic" | "leadership" | "government" | "industry";
}

export const experience: Experience[] = [
  {
    period: "1992 – 1993",
    startYear: 1992,
    endYear: 1993,
    role: "Marketing Executive",
    organization: "PT Rachmat Purnama Sari",
    location: "Balikpapan",
    category: "industry",
  },
  {
    period: "1994 – 1997",
    startYear: 1994,
    endYear: 1997,
    role: "General Manager",
    organization: "PT. Kalimantan Tata Satwa",
    location: "Banjarmasin",
    category: "industry",
  },
  {
    period: "1995 – Sekarang",
    startYear: 1995,
    endYear: null,
    role: "Dosen Jurusan Manajemen",
    organization: "Fakultas Ekonomi Universitas Lambung Mangkurat",
    location: "Banjarmasin",
    category: "academic",
  },
  {
    period: "2000 – 2002",
    startYear: 2000,
    endYear: 2002,
    role: "Kepala Bidang Akademik Program Ekstensi",
    organization: "FEB ULM",
    location: "Banjarmasin",
    category: "academic",
  },
  {
    period: "2001 – 2002",
    startYear: 2001,
    endYear: 2002,
    role: "Staf Ahli BAPPEDA",
    organization: "Provinsi Kalimantan Selatan – Pengembangan Kawasan Andalan",
    location: "Banjarmasin",
    category: "government",
  },
  {
    period: "2002 – 2004",
    startYear: 2002,
    endYear: 2004,
    role: "Kepala Divisi Pendidikan dan Pelatihan",
    organization: "Lembaga Manajemen FEB ULM",
    location: "Banjarmasin",
    category: "academic",
  },
  {
    period: "2002 – 2004",
    startYear: 2002,
    endYear: 2004,
    role: "Ketua Jurusan Manajemen",
    organization: "Fakultas Ekonomi Universitas Lambung Mangkurat",
    location: "Banjarmasin",
    category: "leadership",
  },
  {
    period: "2002 – 2007",
    startYear: 2002,
    endYear: 2007,
    role: "Ketua Dewan Redaksi",
    organization: "Jurnal Ekonomi Pembangunan Manajemen dan Akuntansi FEB ULM",
    location: "Banjarmasin",
    category: "academic",
  },
  {
    period: "2007 – 2020",
    startYear: 2007,
    endYear: 2020,
    role: "Wakil Ketua",
    organization: "Lembaga Mitra Pembangunan Daerah Makassar",
    location: "Makassar",
    category: "leadership",
  },
  {
    period: "2011 – 2014",
    startYear: 2011,
    endYear: 2014,
    role: "Ketua Lembaga Penelitian dan Pengabdian Masyarakat",
    organization: "Universitas Lambung Mangkurat",
    location: "Banjarmasin",
    category: "leadership",
  },
  {
    period: "2012 – 2014",
    startYear: 2012,
    endYear: 2014,
    role: "Tenaga Ahli",
    organization: "Dewan Perwakilan Rakyat Daerah Kabupaten Kotabaru",
    location: "Kotabaru",
    category: "government",
  },
  {
    period: "2013 – 2014",
    startYear: 2013,
    endYear: 2014,
    role: "Tenaga Ahli",
    organization: "Dewan Perwakilan Rakyat Daerah Kabupaten Banjar",
    location: "Kabupaten Banjar",
    category: "government",
  },
  {
    period: "2014 – 2017",
    startYear: 2014,
    endYear: 2017,
    role: "Wakil Direktur PIU IDB",
    organization: "Universitas Lambung Mangkurat",
    location: "Banjarmasin",
    category: "leadership",
  },
  {
    period: "2014 – 2018",
    startYear: 2014,
    endYear: 2018,
    role: "Wakil Rektor I",
    organization: "Universitas Lambung Mangkurat",
    location: "Banjarmasin",
    category: "leadership",
  },
  {
    period: "2022 – Sekarang",
    startYear: 2022,
    endYear: null,
    role: "Rektor",
    organization: "Universitas Lambung Mangkurat",
    location: "Banjarmasin",
    category: "leadership",
  },
];

export interface Organization {
  period: string;
  startYear: number;
  endYear: number | null;
  role: string;
  name: string;
  location?: string;
}

export const organizations: Organization[] = [
  {
    period: "2004 – Sekarang",
    startYear: 2004,
    endYear: null,
    role: "Dewan Pakar",
    name: "KKSS BPW Kalimantan Selatan",
    location: "Kalimantan Selatan",
  },
  {
    period: "2005 – Sekarang",
    startYear: 2005,
    endYear: null,
    role: "Ketua",
    name: "Yayasan Ratu Indonesia",
    location: "Makassar",
  },
  {
    period: "2008 – Sekarang",
    startYear: 2008,
    endYear: null,
    role: "Wakil Ketua",
    name: "Kerukunan Keluarga Sulawesi Selatan (KKSS) BPW Kalimantan Selatan",
    location: "Kalimantan Selatan",
  },
  {
    period: "2008 – Sekarang",
    startYear: 2008,
    endYear: null,
    role: "Ketua DPW",
    name: "HIKMA Kalimantan Selatan",
    location: "Kalimantan Selatan",
  },
  {
    period: "2008 – Sekarang",
    startYear: 2008,
    endYear: null,
    role: "Ketua Dewan Redaksi",
    name: "Jurnal Ekonomi Pembangunan, Manajemen & Akuntansi FEB ULM",
    location: "Banjarmasin",
  },
  {
    period: "2010 – 2015",
    startYear: 2010,
    endYear: 2015,
    role: "Anggota",
    name: "Dewan Riset Daerah Provinsi Kalimantan Selatan",
    location: "Kalimantan Selatan",
  },
  {
    period: "2010 – Sekarang",
    startYear: 2010,
    endYear: null,
    role: "Sekretaris Dewan Penasehat",
    name: "KAHMI Kalimantan",
    location: "Kalimantan",
  },
  {
    period: "2012 – 2016",
    startYear: 2012,
    endYear: 2016,
    role: "Wakil Ketua",
    name: "Forum Peduli Banua Kalimantan",
    location: "Kalimantan",
  },
  {
    period: "2012 – 2016",
    startYear: 2012,
    endYear: 2016,
    role: "Ketua Dewan Pakar",
    name: "Majelis Ekonomi Muhammadiyah PWM Kalimantan Selatan",
    location: "Kalimantan Selatan",
  },
  {
    period: "2015 – Sekarang",
    startYear: 2015,
    endYear: null,
    role: "Dewan Pakar",
    name: "ICMI Kalimantan Selatan",
    location: "Kalimantan Selatan",
  },
  {
    period: "2016 – Sekarang",
    startYear: 2016,
    endYear: null,
    role: "Ketua",
    name: "IKA Unhas Kalimantan Selatan",
    location: "Kalimantan Selatan",
  },
  {
    period: "2022 – 2027",
    startYear: 2022,
    endYear: 2027,
    role: "Dewan Kehormatan",
    name: "PMI Kalimantan Selatan",
    location: "Kalimantan Selatan",
  },
  {
    period: "2023 – 2025",
    startYear: 2023,
    endYear: 2025,
    role: "Ketua",
    name: "Konsorsium PTN – KTI",
    location: "Indonesia",
  },
  {
    period: "2023 – 2028",
    startYear: 2023,
    endYear: 2028,
    role: "Dewan Kehormatan Kepengurusan",
    name: "DHD Badan Pembudayaan Kejuangan 45 Provinsi Kalimantan Selatan",
    location: "Kalimantan Selatan",
  },
  {
    period: "2025 – 2026",
    startYear: 2025,
    endYear: 2026,
    role: "Ketua Pokja Ekonomi, Keuangan dan Moneter",
    name: "Forum Rektor Indonesia",
    location: "Indonesia",
  },
];

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  type: "international" | "national" | "conference";
  indexing?: string;
  volume?: string;
}

export const publications: Publication[] = [
  {
    id: "pub-1",
    title: "Analyzing Influence Factors of Consumers Switching Intentions from Cash Payments to Quick Response Code Indonesian Standard (QRIS) Digital Payments",
    authors: ["Ahmad Alim Bachri", "Mutia Maulida", "Yuslena Sari", "Sunardi Sunardi"],
    journal: "International Journal of Financial Studies",
    year: 2025,
    type: "international",
    indexing: "Q2",
  },
  {
    id: "pub-2",
    title: "From dormitory walls to moral worlds: empowering educators as moral architects in Indonesian boarding-based madrasahs",
    authors: ["Halimatussa'diyah", "Ahmad Suriansyah", "Ahmad Alim Bachri", "Sulistiyana Sulistiyana"],
    journal: "Jurnal Eduissance",
    year: 2025,
    type: "national",
    indexing: "SINTA 2",
  },
  {
    id: "pub-3",
    title: "A Phenomenological Perspective on Happiness at Work and Work Productivity Among Gerindra Party Members at The DPC Tanah Laut Regency",
    authors: ["Muhammad Alpiya Rakhman", "Ahmad Alim Bachri", "Hastin Umi Anisah"],
    journal: "The Journal of Academic Science",
    year: 2025,
    type: "international",
  },
  {
    id: "pub-4",
    title: "The Role of the Community and Parents in Preventing and Protecting Children from Physical and Verbal Bullying in the School Environment for a Better Future",
    authors: ["Yenny Nurul Wulandari", "Ahmad Suriansyah", "Ahmad Alim Bachri"],
    journal: "2nd International Conference on Environmental Learning Educational Technologies (ICELET 2024)",
    year: 2024,
    type: "conference",
  },
  {
    id: "pub-5",
    title: "Empowering Teachers Through Continuous Professional Development: How an Empowerment-Oriented School Culture Strengthens Teacher Professionalism?",
    authors: ["M Mujiyat", "A Suriansyah", "AA Bachri", "A Aslamiah"],
    journal: "Jurnal Eduscience",
    year: 2024,
    type: "national",
    indexing: "SINTA 2",
    volume: "Vol. 13, No. 1, pp. 303–319",
  },
  {
    id: "pub-6",
    title: "The Effect of Transformational Leadership, Organisational Culture and Work Placement on Army Personnel's Work Discipline and Performance",
    authors: ["Ari Aryanto", "Ahmad Alim Bachri", "Ahmad Rifani", "Rini Rahmawati"],
    journal: "SA Journal of Human Resource Management",
    year: 2026,
    type: "international",
    indexing: "Q2",
  },
];

export interface ExpertContribution {
  id: string;
  title: string;
  event: string;
  location: string;
  year: number;
  role: string;
  category: "policy" | "academic" | "government" | "public";
}

export const expertContributions: ExpertContribution[] = [
  {
    id: "ec-1",
    title: "Narasumber Rakernas INTELKAM",
    event: "Rapat Kerja Nasional INTELKAM",
    location: "Banjarmasin",
    year: 2022,
    role: "Narasumber",
    category: "government",
  },

  {
    id: "ec-3",
    title: "Narasumber Forum Komunikasi Publik Pemajuan Iptek",
    event: "Forum Komunikasi Publik Penyusunan Dokumen Rencana Induk dan Peta Jalan Pemajuan Iptek Kota Banjarmasin",
    location: "Banjarmasin",
    year: 2023,
    role: "Narasumber",
    category: "public",
  },
  {
    id: "ec-4",
    title: "Narasumber Seminar Regional Kebudayaan Kalimantan",
    event: "Seminar Regional \"Merawat Adat dan Kebudayaan Kalimantan dalam Perubahan Zaman dalam rangka Meneguhkan Keragaman Etnik dan Budaya dalam ke-Indonesiaan\"",
    location: "Banjarmasin",
    year: 2023,
    role: "Narasumber",
    category: "public",
  },
  {
    id: "ec-5",
    title: "Narasumber FGD Valuasi Hasil Penelitian Perguruan Tinggi",
    event: "Focus Group Discussion (FGD) Valuasi dan Hilirisasi Hasil Penelitian Perguruan Tinggi",
    location: "Banjarmasin",
    year: 2024,
    role: "Narasumber",
    category: "academic",
  },
  {
    id: "ec-6",
    title: "Panelis Debat PILKADA Kalimantan Selatan",
    event: "Debat PILKADA Provinsi Kalimantan Selatan",
    location: "Kalimantan Selatan",
    year: 2024,
    role: "Panelis",
    category: "policy",
  },
  {
    id: "ec-7",
    title: "Tim Ahli Digital Leadership POLRI DIGREG 35",
    event: "Pendalaman Materi Digital Leadership Sekolah Staf dan Pimpinan Tinggi Polri DIGREG 35",
    location: "Indonesia",
    year: 2025,
    role: "Tim Ahli",
    category: "government",
  },
  {
    id: "ec-8",
    title: "Narasumber Rakernas Asosiasi Masjid Kampus Indonesia",
    event: "Rapat Kerja Nasional Asosiasi Masjid Kampus Indonesia",
    location: "Malang",
    year: 2025,
    role: "Narasumber",
    category: "academic",
  },
  {
    id: "ec-9",
    title: "Narasumber Simposium Nasional Kependudukan",
    event: "Simposium Nasional Kependudukan",
    location: "Padang",
    year: 2025,
    role: "Narasumber",
    category: "policy",
  },
  {
    id: "ec-10",
    title: "Narasumber MUSRENBANG Kabupaten Hulu Sungai Utara",
    event: "Musyawarah Perencanaan Pembangunan (MUSRENBANG) Kabupaten Hulu Sungai Utara",
    location: "Hulu Sungai Utara",
    year: 2026,
    role: "Narasumber",
    category: "government",
  },
  {
    id: "ec-11",
    title: "Narasumber Monitoring Program Direktif Presiden bersama DPR RI",
    event: "Monitoring dan Evaluasi Pelaksanaan Program Direktif Presiden bersama Komisi II DPR RI Batch III",
    location: "Kalimantan Selatan",
    year: 2026,
    role: "Narasumber",
    category: "government",
  },
  {
    id: "ec-12",
    title: "Narasumber Diskusi Tata Kelola Pendidikan Dokter Spesialis",
    event: "Diskusi Tata Kelola Pendidikan Dokter Spesialis dan Rumah Sakit Pendidikan",
    location: "Yogyakarta",
    year: 2026,
    role: "Narasumber",
    category: "policy",
  },
];

export const stats = [
  { label: "Tahun Pengalaman", value: 31, suffix: "+" },
  { label: "Publikasi Riset", value: 6, suffix: "+" },
  { label: "Jabatan Kepemimpinan", value: 15, suffix: "+" },
  { label: "Penghargaan", value: 3, suffix: "" },
];

export type SocialPlatformKey =
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "threads"
  | "x"
  | "snackvideo";

export interface SocialPlatform {
  platform: SocialPlatformKey;
  url: string;
}

export interface SocialAccount {
  id: string;
  name: string;
  handle: string;
  email?: string;
  description: string;
  image: string;
  platforms: SocialPlatform[];
}

export const socialAccounts: SocialAccount[] = [
  {
    id: "real",
    name: "Real",
    handle: "@realprofahmadab",
    email: "realprofahmadab@gmail.com",
    description: "Akun media sosial utama & personal.",
    image: "/accounts/real.png",
    platforms: [
      { platform: "instagram",  url: "https://www.instagram.com/realprofahmadab" },
      { platform: "youtube",    url: "https://youtube.com/@realprofahmadab" },
      { platform: "facebook",   url: "https://www.facebook.com/share/19DdUn1tt3/" },
      { platform: "tiktok",     url: "https://tiktok.com/@real.prof.ahmad.a" },
      { platform: "threads",    url: "https://www.threads.com/@realprofahmadab" },
      { platform: "x",          url: "https://x.com/RealProfAhmadab" },
      { platform: "snackvideo", url: "https://s.snackvideo.com/u/@realprofahmada/vjCF8UhA" },
    ],
  },
  {
    id: "tv",
    name: "TV",
    handle: "@profahmadabtv",
    email: "profahmadabtv@gmail.com",
    description: "Konten video dan siaran televisi.",
    image: "/accounts/tv.png",
    platforms: [
      { platform: "instagram",  url: "https://www.instagram.com/profahmadabtv" },
      { platform: "youtube",    url: "https://youtube.com/@profahmadabtv" },
      { platform: "facebook",   url: "https://www.facebook.com/share/14jjpnRSp13/" },
      { platform: "tiktok",     url: "https://www.tiktok.com/@profahmad.abtv" },
      { platform: "threads",    url: "https://www.threads.com/@profahmadabtv" },
      { platform: "x",          url: "https://x.com/ProfAhmadabtv" },
      { platform: "snackvideo", url: "https://s.snackvideo.com/u/@profahmadabtv/dVDWt84o" },
    ],
  },
  {
    id: "official",
    name: "Official",
    handle: "@profahmadabofficial",
    email: "profahmadabofficial@gmail.com",
    description: "Kanal komunikasi resmi.",
    image: "/accounts/official.png",
    platforms: [
      { platform: "instagram",  url: "https://www.instagram.com/profahmadabofficial" },
      { platform: "youtube",    url: "https://youtube.com/@profahmadabofficial" },
      { platform: "facebook",   url: "https://www.facebook.com/share/1bYqafskUn/" },
      { platform: "tiktok",     url: "https://tiktok.com/@prof.ahmad.ab.off" },
      { platform: "threads",    url: "https://www.threads.com/@profahmadabofficial" },
      { platform: "x",          url: "https://x.com/ProfAhmadAb" },
      { platform: "snackvideo", url: "https://s.snackvideo.com/u/@profahmadaboff/u3xXad8E" },
    ],
  },
  {
    id: "id",
    name: "ID",
    handle: "@profahmadabid",
    description: "Kanal komunitas Indonesia.",
    image: "/accounts/id.png",
    platforms: [
      { platform: "instagram",  url: "https://www.instagram.com/profahmadabid" },
      { platform: "youtube",    url: "https://youtube.com/@profahmadabid" },
      { platform: "facebook",   url: "https://www.facebook.com/share/1CseskbjhH/" },
      { platform: "tiktok",     url: "https://tiktok.com/@prof.ahmad.ab.id" },
      { platform: "threads",    url: "https://www.threads.com/@profahmadabid" },
      { platform: "x",          url: "https://x.com/ProfahmadAbId" },
      { platform: "snackvideo", url: "https://s.snackvideo.com/u/@profahmadabid/duuFsxmz" },
    ],
  },
];
