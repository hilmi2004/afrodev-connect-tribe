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

  const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: true });
  
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
    <section className="w-full py-20 px-6 bg-afro-black relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
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
                  <div className="bg-gradient-to-br from-afro-purple/10 to-afro-black/30 backdrop-blur-sm rounded-xl p-8 border border-afro-purple/20 shadow-lg mb-8">
                    <div className="mb-8 min-h-[200px] flex items-center justify-center">
                      <p className="text-xl md:text-2xl leading-relaxed text-white">
                        {currentQuoteIndex === index ? currentText : quote.text}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-afro-purple via-afro-gold to-afro-red rounded-full blur-sm opacity-50"></div>
                        <img
                          src={quote.avatar}
                          alt={quote.author}
                          className="w-16 h-16 rounded-full border-2 border-afro-purple relative"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-afro-purple text-lg">{quote.author}</p>
                        <p className="text-sm text-gray-300">{quote.role}</p>
                        <p className="text-sm text-gray-300">{quote.country}</p>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="hidden md:flex text-white border-afro-purple hover:bg-afro-purple/20" />
          <CarouselNext className="hidden md:flex text-white border-afro-purple hover:bg-afro-purple/20" />
        </Carousel>
      </div>
    </section>
  );
}
