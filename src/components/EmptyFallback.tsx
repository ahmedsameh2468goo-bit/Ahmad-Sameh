import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Inbox } from 'lucide-react';

interface EmptyFallbackProps {
  message?: string;
  subtext?: string;
  compact?: boolean;
}

export const EmptyFallback: React.FC<EmptyFallbackProps> = ({
  message = 'لا يوجد حالياً',
  subtext,
  compact = false,
}) => {
  if (compact) {
    return (
      <div
        id="empty-fallback-compact"
        className="flex items-center justify-center gap-2 py-6 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-500 text-sm font-medium"
      >
        <Inbox className="w-4 h-4 text-slate-400" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <motion.div
      id="empty-fallback-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white/80 border border-slate-200/80 rounded-2xl shadow-xs"
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
        <Sparkles className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-bold text-slate-800 tracking-tight">
        {message}
      </h4>
      {subtext && (
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          {subtext}
        </p>
      )}
    </motion.div>
  );
};
