import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function JoinCommunitySection() {
  return (
    <section className="px-6 md:px-16 py-20 bg-black text-center">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-white mb-4"
      >
        Ready to Join the Community?
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto"
      >
        Upload your first video today and become a part of our growing creator network.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Link to="/explore" className="inline-block w-full sm:w-auto">
          <button
            type="button"
            className="group w-full sm:w-auto min-w-[200px] md:min-w-[240px] 
      px-10 py-3 bg-gradient-to-r from-red-700 via-red-600 to-red-500
      text-white rounded-xl text-base md:text-lg font-semibold
      flex justify-center items-center gap-3
      shadow-xl hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14L21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </button>
        </Link>

      </motion.div>
    </section>
  );
}
