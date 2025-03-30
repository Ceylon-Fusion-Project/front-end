// components/LoadingOverlay.tsx
import { motion, AnimatePresence } from "framer-motion";

const LoadingOverlay = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]"
      >
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingOverlay;
