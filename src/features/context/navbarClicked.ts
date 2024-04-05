
export function navbarClicked() {
    const handleHotelsClick = () => {
        const element = document.getElementById("hotels");
    
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
    const handleAboutUsClick = () => {
        const element = document.getElementById("aboutUs");
    
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      return {handleAboutUsClick, handleHotelsClick}
}