import { motion } from "framer-motion";
import { Flame, Users, Clock, PlayCircle } from "lucide-react";
import React from "react";

export default function StatsSection() {
    const stats = [
        {
            icon: <Flame size={40} color="currentColor" />,
            title: "10K+ Video Plays",
            desc: "Across newly uploaded content",
        },
        {
            icon: <PlayCircle size={40} color="currentColor" />,
            title: "1K+ Videos Uploaded",
            desc: "And growing every week",
        },
        {
            icon: <Users size={40} color="currentColor" />,
            title: "500+ Creators",
            desc: "Building their audience here",
        },
        {
            icon: <Clock size={40} color="currentColor" />,
            title: "1,200+ Hours Watched",
            desc: "By early adopters and fans",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* bg-[#191b1f] bg-[#252629]*/}
            <section className="px-6 md:px-16 py-24 bg-[#191b1f] ">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                    {stats.map(({ icon, title, desc }) => (
                        <div
                            key={title}
                            className="bg-black/50 rounded-2xl p-8 cursor-default
              hover:scale-105 hover:shadow-lg hover:shadow-red-600/50
              transition-transform duration-300 flex flex-col items-center"
                        >
                            <div
                                className="p-4 mb-4 rounded-full text-red-600 flex items-center justify-center"
                            >
                                {icon}
                            </div>
                            <h4 className="text-xl text-white font-semibold mb-2">{title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}
