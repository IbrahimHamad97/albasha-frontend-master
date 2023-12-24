import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/Router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./AppContext";

const BreakPoints = () => (
  <div className="fixed z-[9999] top-0 left-0 bg-red-500 w-[80px] text-[48px] text-[black] opacity-50  h-[48px] grid place-content-center">
    <span className="block sm:hidden">XS</span>
    <span className="hidden sm:block md:hidden">SM</span>
    <span className="hidden md:block lg:hidden">MD</span>
    <span className="hidden lg:block xl:hidden">LG</span>
    <span className="hidden xl:block 2xl:hidden">XL</span>
    <span className="hidden 2xl:block">2XL</span>
  </div>
);

function App() {
  const phoneNumber = "+852381263892";
  const handleWhatsApp = () => {
    let message = "Hello!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Router />
        <Footer />
      </AppProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
