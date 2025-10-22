import React, { useState } from "react";
import { Contact, Mail, Phone, MapPin, Twitter, Linkedin } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Simulating API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex items-center justify-center px-4 py-12 font-poppins">
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden border border-gray-200 dark:border-zinc-800">
        
        {/* LEFT SIDE INFO */}
        <div className="p-10 bg-blue-600 dark:bg-blue-700 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-blue-100 dark:text-blue-200 mb-6">
            Have a question, feedback, or collaboration idea? We’d love to hear
            from you. Fill the form or use the details below.
          </p>

          <div className="space-y-4 text-blue-50 dark:text-blue-100">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" aria-hidden="true" /> 
              <span>support@recipedia.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" aria-hidden="true" /> 
              <span>+91-123-456-7890</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" aria-hidden="true" /> 
              <span>India</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <a
              href="https://twitter.com/"
              aria-label="Twitter"
              className="hover:text-blue-200"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/"
              aria-label="LinkedIn"
              className="hover:text-blue-200"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10">
          <div className="flex items-center mb-6">
            <Contact className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
              Contact Us
            </h2>
          </div>

          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-400 dark:border-green-600 p-4 mb-6 rounded">
              <p className="text-green-700 dark:text-green-200">
                Thanks for reaching out! We'll get back soon.
              </p>
            </div>
          ) : (
            <form
              className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl shadow-md"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <label
                htmlFor="name"
                className="block mb-3 font-medium text-zinc-700 dark:text-zinc-200"
              >
                Name
                <input
                  placeholder="Enter the Name"
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  aria-label="Name"
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                />
              </label>
              <label
                htmlFor="email"
                className="block mb-3 font-medium text-zinc-700 dark:text-zinc-200"
              >
                Email
                <input
                  placeholder="Enter the Email"
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  aria-label="Email"
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                />
              </label>
              <label
                htmlFor="message"
                className="block mb-4 font-medium text-zinc-700 dark:text-zinc-200"
              >
                Message
                <textarea
                  placeholder="Enter the Message"
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows="4"
                  aria-label="Message"
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                aria-label="Send Message"
                className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 font-semibold w-full flex items-center justify-center"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
