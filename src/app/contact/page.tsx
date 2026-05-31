"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [ticketId, setTicketId] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setTicketId(Math.floor(Math.random() * 90000) + 10000);
      setStatus("success");
      setForm({ name: "", email: "", subject: "general", message: "" });
      // Reset success state after 6 seconds
      setTimeout(() => setStatus("idle"), 6000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full bg-stone-50 dark:bg-stone-900/10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Right Column - Contact Form */}
        <div className="w-full">
          <div className="rounded-3xl border border-stone-200/60 dark:border-stone-850 p-8 sm:p-10 bg-white dark:bg-stone-900 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Send Us a Message</h2>

            {status === "success" ? (
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-6 flex flex-col items-center text-center space-y-3 dark:bg-primary/20">
                <CheckCircle2 className="w-12 h-12 text-primary" />
                <h3 className="font-bold text-stone-950 dark:text-white text-lg">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md">
                  Thank you for reaching out. We have logged your request and assigned it ticket #AS-{ticketId}. A coordinator will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Subject Matter
                  </label>
                  <select
                    name="subject"
                    id="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="donor">Food Donor Assistance</option>
                    <option value="ngo">NGO Partnerships & Audits</option>
                    <option value="volunteer">Volunteer Routes & App Support</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-400 py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white text-sm font-bold py-3.5 px-4 shadow-md shadow-primary/10 hover:shadow-lg disabled:opacity-50 transition-all duration-300"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
