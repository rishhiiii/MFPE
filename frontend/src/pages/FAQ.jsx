import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What is Cane Jaggery?",
      answer: "Cane Jaggery is a natural sweetener made from fresh sugarcane juice without refining or bleaching, retaining its natural nutrients and minerals."
    },
    {
      question: "Is your jaggery 100% organic?",
      answer: "Yes, our jaggery is made from carefully selected sugarcane and processed using traditional methods without harmful chemicals."
    },
    {
      question: "Does your jaggery contain any added sugar?",
      answer: "No. Our Cane Jaggery contains no added sugar, artificial sweeteners, or preservatives."
    },
    {
      question: "How is Mahaveer Cane Jaggery different from regular jaggery?",
      answer: "Our jaggery is prepared using traditional Jain processing methods, ensuring superior purity, natural taste, and premium quality."
    },
    {
      question: "Are any chemicals used during processing?",
      answer: "No. We do not use harmful chemicals, artificial colors, or preservatives during processing."
    },
    {
      question: "What are the health benefits of jaggery?",
      answer: "Jaggery is naturally rich in minerals such as iron and is considered a healthier alternative to refined sugar when consumed in moderation."
    },
    {
      question: "How should I store the product?",
      answer: "Store in a cool, dry place away from direct sunlight. Keep the container tightly closed after use."
    },
    {
      question: "Do you offer bulk and wholesale orders?",
      answer: "Yes. We supply bulk, wholesale, and export orders. Please contact us for pricing and requirements."
    },
    {
      question: "Do you export your products internationally?",
      answer: "Yes. Mahaveer Food Products & Exporters serves both domestic and international markets."
    },
    {
      question: "How can I contact Mahaveer Food Products & Exporters?",
      answer: "You can call us at +91 9669993888 or email us at mahaveermfpe@gmail.com. Our team will be happy to assist you with any inquiries."
    }
  ]

  return (
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-8"
          >
            Frequently Asked <span className="text-brand-brown">Questions</span>
          </motion.h1>
          <p className="font-body text-xl text-gray-700 leading-relaxed">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white p-8 rounded-[2rem] border-2 border-brand-brown/20 hover:shadow-xl hover:shadow-brand-brown/10 transition-all duration-300 text-left flex justify-between items-center gap-6"
              >
                <span className="text-xl font-black text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-7 h-7 text-brand-brown flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-7 h-7 text-brand-brown flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-white to-brand-cream p-8 rounded-b-[2rem] border-2 border-t-0 border-brand-brown/20">
                      <p className="font-body text-lg text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-brand-brown rounded-[3rem] p-10 md:p-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Still have questions?</h2>
          <p className="font-body text-xl text-brand-light/90 mb-10">
            Our team is here to help! Reach out to us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-brand-brown px-12 py-5 rounded-[2rem] font-bold text-lg shadow-2xl transition-all inline-flex items-center gap-3"
              >
                <Mail className="w-6 h-6" />
                Contact Us
              </motion.button>
            </Link>
            <a href="tel:+919669993888">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-red text-white px-12 py-5 rounded-[2rem] font-bold text-lg shadow-2xl transition-all inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Call Now
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ
