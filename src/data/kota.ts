type Kota = {
    id: number;
    name: string;
    image: string;
    url: string;
  };
  
export const listKota: Kota[] = [
    {
        id: 1,
        name: "Bandung",
        image: "https://static.dw.com/image/44565755_605.jpg",
        url: "/hotels/bandung"
    },
    {
        id: 2,
        name: "Jakarta",
        image: "https://cdn1-production-images-kly.akamaized.net/DyvyNu1FgYW6dqPtzCuZk3ak9J4=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1096309/original/041101500_1451368462-Tidak-Liburan-Ke-Luar-Kota-Ide-Staycation-Dan-Liburan-Di-Jakarta-Ini-Akan-Sangat-Membantu-Kalian.jpg",
        url: "/hotels/jakarta"
    },
    {
        id: 3,
        name: "Surabaya",
        image: "https://www.ngopibareng.id/images/imagecache/20200531115454ikon-surabaya.jpg",
        url: "/hotels/surabaya"
    },
    {
        id: 4,
        name: "Bali",
        image: "https://asset.kompas.com/crops/zzu3Up0S3HMcHf3KopYvL0ZOhS0=/0x0:0x0/750x500/data/photo/buku/63a02c9b291fd.jpg",
        url: "/hotels/bali"
    },
    {
        id: 5,
        name: "Yogyakarta",
        image: "https://rajatransindonesia.com/joimg/blog/kegiatan-yang-bisa-dilakukan-bagi-solo-traveler-saat-wisata-di-yogyakarta-116.png",
        url: "/hotels/jogja"
    },
]