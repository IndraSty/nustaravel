import React, { useState } from "react";
import Accordion from "./Accordion";

const Faq = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex flex-col px-3 py-5">
      <h2 className="text-lg font-semibold mb-3">
        Pertanyaan Yang Sering Diajukan
      </h2>
      <Accordion
        title={"Bagaimana cara memesan kamar hotel?"}
        answer={
          "Anda dapat memesan kamar hotel melalui beberapa cara. Pertama, secara manual yaitu datang langsung ke hotel atau melakukan pemesanan melalui telepon. Kedua, bisa dipesan melalui aplikasi booking hotel. Ketiga, Anda juga bisa memesan melalui web resmi hotel."
        }
      />
      <Accordion
        title={"Berapa harga tempat tidur tambahan?"}
        answer={
          "Harga tempat tidur tambahan atau extra bed di hotel beragam, tergantung pada hotel tempat Anda menginap567. Beberapa hotel mungkin menetapkan biaya sekitar Rp350.000 per orang atau bisa lebih7. Ada juga hotel yang menawarkan tarif mulai dari Rp 50.000, Rp 180.000, hingga Rp 500.000 dengan tambahan fasilitas sarapan gratis."
        }
      />
      <Accordion
        title={"Bagaimana mendapatkan voucher hotel?"}
        answer={
          "Anda dapat mendapatkan voucher hotel melalui beberapa cara891011. Pertama, Anda bisa mengikuti media sosial hotel yang dituju10. Kedua, berlangganan via agen perjalanan online atau OTA10. Ketiga, memanfaatkan event tertentu dari hotel10. Keempat, Anda juga dapat menggunakan voucher diskon dari situs penyedia voucher."
        }
      />
      <Accordion
        title={"Apa kebijakan pembatalan hotel?"}
        answer={
          "Kebijakan pembatalan hotel biasanya memberikan kesempatan kepada tamu untuk membatalkan pemesanan mereka hingga jumlah hari tertentu sebelum check-in12. Setelah tanggal tersebut berlalu, hotel mungkin akan menagih tamu dengan biaya pembatalan tetap, persentase dari pemesanan, atau jumlah penuh12. Ada beberapa jenis kebijakan pembatalan seperti pembatalan gratis, refundable (bisa dapat refund), atau non-refundable (dapat dibatalkan, tapi tidak ada pengembalian uang)"
        }
      />
      <Accordion
        title={"Bagaimana cara membatalkan pemesanan?"}
        answer={
          "Untuk membatalkan pemesanan hotel, Anda bisa login ke akun Anda di situs pemesanan hotel, pergi ke menu Pesanan, pilih pesanan yang ingin Anda batalkan, dan ikuti langkah-langkah pembatalan yang disediakan14151617. Mohon diingat bahwa pembatalan mungkin dikenakan biaya, dan untuk memastikannya, silakan cek kebijakan pembatalan pada voucher hotel Anda."
        }
      />
    </div>
  );
};

export default Faq;
