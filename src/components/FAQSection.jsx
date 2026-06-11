import React, { useState } from 'react';

const FAQSection = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "WHAT IS COURTQUEST?",
      answer: "CourtQuest is a platform that aims to provide real-time sports court availability updates for athletes to help them elevate their play and embrace their quest!"
    },
    {
      question: "WHO IS COURTQUEST FOR?",
      answer: "Everyone who wants to play a sport but is struggling with finding available courts to do so."
    },
    {
      question: "WHERE IS IT AVAILABLE?",
      answer: "CourtQuest is rapidly expanding its availability, and we are currently available in Wake, Durham, and Mecklenburg Counties."
    },
    {
      question: "IS IT FREE?",
      answer: "The base app is free, however, we plan to introduce a paid tier for hyper-accurate information regarding sports courts -- powered by our own in-house sensors."
    }
  ];

  return (
    <section id="faq" className="section-container faq-section">
      <h2 className="section-title">FAQS</h2>
      <div className="accordion">
        {faqs.map((faq, index) => (
          <div key={index} className="accordion-item">
            <button className="accordion-header" onClick={() => toggleAccordion(index)}>
              {faq.question}
              <span className="accordion-icon">{activeAccordion === index ? '−' : '+'}</span>
            </button>
            {activeAccordion === index && (
              <div className="accordion-content">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
