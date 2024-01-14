// import { useState } from "react";

// export function usePriceCount({ hargaKamar, kamar, night }) {
//   const [price, setPrice] = useState(0);
//   if (kamar > 1 && night > 1) {
//     let harga = hargaKamar * kamar * night;
//     console.log(harga);
//     setPrice(harga);
//   } else if (kamar === 1 && night === 1) {
//     setPrice(hargaKamar);
//   } else if (kamar > night || night > kamar) {
//     let harga = hargaKamar * kamar * night;
//     setPrice(harga);
//   }

//   return { price };
// }
