import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CollectionLayout({ children }) {
  return (
    <div className="App">
      <Navbar />
      <main className="pt-[150px] md:pt-[90px]">{children}</main>
      <Footer />
    </div>
  );
}

