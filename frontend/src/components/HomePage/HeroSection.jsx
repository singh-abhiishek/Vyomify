import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Video,
  LayoutDashboard,
  UploadCloud,
  MessageSquare,
  Rocket,
  UserCheck,
  VideoIcon,
  Clapperboard
} from "lucide-react";

export default function HeroSection({ isLoggedIn }) {
  return (
    <section className="relative px-4 sm:px-8 md:px-20 py-6 sm:py-16 bg-gradient-to-b from-black to-zinc-900 overflow-hidden text-white">
      {/* Glowing Circles */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-red-600 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-red-800 opacity-20 rounded-full blur-3xl animate-pulse" />

      {/* Hero Main */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="text-center md:text-left md:max-w-[50%]">
          
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 mb-6 text-sm sm:text-base md:text-lg font-medium text-white bg-white/10 rounded-xl w-fit mx-auto sm:mx-0 backdrop-blur"
          >
            <Clapperboard className="w-5 h-5 text-red-400" />
            <span className="text-white">
              Turn your ideas into videos — <span className="text-red-400 font-semibold">Lights, Camera, Create!</span>
            </span>
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4"
          >
            {/* Welcome to <span className="text-red-500">Video-Hub</span> */}
            Welcome to <span className="text-red-500">Vyomify</span>
          </motion.h1>

          {/* Description */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed  pl-6 italic relative"
          >
            <span className="absolute left-1 sm:left-0 sm:top-0 text-4xl text-red-500 select-none">“</span>
            Discover, upload, and share stunning videos. Whether you're a content creator or viewer, our dashboard has everything you need.
            <span className="absolute md:right-54 md:bottom--0 lg:right-65 lg:bottom--0 text-4xl text-red-500 select-none">”</span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link to={isLoggedIn ? "/explore" : "/signup"}>
              <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-base sm:text-lg font-semibold rounded-xl shadow hover:brightness-110 transition-all cursor-pointer">
                Get Started
              </button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-4 text-sm text-gray-400"
          >
            Built with love ❤️ and passion for creators everywhere.
          </motion.p>

        </div>


        {/* Right Code Snippet */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-black/30 rounded-xl p-5 sm:p-6 text-sm text-red-400 font-mono shadow-lg border border-zinc-800 w-full md:w-[50%] max-h-[400px] overflow-auto"
        >
          <p className="text-gray-400 text-xs mb-2">// Publish your video</p>
          <pre className="whitespace-pre-wrap">
            <code>
              <span className="text-red-400">const</span> <span className="text-white">&#123; title, description, visibility &#125;</span> = <span className="text-white">req.body</span>;
              {"\n\n"}
              <span className="text-red-400">const</span> <span className="text-white">videoFile</span> = <span className="text-red-400">await</span> <span className="text-green-400">uploadOnCloudinary</span>(<span className="text-white">req.files?.videoFile[0]?.path</span>);
              {"\n"}
              <span className="text-red-400">const</span> <span className="text-white">thumbnail</span> = <span className="text-red-400">await</span> <span className="text-green-400">uploadOnCloudinary</span>(<span className="text-white">req.files?.thumbnail[0]?.path</span>);
              {"\n\n"}
              <span className="text-red-400">const</span> <span className="text-white">video</span> = <span className="text-red-400">await</span> <span className="text-green-400">Video.create</span>(&#123;
              {"\n  "}videoFile: <span className="text-white">videoFile.url</span>,
              {"\n  "}thumbnail: <span className="text-white">thumbnail.url</span>,
              {"\n  "}title,
              {"\n  "}description,
              {"\n  "}visibility
              {"\n"}&#125;);
            </code>
          </pre>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto hidden ">
        <Feature icon={<UploadCloud size={28} />} title="Upload Videos" desc="Easily share your creations with the world." />
        <Feature icon={<MessageSquare size={28} />} title="Create Posts" desc="Engage your audience with text updates and polls." />
        <Feature icon={<LayoutDashboard size={28} />} title="Creator Dashboard" desc="Manage content, stats, and settings in one place." />
        <Feature icon={<ShieldCheck size={28} />} title="Secure Platform" desc="Your content and data are always protected." />
        <Feature icon={<UserCheck size={28} />} title="Built for Creators" desc="Powerful tools and features tailored for content creators." />
        <Feature icon={<Rocket size={28} />} title="Fast Uploads" desc="Quick and reliable video uploading experience." />
      </div>
    </section>
  );
}

// Feature Component, call from above
function Feature({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: 1.05, color: "#f87171", transition: { duration: 0.3 } }}
      className="flex gap-4 items-start p-4 rounded-lg cursor-pointer text-gray-300 hover:text-red-500 transition-colors duration-300"
    >
      <motion.div className="text-red-600" whileHover={{ rotate: 12, transition: { duration: 0.3 } }}>
        {icon}
      </motion.div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </motion.div>
  );
}
