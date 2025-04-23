
import { MainLayout } from "@/components/layout/MainLayout";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is this platform about?",
    answer: "This platform helps developers connect, join tribes, discover roadmaps, and accelerate their careers through community-driven learning."
  },
  {
    question: "How do I create a roadmap?",
    answer: "Navigate to the Roadmaps section and click on 'Create Roadmap' to start building your custom roadmap."
  },
  {
    question: "What are Tribes?",
    answer: "Tribes are interest-based communities. You can join or create a tribe to collaborate with like-minded developers."
  },
  {
    question: "Can I share my roadmap?",
    answer: "Yes! After creating and saving a roadmap, you can share the export with others."
  },
  {
    question: "How is my data protected?",
    answer: "We take privacy seriously. Please see our Privacy Policy for details."
  }
];

export default function FAQ() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-afro-purple to-afro-gold bg-clip-text text-transparent text-center">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MainLayout>
  );
}
