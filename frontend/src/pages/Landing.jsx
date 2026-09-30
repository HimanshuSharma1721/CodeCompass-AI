import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Comparison from "../components/Comparispn";
import Footer from "../components/Footer";

function Landing() {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Comparison />
      <Footer />
    </div>
  );
}

export default Landing;