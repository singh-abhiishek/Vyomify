import { Link } from 'react-router-dom';

const ExploreButton = () => (
  <Link to="/explore" className="inline-block">
    <button
      type="button"
      className="mt-1 mr-1 px-1.5 py-1.5 md:mt-1 lg:mt-2 md:mr-1.5 lg:mr-0   bg-neutral-900 border border-neutral-700 text-white md:px-3 md:py-2 rounded-lg text-sm font-medium hover:border-red-500 hover:text-red-400 transition-colors duration-200 cursor-pointer flex items-center "
    >
      <span className="align-middle text-[12px] sm:text-sm">Explore</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-0.5 sm:ml-1.5 h-[1em] sm:h-[1.1em] w-[1.1em] align-middle"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h6v6" />
        <path d="M10 14L21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </button>
  </Link>
);

export default ExploreButton;
