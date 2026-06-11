import './App.css'
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TeamSection from './components/TeamSection';
import JoinQuestSection from './components/JoinQuestSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TeamSection />
      <JoinQuestSection />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default App
