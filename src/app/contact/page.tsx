"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ticketId, setTicketId] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message
        })
        .select("id")
        .single();

      if (error) throw error;

      if (data) {
        setTicketId(data.id);
      }
      
      setStatus("success");
      setForm({ name: "", email: "", subject: "general", message: "" });
      
      // Reset success state after 8 seconds
      setTimeout(() => setStatus("idle"), 8000);
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      setErrorMsg("Failed to send message. Please try again.");
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full bg-stone-50 dark:bg-stone-900/10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column - Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl border border-stone-200/60 dark:border-stone-850 p-8 bg-white dark:bg-stone-900 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Contact Info</h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Have questions about food donation, NGO auditing, or volunteering? Reach out directly or send us a message.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 dark:bg-primary/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Location</h4>
                    <p className="text-sm text-stone-900 dark:text-white font-medium mt-0.5">Belagavi, karnataka</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 dark:bg-primary/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Phone</h4>
                    <p className="text-sm text-stone-900 dark:text-white font-medium mt-0.5">
                      <a href="tel:+919380900293" className="hover:text-primary transition-colors">+91 9380900293</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 dark:bg-primary/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Email</h4>
                    <p className="text-sm text-stone-900 dark:text-white font-medium mt-0.5">
                      <a href="mailto:srushtishapure@gmail.com" className="hover:text-primary transition-colors">srushtishapure@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
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
                  {status === "error" && (
                    <div className="p-3 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl font-bold text-center">
                      {errorMsg}
                    </div>
                  )}
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
    </div>
  );
}
