import { useRef, useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './components/Home';
import Career from './components/Career';
import Projects from './components/Projects';
import Contact from './components/Contact';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);

  return (
    <main className="bg-softer min-h-screen text-primary">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Hero ref={heroRef} revealed={!isLoading} />
      <Navbar heroRef={heroRef} />
      <Home />
      <Career />
      <Projects />
      <Contact />
    </main>
  );
}

export default App;
