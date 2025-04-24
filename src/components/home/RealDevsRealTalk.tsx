
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MotionDiv } from "@/components/ui/motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const quotes = [
  {
    text: "African tech is not just rising, it's soaring. We're building solutions that speak to our unique challenges and opportunities.",
    author: "Chioma Eze",
    role: "Senior Frontend Developer",
    country: "Nigeria",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    text: "The future of tech in Africa is collaborative. We're stronger when we build together, learn together, and grow together.",
    author: "Mark Ochieng",
    role: "Full Stack Developer",
    country: "Kenya",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    text: "Every line of code we write is a step toward digital independence for Africa. We're not just coding, we're creating legacy.",
    author: "Aisha Diallo",
    role: "DevOps Engineer",
    country: "Senegal",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    text: "Innovation in Africa doesn't follow traditional paths. We're creating our own routes, solving our own problems, our own way.",
    author: "David Mensah",
    role: "Software Architect",
    country: "Ghana",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

export function RealDevsRealTalk() {
  const [currentText, setCurrentText] = useState("");
  const [textComplete, setTextComplete] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Create the autoplay plugin instance directly
  const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: true });
  
  // Pass the plugin as an array to useEmblaCarousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplayPlugin]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        const index = emblaApi.selectedScrollSnap();
        setCurrentQuoteIndex(index);
        setCurrentText("");
        setTextComplete(false);
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    const currentQuote = quotes[currentQuoteIndex].text;
    if (!textComplete) {
      let i = 0;
      const typeTimer = setInterval(() => {
        if (i < currentQuote.length) {
          setCurrentText(prev => prev + currentQuote[i]);
          i++;
        } else {
          setTextComplete(true);
          clearInterval(typeTimer);
        }
      }, 30);

      return () => clearInterval(typeTimer);
    }
  }, [currentQuoteIndex, textComplete]);

  return (
    <section className="w-full py-20 px-6 bg-afro-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Real Devs, Real Talk
        </h2>
        
        <Carousel
          ref={emblaRef}
          className="w-full max-w-4xl mx-auto"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {quotes.map((quote, index) => (
              <CarouselItem key={index}>
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center text-center px-6 md:px-12"
                >
                  <div className="mb-8 min-h-[200px] flex items-center justify-center">
                    <p className="text-xl md:text-2xl leading-relaxed">
                      {currentQuoteIndex === index ? currentText : quote.text}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <img
                      src={quote.avatar}
                      alt={quote.author}
                      className="w-12 h-12 rounded-full border-2 border-afro-purple"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-afro-purple">{quote.author}</p>
                      <p className="text-sm text-gray-400">{quote.role}</p>
                      <p className="text-sm text-gray-400">{quote.country}</p>
                    </div>
                  </div>
                </MotionDiv>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
