import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Consultations from './components/Consultations';
import Testimonials from './components/Testimonials';
import Oath from './components/Oath';
import Urgency from './components/Urgency';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LaboralFlowModal from './components/flow/LaboralFlowModal';
import { useState } from 'react';
import './index.css';

function App() {
  const [isFlowOpen, setIsFlowOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero onOpenFlow={() => setIsFlowOpen(true)} />
        <Services />
        <Consultations />
        <Testimonials />
        <Oath />
        <Urgency />
        <Contact />
      </main>
      <Footer />
      <LaboralFlowModal isOpen={isFlowOpen} onClose={() => setIsFlowOpen(false)} />
    </div>
  );
}

export default App;
