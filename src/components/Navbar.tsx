"use client";
import { Satisfy } from "next/font/google";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { navbarClicked } from "@/features/context/navbarClicked";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
});

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isImgClicked, setIsImgClicked] = useState<boolean>(false);

  const { handleHotelsClick, handleAboutUsClick } = navbarClicked();
  const { data: session, status }: { data: any; status: string } = useSession();
  let [name, setName] = useState<any>("");
  let [image, setImage] = useState<any>("");

  useEffect(() => {
    if (status === "authenticated") {
      setName(session.user.fullname);
      setImage(session.user.image);
      console.log(session.user);
    }
  }, [status, session, name, image]);

  const changeBgNav = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    changeBgNav();

    window.addEventListener("scroll", changeBgNav);
  });

  const bottomSheetRef = useRef(null);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsClicked(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(bottomSheetRef);

  return (
    <div
      className={`fixed flex w-full items-center justify-between
    top-0 z-[40] px-5 lg:px-20 py-3 md:py-5 ${
      isScrolled ? "bg-white shadow-md" : "bg-transparent"
    }`}
    >
      <h2
        className={`${satisfy.className} text-2xl md:text-4xl ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        Nusavel.
      </h2>
      <div
        className={`md:flex gap-8 text-sm items-center ${
          isScrolled ? "text-black" : "text-white"
        } font-semibold hidden`}
      >
        <Link
          href={"/"}
          className="transition-all ease-in-out duration-200 hover:underline underline-offset-8"
        >
          Home
        </Link>
        <button
          onClick={handleHotelsClick}
          className="transition-all ease-in-out duration-200 hover:underline underline-offset-8"
        >
          Hotels
        </button>
        <button
          onClick={handleAboutUsClick}
          className="transition-all ease-in-out duration-200 hover:underline underline-offset-8"
        >
          About Us
        </button>
        {status === "authenticated" ? (
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <span
                className={`font-bold ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                {name}
              </span>
              <button
                onClick={() => setIsImgClicked(!isImgClicked)}
                className={`cursor-pointer border-2 ${
                  isScrolled ? "border-blue-300" : "border-white"
                } rounded-full 
                hover:bg-white active:bg-white`}
              >
                {image == "" || image == undefined ? (
                  <img
                    src="/avatars/boy.png"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <img src={image} className="w-10 h-10 rounded-full" />
                )}
              </button>
            </div>
            {isImgClicked && (
              <div
                className={`absolute top-20 p-5 w-[200px] bg-white rounded-md`}
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-black text-base font-semibold">
                    {name}
                  </span>
                  <span className="text-black text-base font-semibold">
                    Your Profile
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="w-full bg-red-400 px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Link
              href={"/auth/login"}
              className="transition-all ease-in-out duration-200 font-bold"
            >
              Login
            </Link>{" "}
            |
            <Link
              href={"/auth/daftar"}
              className="transition-all ease-in-out text-white duration-200 bg-primary px-5 py-1 font-medium rounded-md hover:bg-primary-hover "
            >
              Daftar
            </Link>
          </div>
        )}
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setIsClicked(!isClicked)}
          className={`text-lg ${isScrolled ? "text-black" : "text-white"}`}
        >
          <FaBars />
        </button>

        {/* <div className={`absolute top-0 left-0 w-1/2 h-screen bg-black ${isClicked ? "bg-opacity-40" : "bg-opacity-0"}`} onClick={() => setIsClicked(false)}></div> */}
        <motion.div
          animate={
            isClicked
              ? { opacity: 0.6, zIndex: 3 }
              : { opacity: 0, display: "none" }
          }
          initial={{ opacity: 0 }}
          className="fixed top-0 bottom-0 right-0 left-0 h-full w-screen bg-black"
        />
        <AnimatePresence initial={false}>
          {isClicked && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { y: 0, height: "auto" },
                collapsed: { y: "100%", height: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="fixed bottom-0 right-0 left-0 z-10 w-full rounded-t-2xl border-2 border-b-0 border-gray-50 bg-white shadow-[0px_-8px_20px_-6px_rgba(0,0,0,0.3)]"
            >
              <div ref={bottomSheetRef} className="h-110 p-4">
                <div className="mb-2 flex justify-end">
                  <FaTimes
                    className="w-6 cursor-pointer"
                    onClick={() => setIsClicked(false)}
                  />
                </div>
                <h2 className="mb-3 text-xl font-bold">Menu</h2>
                <hr className="pb-5 " />
                <div className="flex flex-col pt-1 space-y-3 text-gray-900 text-sm gap-5 font-normal">
                  <div className="flex justify-between">
                    <Link
                      href={"#"}
                      className="transition-all ease-in-out duration-200 hover:font-semibold"
                    >
                      Home
                    </Link>
                    <FaChevronRight />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={handleHotelsClick}
                      className="transition-all ease-in-out duration-200 hover:underline underline-offset-8"
                    >
                      Hotels
                    </button>
                    <FaChevronRight />
                  </div>
                  <div className="flex justify-between">
                    <Link
                      href={"/booking"}
                      className="transition-all ease-in-out duration-200 hover:font-semibold"
                    >
                      Bookings
                    </Link>
                    <FaChevronRight />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={handleAboutUsClick}
                      className="transition-all ease-in-out duration-200 hover:underline underline-offset-8"
                    >
                      About Us
                    </button>
                    <FaChevronRight />
                  </div>
                </div>
                {status === "authenticated" ? (
                  <button
                    onClick={() => signOut()}
                    className="w-full transition-all ease-in-out text-white duration-200 bg-red-400 px-5 py-2 mt-4 font-medium rounded-md hover:bg-primary-hover "
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex justify-between pt-7 font-medium text-sm">
                    <button
                      onClick={() => signIn()}
                      className="w-1/2 bg-blue-100 text-primary py-3 rounded-md"
                    >
                      {/* <Link href={"#"}>Login</Link> */} Login
                    </button>
                    <span className="text-white">||||</span>
                    <button className="w-1/2 bg-primary text-white py-3 rounded-md">
                      <Link href={"/auth/daftar"}>Register</Link>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
