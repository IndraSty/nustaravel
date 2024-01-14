import { useState } from "react";

export const useTamuCounter = () => {
  const [tamu, setTamu] = useState(1);
  const [kamar, setKamar] = useState(1);

  const tambahTamu = () => {
    setTamu(tamu + 1);
  };

  const kurangTamu = () => {
    if (tamu > 1) {
      setTamu(tamu - 1);
    }
    if (tamu === kamar && tamu > 1) {
      setKamar(kamar - 1);
    }
  };

  const tambahKamar = () => {
    setKamar(kamar + 1);
    if (kamar === tamu) {
      setTamu(tamu + 1);
    }
  };

  const kurangKamar = () => {
    if (kamar > 1) {
      setKamar(kamar - 1);
    }
  };

  return { tamu, kamar, tambahTamu, tambahKamar, kurangKamar, kurangTamu };
};
