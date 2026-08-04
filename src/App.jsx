import "./styles/base.css";
import SmoothScroll from "./lib/SmoothScroll";
import Navbar from "./components/Navbar";
import HomeSection from "./components/sections/HomeSection";
import StatsSection from "./components/sections/StatsSection";
import CitiesSection from "./components/sections/CitiesSection";
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
          <StatsSection />
          <CitiesSection />
          <AboutAppSection />
          <AboutUsSection />
          <ContactSection />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
