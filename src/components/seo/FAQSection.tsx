import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SchemaMarkup } from "./SchemaMarkup";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
  showSchema?: boolean;
}

export const FAQSection = ({ 
  title = "Perguntas Frequentes", 
  faqs,
  showSchema = true 
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section className="py-12" itemScope itemType="https://schema.org/FAQPage">
      {showSchema && (
        <SchemaMarkup type="faq" questions={faqs} />
      )}
      
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border rounded-lg overflow-hidden"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <h3 
                className="font-semibold text-lg pr-4"
                itemProp="name"
              >
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-primary shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
              )}
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div 
                className="p-4 pt-0 text-muted-foreground leading-relaxed"
                itemProp="text"
              >
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
