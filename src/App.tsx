import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Consultations from './components/Consultations';
import Testimonials from './components/Testimonials';
import Oath from './components/Oath';
import Urgency from './components/Urgency';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Consultations />
        <Testimonials />
        <Oath />
        <Urgency />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
