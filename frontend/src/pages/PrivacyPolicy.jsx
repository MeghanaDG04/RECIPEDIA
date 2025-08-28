import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            At <span className="text-red-600 dark:text-red-400 font-semibold">Recipedia</span>, 
            your privacy is our secret ingredient. Here’s how we keep your data safe & tasty.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="dark:bg-slate-800 rounded-2xl border-l-[6px] border-red-600 dark:border-red-400 shadow-2xl p-8 lg:p-12 space-y-10"
        >
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-xl leading-relaxed"
          >
            Your data is never just “stored”—it’s protected like grandma’s 
            <span className="text-red-600 dark:text-red-400 font-semibold"> secret recipe</span>.  
            We use it only to enhance your cooking journey.
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="visible"
            className="list-decimal list-inside space-y-5 text-lg"
          >
            {[
              { title: "What We Collect", desc: "Name, email, recipe uploads." },
              { title: "How We Use It", desc: "Personalizing your cooking journey—never sold or rented." },
              { title: "Security", desc: "Encrypted storage with top-notch safeguards." },
              { title: "Your Control", desc: "Edit or delete your data anytime from your profile." },
              { title: "Reach Us", desc: (<a href="mailto:support@recipedia.com" className="underline hover:text-red-500">support@recipedia.com</a>) },
            ].map((item, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={fadeInUp}
                className="pl-1"
              >
                <strong className="text-red-600 dark:text-red-400">{item.title}:</strong>{" "}
                {item.desc}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-6 border-t border-red-600 dark:border-red-400 text-gray-500 dark:text-gray-400 text-sm text-center"
          >
            &copy; {new Date().getFullYear()} Recipedia. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
