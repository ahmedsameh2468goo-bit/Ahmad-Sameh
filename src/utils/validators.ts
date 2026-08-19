/**
 * Validation and sanitization helpers for Ahmed Sameh Portfolio
 */

// Max allowed file size: 5MB
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

// Allowed image MIME types
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/jpg',
];

/**
 * Validates and converts an image File to a Base64 data string
 */
export const processImageFile = (
  file: File
): Promise<{ success: boolean; dataUrl?: string; error?: string }> => {
  return new Promise((resolve) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      resolve({
        success: false,
        error: 'حجم الصورة يتجاوز الحد المسموح به (5 ميجابايت). يرجى اختيار صورة أصغر.',
      });
      return;
    }

    // Check MIME type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
      resolve({
        success: false,
        error: 'صيغة الملف غير مدعومة. الصيغ المسموحة هي: JPG, PNG, WEBP, SVG.',
      });
      return;
    }

    // Read as Data URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve({
          success: true,
          dataUrl: reader.result,
        });
      } else {
        resolve({
          success: false,
          error: 'فشل في قراءة ملف الصورة.',
        });
      }
    };
    reader.onerror = () => {
      resolve({
        success: false,
        error: 'حدث خطأ أثناء معالجة ملف الصورة.',
      });
    };
    reader.readAsDataURL(file);
  });
};

/**
 * RFC 5322 compliant email regex validator
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || email.trim() === '') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
};

/**
 * Sanitizes phone numbers for WhatsApp
 */
export const sanitizeWhatsAppNumber = (phone: string): string => {
  if (!phone) return '';
  // Remove all non-numeric characters except leading +
  const cleaned = phone.replace(/[^\d+]/g, '');
  // Remove leading + for wa.me format
  return cleaned.replace(/^\+/, '');
};

/**
 * Generates WhatsApp URL
 */
export const generateWhatsAppUrl = (phone: string, message?: string): string => {
  const sanitized = sanitizeWhatsAppNumber(phone);
  if (!sanitized) return '#';
  const base = `https://wa.me/${sanitized}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
};

/**
 * YouTube URL validator and parser
 */
export const validateYouTubeUrl = (
  url: string
): { isValid: boolean; videoId?: string; embedUrl?: string; error?: string } => {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'الرجاء إدخال رابط يوتيوب' };
  }

  const trimmed = url.trim();

  // Pattern matches:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  // - https://youtube.com/embed/VIDEO_ID
  const ytRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&].*)?$/;

  const match = trimmed.match(ytRegex);

  if (match && match[1]) {
    const videoId = match[1];
    return {
      isValid: true,
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    };
  }

  return {
    isValid: false,
    error: 'رابط يوتيوب غير صالح. يجب أن يكون الرابط من موقع youtube.com أو youtu.be',
  };
};
