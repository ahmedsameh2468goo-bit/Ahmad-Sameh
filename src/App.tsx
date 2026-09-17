import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// One-Page Main View
import { HomePage } from './pages/HomePage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';

// Section Redirect Helper: if someone visits /services or /portfolio directly, scroll them to the section!
const SectionRedirect: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  useEffect(() => {
    window.location.replace(`/#${sectionId}`);
  }, [sectionId]);
  return null;
};

// Public Layout Component with clean, bright, light canvas (ZERO BEIGE, ZERO DARK MODE)
const PublicLayout: React.FC = () => {
  const location = useLocation();

  // Smooth scroll to hash on load if present (e.g. /#portfolio)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-[#00d9fe] selection:text-slate-950 font-sans" dir="rtl">
      <Header />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public One-Page Scroll Route */}
              <Route path="/" element={<PublicLayout />} />

              {/* Seamless anchor redirects for old routes */}
              <Route path="/services" element={<SectionRedirect sectionId="services" />} />
              <Route path="/portfolio" element={<SectionRedirect sectionId="portfolio" />} />
              <Route path="/socials" element={<SectionRedirect sectionId="socials" />} />
              <Route path="/about" element={<SectionRedirect sectionId="about" />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLayout />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </DataProvider>
  );
}
