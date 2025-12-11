import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who will fix the issues I report?",
      answer:
        "Your report is automatically forwarded to the responsible authority — Dhaka City Corporation, WASA, Titas Gas, Electricity Department, etc. We act as a bridge between citizens and government bodies.",
    },
    {
      question: "Will my identity remain anonymous?",
      answer:
        "Yes, 100%. Your name, phone number, and email are never shown publicly. Only your chosen display name or nickname is visible.",
    },
    {
      question: "How long does it take to get an issue fixed?",
      answer:
        "On average, action is taken within 7–30 days. The more upvotes a report gets, the faster authorities respond. We also send automatic reminders.",
    },
    {
      question: "Can I report the same issue multiple times?",
      answer:
        "Yes, but it's more effective to upvote the existing report. This increases its priority in the system.",
    },
    {
      question: "Is photo mandatory?",
      answer:
        "Yes. Reports without clear photos are not accepted because visual proof helps authorities act faster.",
    },
    {
      question: "Can I report without installing the app?",
      answer:
        "Absolutely! You can report directly from our website at publicfix.bd — no app download required.",
    },
    {
      question: "Can I comment on other people's reports?",
      answer:
        "Comment feature is coming very soon! Currently, you can upvote and follow updates.",
    },
    {
      question: "Is PublicFix free to use?",
      answer:
        "Completely free. No registration fee, no premium plan — just pure public service.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know before reporting
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={24}
                  className={`text-orange-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer - Animated Slide */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
