import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import jaggeryNew1 from '../assets/jaggery new 1.jpeg';
import jaggeryNew2 from '../assets/jaggery new 2.jpeg';
import jaggeryNew3 from '../assets/jaggery new 3.jpeg';
import jaggeryNew4 from '../assets/jaggery new 4.jpeg';
import jaggeryNew5 from '../assets/jaggery new 5.jpeg';
import jaggeryNew6 from '../assets/jaggery new 6.jpeg';

const About = () => {
  return (
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">
            About <span className="text-brand-brown">Mahaveer Food Products</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bringing you pure, natural, and authentic food products since 1994.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 mb-16 border border-gray-100"
        >
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Since 1994, Mahaveer Food Products & Exporters has been committed to delivering pure, natural, and authentic food products prepared using traditional Jain methods.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our Premium Cane Jaggery is crafted from carefully selected sugarcane and processed with time-honored techniques that preserve its natural taste, color, and nutritional value. We believe that nature provides the best ingredients, which is why our products are made with a strong commitment to purity and quality.
          </p>

          <div className="mb-8">
            <h3 className="text-2xl font-medium text-gray-900 mb-6">We proudly offer:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "100% Organic & Natural",
                "Chemical-Free Processing",
                "No Harmful Additives or Preservatives",
                "No Added Sugar",
                "Naturally Rich Color & Taste",
                "Traditional Jain Processing Methods",
                "Rich in Essential Minerals & Nutrients"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-brown flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            For more than three decades, our mission has been to provide wholesome, healthy, and trustworthy food products that support a natural lifestyle. Every batch is carefully prepared and hygienically packed to ensure that the goodness of nature reaches your family exactly as intended.
          </p>

          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-xl font-medium text-brand-brown italic">
              "From Nature to Your Home, Pure Goodness Since 1994."
            </p>
          </div>
        </motion.div>

        {/* Manufacturing Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 text-center mb-12">
            Our <span className="text-brand-brown">Manufacturing Process</span>
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { step: 1, title: "Selection of Premium Sugarcane", desc: "Fresh and carefully selected sugarcane is sourced from trusted farms to ensure superior quality and natural sweetness." },
              { step: 2, title: "Juice Extraction", desc: "The sugarcane is thoroughly cleaned and crushed to extract fresh, nutrient-rich juice." },
              { step: 3, title: "Natural Filtration", desc: "The extracted juice is filtered to remove impurities while maintaining its natural goodness." },
              { step: 4, title: "Traditional Heating Process", desc: "The filtered juice is slowly heated in traditional pans under controlled temperatures to preserve its natural minerals, aroma, and flavor." },
              { step: 5, title: "No Harmful Chemicals", desc: "No artificial chemicals, preservatives, bleaching agents, or synthetic colors are used during the manufacturing process." },
              { step: 6, title: "Natural Concentration", desc: "As the juice thickens, it is continuously stirred by skilled workers until it reaches the perfect consistency." },
              { step: 7, title: "Molding & Cooling", desc: "The concentrated jaggery is poured into molds and allowed to cool naturally, giving it its characteristic texture and shape." },
              { step: 8, title: "Quality Inspection", desc: "Every batch undergoes strict quality checks to ensure purity, hygiene, consistency, and premium quality." },
              { step: 9, title: "Hygienic Packaging", desc: "The finished product is carefully packed in food-grade packaging to preserve freshness and ensure safe delivery." },
              { step: 10, title: "Ready for Your Family", desc: "The result is pure, natural, chemical-free Cane Jaggery with authentic taste, natural color, and wholesome nutrition." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white p-6 rounded-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cream text-brand-brown flex items-center justify-center font-medium text-lg">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                </div>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 text-center mb-12">
            Our <span className="text-brand-brown">Gallery</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-gray-100"
            >
              <img
                src={jaggeryNew1}
                alt="Our Products"
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-gray-100"
            >
              <img
                src={jaggeryNew2}
                alt="Our Process"
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden border border-gray-100"
            >
              <img
                src={jaggeryNew3}
                alt="Our Quality"
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl overflow-hidden border border-gray-100"
            >
              <img
                src={jaggeryNew4}
                alt="Our Products"
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl overflow-hidden border border-gray-100"
            >
              <img
                src={jaggeryNew5}
                alt="Our Process"
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl overflow-hidden border border-gray-100"
            >
              <img
                src={jaggeryNew6}
                alt="Our Quality"
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-brand-brown/10 rounded-3xl p-10 md:p-16 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
            Ready to try our pure products?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our collection of premium organic products.
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-brown text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 mx-auto"
            >
              Shop Now
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
