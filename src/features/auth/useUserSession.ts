import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useUserSession() {
  const router = useRouter()
  const { data: session, status }: { data: any; status: string } = useSession();
  let [name, setName] = useState<any>("");
  let [email, setEmail] = useState<any>("");
  let [phone, setPhone] = useState<any>();
  let [image, setImage] = useState<any>("");
  let [url, setUrl] = useState<any>("");


  useEffect(() => {
    async function getUser() {
      const res = await axios.get(`/api/users?email=${session.user.email}`)
      if(res.status === 200){
        setPhone(res.data.phone)
      }
    }
    if (status === "authenticated") {
      setName(session.user.fullname);
      setEmail(session.user.email);
      setImage(session.user.image);
      setUrl(session.user.redirectUrl);
      getUser()
    }
  }, [status, session]);

  useEffect(() => {
    if (url === '/auth/phone') {
      router.push('/auth/phone');
    }
  }, [url, router]);

  return { name, image, status, email, phone, url };
}
