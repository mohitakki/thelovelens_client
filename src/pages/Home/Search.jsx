import { useState } from "react";
import {
  MapPin,
  Calendar,
  Camera,
  Award,
  DollarSign,
  Star,
  ChevronDown,
  ChevronRight,
  X,
  Filter,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../components/auth/AuthModal";
import { usePhotographerQuery } from "../../hooks/usePhotographerQuery";


const occasions = [
  { name: "Wedding", icon: "💍" },
  { name: "Birthday", icon: "🎂" },
  { name: "Corporate", icon: "👔" },
  { name: "Maternity", icon: "🤰" },
  { name: "Graduation", icon: "🎓" },
  { name: "Family", icon: "👪" },
];

const SearchResultsPage = ({ searchParams, onBackToHome }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 300]);
  const [rating, setRating] = useState(0);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleOccasion = (occasion) => {
    if (selectedOccasions.includes(occasion)) {
      setSelectedOccasions(selectedOccasions.filter((occ) => occ !== occasion));
    } else {
      setSelectedOccasions([...selectedOccasions, occasion]);
    }
  };
  const { photographers, isLoadingPhotographers, photographersError, refetchPhotographers } =
    usePhotographerQuery();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Skeleton loader animation variants
  const skeletonVariants = {
    initial: { opacity: 0.3 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        repeatType: "reverse" 
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onBackToHome}
              className="text-gray-600 hover:text-gray-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </motion.button>
            <h1 className="text-xl font-semibold">Browse Photographers</h1>
          </div>
          <button
            className="md:hidden bg-blue-50 text-blue-600 p-2 rounded-md"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <Filter size={20} />
          </button>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin size={16} className="text-gray-500" />
              <span>{searchParams.location || "Any location"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar size={16} className="text-gray-500" />
              <span>{searchParams.date || "Any date"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Camera size={16} className="text-gray-500" />
              <span>{searchParams.occasion || "All occasions"}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filters Sidebar */}
          {mobileFiltersOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="fixed inset-y-0 right-0 max-w-full flex"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="flex-1 px-4 py-6 space-y-6">
                      {/* Filter content - same as desktop */}
                      <div>
                        <h3 className="text-lg font-medium">Occasion</h3>
                        <div className="mt-4 space-y-2">
                          {occasions?.map((occ) => (
                            <div key={occ.name} className="flex items-center">
                              <input
                                id={`mobile-${occ.name}`}
                                type="checkbox"
                                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                                checked={selectedOccasions.includes(occ.name)}
                                onChange={() => toggleOccasion(occ.name)}
                              />
                              <label
                                htmlFor={`mobile-${occ.name}`}
                                className="ml-3 text-gray-700"
                              >
                                {occ.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Price Range</h3>
                        <div className="mt-4">
                          <input
                            type="range"
                            min="50"
                            max="500"
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([
                                priceRange[0],
                                parseInt(e.target.value),
                              ])
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between mt-2">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Rating</h3>
                        <div className="mt-4">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  size={24}
                                  className={
                                    star <= rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              </button>
                            ))}
                          </div>
                          {rating > 0 && (
                            <button
                              onClick={() => setRating(0)}
                              className="text-sm text-blue-600 mt-2"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Availability</h3>
                        <div className="mt-4">
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-4 border-t">
                      <button
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="font-semibold text-lg mb-6">Filters</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Occasion</h3>
                  <div className="space-y-2">
                    {occasions?.map((occ) => (
                      <div key={occ.name} className="flex items-center">
                        <input
                          id={occ.name}
                          type="checkbox"
                          className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                          checked={selectedOccasions.includes(occ.name)}
                          onChange={() => toggleOccasion(occ.name)}
                        />
                        <label
                          htmlFor={occ.name}
                          className="ml-3 text-gray-700"
                        >
                          {occ.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={20}
                            className={
                              star <= rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <button
                        onClick={() => setRating(0)}
                        className="text-sm text-blue-600 mt-2"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Availability</h3>
                  <div>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Results Section */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isLoadingPhotographers 
                  ? "Loading photographers..." 
                  : photographersError 
                    ? "Error loading photographers" 
                    : `${photographers?.length || 0} photographers found`}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="p-2 border border-gray-300 rounded text-sm">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {photographersError && (
              <motion.div 
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>Failed to load photographers: {photographersError.message}</span>
                </div>
                <button 
                  onClick={() => refetchPhotographers()}
                  className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-800"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Try again
                </button>
              </motion.div>
            )}

            {/* Skeleton Loaders */}
            {isLoadingPhotographers && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <motion.div
                    key={`skeleton-${n}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial="initial"
                    animate="animate"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 p-4">
                        <motion.div
                          className="w-full h-40 bg-gray-200 rounded-lg"
                          variants={skeletonVariants}
                        />
                      </div>
                      <div className="md:w-2/3 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <motion.div 
                              className="h-6 w-40 bg-gray-200 rounded"
                              variants={skeletonVariants}
                            />
                            <div className="flex items-center space-x-1 mt-2">
                              <motion.div 
                                className="h-4 w-24 bg-gray-200 rounded"
                                variants={skeletonVariants}
                              />
                            </div>
                          </div>
                          <div className="text-right">
                            <motion.div 
                              className="h-6 w-16 bg-gray-200 rounded"
                              variants={skeletonVariants}
                            />
                            <motion.div 
                              className="h-4 w-20 bg-gray-200 rounded mt-1"
                              variants={skeletonVariants}
                            />
                          </div>
                        </div>

                        <div className="flex items-center mt-3">
                          <motion.div 
                            className="h-4 w-28 bg-gray-200 rounded"
                            variants={skeletonVariants}
                          />
                        </div>

                        <div className="mt-3">
                          <motion.div 
                            className="h-4 w-20 bg-gray-200 rounded mb-2"
                            variants={skeletonVariants}
                          />
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map((i) => (
                              <motion.div 
                                key={i}
                                className="h-6 w-16 bg-gray-200 rounded-full"
                                variants={skeletonVariants}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <motion.div 
                            className="h-4 w-32 bg-gray-200 rounded mb-2"
                            variants={skeletonVariants}
                          />
                          <div className="flex space-x-2">
                            {[1, 2, 3].map((i) => (
                              <motion.div 
                                key={i}
                                className="w-16 h-16 bg-gray-200 rounded-md"
                                variants={skeletonVariants}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex space-x-3">
                          <motion.div 
                            className="h-9 w-24 bg-gray-200 rounded-md"
                            variants={skeletonVariants}
                          />
                          <motion.div 
                            className="h-9 w-24 bg-gray-200 rounded-md"
                            variants={skeletonVariants}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Actual Results */}
            {!isLoadingPhotographers && !photographersError && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {photographers?.map((photographer) => (
                  <motion.div
                    key={photographer.id || photographer.photographerId}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 p-4">
                        <img
                          src={photographer.profilePicture}
                          alt={photographer.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {photographer.name}
                            </h3>
                            <div className="flex items-center space-x-1 mt-1">
                              <MapPin size={14} className="text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {photographer.location}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600">
                              ₹{photographer.hourlyRate}
                            </div>
                            <div className="text-sm text-gray-500">
                              per {photographer.priceUnit || "hour"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center mt-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < Math.floor(photographer.rating || 0)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {photographer.rating || 0} ({photographer.reviews || 0} reviews)
                          </span>
                        </div>

                        <div className="mt-3">
                          <div className="text-sm text-gray-600 mb-2">
                            Specialties:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {photographer?.specialties?.map((specialty) => (
                              <span
                                key={specialty}
                                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm text-gray-600 mb-2">
                            Portfolio preview:
                          </div>
                          <div className="flex space-x-2">
                            {photographer?.portfolio?.map((img, index) => (
                              <motion.div
                                key={index}
                                className="w-16 h-16 rounded-md overflow-hidden"
                                whileHover={{ scale: 1.1 }}
                              >
                                <img
                                  src={img}
                                  alt="Portfolio"
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            ))}
                            <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center">
                              <ChevronRight size={20} className="text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex space-x-3">
                          <motion.button
                            className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              navigate(`/photographers/${photographer.photographerId || photographer.id}`)
                            }
                          >
                            View Profile
                          </motion.button>
                          <motion.button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsAuthModalOpen(true)}
                          >
                            Book Now
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty state when no photographers found */}
            {!isLoadingPhotographers && !photographersError && photographers?.length === 0 && (
              <motion.div 
                className="bg-white rounded-lg shadow-md p-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Camera className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">No photographers found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={() => {
                    setPriceRange([50, 300]);
                    setRating(0);
                    setSelectedOccasions([]);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default SearchResultsPage;
