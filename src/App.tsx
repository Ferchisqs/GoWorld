import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Packages from "./components/sections/Packages";
import Destinations from './components/sections/Destinations';
import Questions from './components/sections/Questions';
import Opinions from './components/sections/Opinions';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Quote from './components/sections/Quote';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#061202] transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Packages />
          <Destinations />
          <Questions/>
          <Opinions/>
          <About/>
          <Quote/>
          <Contact/>
        </main>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}