import React, { useState } from "react";
import ParticlesBg from "../components/ParticlesBg";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Astra from "../assets/Astra.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const requiredFields = ["name", "email", "service", "idea"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    if (formData.service !== "others") {
      if (!formData.budget?.trim()) {
        newErrors.budget = "Please enter your budget.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");
    toast.dismiss();
    toast.warning("Sending message...", { autoClose: 2000 });

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      toast.dismiss();
      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      toast.dismiss();
      toast.error("Something went wrong!");
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black text-white overflow-hidden py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      <ParticlesBg />
      <ToastContainer position="top-right" />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="hidden lg:flex w-full md:w-1/2 justify-center">
          <motion.div
            className=" select-none pointer-events-none "
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={Astra}
              alt="Contact"
              className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500" : "border-gray-500"
                  } text-white`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.email ? "border-red-500" : "border-gray-500"
                  } text-white`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Service */}
            <div className="flex flex-col">
              <label className="mb-1">
                Service Needed <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.service ? "border-red-500" : "border-gray-500"
                  } text-white`}
              >
                <option value="" disabled>
                  Something in mind?
                </option>
                <option value="Web Development" className="text-black">
                  Web Development
                </option>
                <option value="others" className="text-black">
                  Others
                </option>
              </select>
              {errors.service && (
                <p className="text-red-500 text-xs">{errors.service}</p>
              )}
            </div>

            {/* Budget */}
            {formData.service && formData.service !== "others" && (
              <div className="flex flex-col">
                <label className="mb-1">
                  Budget <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`p-3 rounded-md bg-white/10 border ${errors.budget ? "border-red-500" : "border-gray-500"
                    } text-white`}
                />
                {errors.budget && (
                  <p className="text-red-500 text-xs">{errors.budget}</p>
                )}
              </div>
            )}

            {/* Idea */}
            <div className="flex flex-col">
              <label className="mb-1">
                Explain Your Idea <span className="text-red-500">*</span>
              </label>
              <textarea
                name="idea"
                rows={5}
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.idea ? "border-red-500" : "border-gray-500"
                  } text-white`}
              />
              {errors.idea && (
                <p className="text-red-500 text-xs">{errors.idea}</p>
              )}
            </div>

            {/* INLINE STATUS MESSAGE */}
            {status && (
              <p
                className={`text-sm font-medium ${status === "sending"
                  ? "text-yellow-400"
                  : status === "success"
                    ? "text-green-400"
                    : "text-red-400"
                  }`}
              >
                {status === "sending" && "🚀 Sending..."}
                {status === "success" && "✅ Message sent successfully!"}
                {status === "error" && "❌ Something went wrong."}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
