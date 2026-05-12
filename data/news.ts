export interface NewsArticle {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  thumbnail: string
  content: string
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Produksi Padi Nasional Meningkat 2.1% di Kuartal Pertama 2024',
    category: 'Padi',
    date: '2024-03-15',
    excerpt: 'Badan Pusat Statistik mencatat peningkatan signifikan produksi padi nasional berkat program intensifikasi pertanian.',
    thumbnail: '/images/news/padi-produksi.jpg',
    content: 'Produksi padi nasional pada kuartal pertama 2024 mencatat peningkatan sebesar 2.1% dibandingkan periode yang sama tahun lalu. Peningkatan ini didorong oleh program intensifikasi pertanian yang meliputi penggunaan benih unggul, teknologi irigasi modern, dan pendampingan petani berbasis AI.',
  },
  {
    id: 'news-2',
    title: 'Cuaca Ekstrem La Nina Diprediksi Pengaruhi Musim Tanam 2024',
    category: 'Cuaca',
    date: '2024-03-12',
    excerpt: 'BMKG memperingatkan potensi cuaca ekstrem akibat La Nina yang dapat mempengaruhi jadwal tanam petani di seluruh Indonesia.',
    thumbnail: '/images/news/cuaca-lanina.jpg',
    content: 'BMKG mengeluarkan peringatan dini terkait potensi cuaca ekstrem akibat fenomena La Nina yang diperkirakan aktif mulai April 2024. Petani disarankan untuk menyesuaikan jadwal tanam dan mempersiapkan sistem drainase yang memadai untuk mengantisipasi curah hujan tinggi.',
  },
  {
    id: 'news-3',
    title: 'Startup AgriTech Indonesia Kembangkan Drone Pemantau Lahan',
    category: 'Teknologi',
    date: '2024-03-10',
    excerpt: 'Inovasi drone pertanian buatan anak bangsa mampu memantau kesehatan tanaman dan menyemprot pestisida secara presisi.',
    thumbnail: '/images/news/drone-agritech.jpg',
    content: 'Sebuah startup AgriTech asal Bandung berhasil mengembangkan drone pertanian yang dilengkapi kamera multispektral dan sistem AI untuk memantau kesehatan tanaman secara real-time. Drone ini juga mampu melakukan penyemprotan pestisida secara presisi, mengurangi penggunaan bahan kimia hingga 40%.',
  },
  {
    id: 'news-4',
    title: 'Kementerian Pertanian Luncurkan Platform AI untuk Prediksi Hama',
    category: 'AI Pertanian',
    date: '2024-03-08',
    excerpt: 'Platform berbasis kecerdasan buatan ini mampu memprediksi serangan hama hingga 14 hari ke depan dengan akurasi 85%.',
    thumbnail: '/images/news/ai-hama.jpg',
    content: 'Kementerian Pertanian resmi meluncurkan platform prediksi hama berbasis AI yang mengintegrasikan data cuaca, citra satelit, dan laporan petani. Platform ini dapat memberikan peringatan dini serangan hama hingga 14 hari sebelum terjadi dengan tingkat akurasi mencapai 85%.',
  },
  {
    id: 'news-5',
    title: 'Harga Cabai Melonjak 15% Akibat Gangguan Distribusi',
    category: 'Komoditas',
    date: '2024-03-05',
    excerpt: 'Kenaikan harga cabai terjadi di beberapa pasar tradisional akibat terganggunya rantai distribusi dari sentra produksi.',
    thumbnail: '/images/news/harga-cabai.jpg',
    content: 'Harga cabai rawit dan cabai merah mengalami kenaikan hingga 15% di pasar tradisional Jawa dan Sumatera. Kenaikan ini disebabkan oleh terganggunya distribusi akibat cuaca buruk dan perbaikan infrastruktur jalan di beberapa sentra produksi utama.',
  },
  {
    id: 'news-6',
    title: 'Program Smart Farming Jangkau 500 Desa di Jawa Timur',
    category: 'Teknologi',
    date: '2024-03-01',
    excerpt: 'Program digitalisasi pertanian berhasil menjangkau 500 desa dengan IoT sensor dan aplikasi mobile untuk petani.',
    thumbnail: '/images/news/smart-farming.jpg',
    content: 'Program Smart Farming yang digagas oleh Pemerintah Provinsi Jawa Timur berhasil menjangkau 500 desa. Program ini menyediakan sensor IoT untuk monitoring kelembaban tanah, suhu, dan pH, serta aplikasi mobile yang memudahkan petani dalam mengakses informasi cuaca dan harga pasar.',
  },
]
