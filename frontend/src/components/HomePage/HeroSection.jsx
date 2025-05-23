import { Users, GitPullRequest, Video, MessageSquare } from 'lucide-react';

const features = [
  { icon: <Users className="h-5 w-5 text-orange-400" />, label: 'Peer learning' },
  { icon: <GitPullRequest className="h-5 w-5 text-amber-400" />, label: 'Code reviews' },
  { icon: <Video className="h-5 w-5 text-orange-500" />, label: 'Virtual hostel' },
  { icon: <MessageSquare className="h-5 w-5 text-yellow-500" />, label: 'Doubt sessions' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden pt-20">
      {/* Background Floating Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-400/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              transform: `scale(${1 + Math.random()})`,
            }}
          />
        ))}
      </div>

      {/* Gradient Blob */}
      <div className="absolute pointer-events-none w-[500px] h-[500px] rounded-full opacity-20 bg-gradient-to-r from-orange-500 to-amber-500 blur-[100px] translate-x-[70px] translate-y-[137px]" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-4xl">
        <div className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-md border border-gray-700 bg-black/50 backdrop-blur-sm text-sm text-white">
          <span className="mr-2">Trusted by 1.5M Code Learners</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          <span className="inline-block relative">
            Consistency
            <span className="absolute -bottom-2 left-0 h-1 w-full bg-orange-500"></span>
          </span>{' '}
          and{' '}
          <span className="inline-block relative">
            Community
            <span className="absolute -bottom-2 left-0 h-1 w-full bg-amber-500"></span>
          </span>
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 text-transparent bg-clip-text">
          An unmatched Learning Experience for coding courses.
        </h2>

        <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
          Content is everywhere, but we provide a learning experience that is unmatched —
          bounties, peer learning, code reviews, virtual hostel, alumni network, doubt
          sessions, and group projects.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm"
            >
              {feature.icon}
              <span className="text-sm">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
