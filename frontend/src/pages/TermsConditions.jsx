import React from "react";
import { motion } from "framer-motion";

const TermsConditions = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen dark:bg-slate-800 bg-gray-50 text-gray-900 dark:text-gray-100 flex items-start pt-24 pb-16 px-4 lg:px-0 font-sans">
      <div className="mx-auto w-full max-w-3xl space-y-14">
        
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Welcome to <span className="text-red-600 dark:text-red-400 font-semibold">Recipedia</span>.  
            By using our platform, you agree to cook up experiences responsibly 🍳
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="dark:bg-slate-800 rounded-2xl border-l-[6px] border-red-600 dark:border-red-400 shadow-2xl p-8 lg:p-12 space-y-10"
        >
          <motion.ul
            initial="hidden"
            animate="visible"
            className="list-decimal list-inside space-y-5 text-lg"
          >
            {[
              { title: "Usage", desc: "You agree to share recipes respectfully, without harmful or plagiarized content." },
              { title: "Ownership", desc: "Recipes you upload remain yours, but you allow Recipedia to showcase them to other users." },
              { title: "Fair Play", desc: "No spamming, fake reviews, or bad kitchen vibes." },
              { title: "Updates", desc: "We may update these terms, but we’ll always season them with clarity." },
            ].map((item, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <span className="font-semibold text-red-600 dark:text-red-400">
                  {item.title}:
                </span>{" "}
                {item.desc}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditions;
