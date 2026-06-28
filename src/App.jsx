import "./App.css";
import SmoothScroll from "./lib/SmoothScroll";
import Navbar from "./components/Navbar";
import HomeSection from "./components/sections/HomeSection";
import AboutAppSection from "./components/sections/AboutAppSection";
import AboutUsSection from "./components/sections/AboutUsSection";
import ContactSection from "./components/sections/ContactSection";

function App() {
  return (
    <SmoothScroll>
      <div className="app-container">
        <Navbar />
        <main>
          <HomeSection />
          <AboutAppSection />
          <AboutUsSection />
          <ContactSection />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
