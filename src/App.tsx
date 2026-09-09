import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import AIClassifier from '@/components/AIClassifier';
import NatureCategories from '@/components/NatureCategories';
import HowAILearns from '@/components/HowAILearns';
import NationalDay from '@/components/NationalDay';
import Quiz from '@/components/Quiz';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-sand-50" dir="rtl">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <AIClassifier />
        <NatureCategories />
        <HowAILearns />
        <NationalDay />
        <Quiz />
      </main>
      <Footer />
    </div>
  );
}

export default App;
