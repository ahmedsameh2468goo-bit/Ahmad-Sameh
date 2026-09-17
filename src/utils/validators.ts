/**
 * Validation and sanitization helpers for Ahmad Sameh Portfolio
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

/**
 * General URL format validator (must start with http:// or https://)
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export type VideoPlatformType =
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'vimeo'
  | 'facebook'
  | 'x'
  | 'generic';

export interface VideoPlatformDetection {
  platform: VideoPlatformType;
  platformName: string;
  badgeLabel: string;
  watchLabel: string;
  videoId?: string;
  thumbnailUrl?: string;
  embedUrl?: string;
}

/**
 * Automatically detects the platform and video details from a video URL
 */
export const detectVideoPlatform = (url?: string): VideoPlatformDetection => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return {
      platform: 'generic',
      platformName: 'فيديو',
      badgeLabel: 'فيديو المشروع',
      watchLabel: 'مشاهدة الفيديو',
    };
  }

  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();

  // 1. YouTube
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    const ytMatch = trimmed.match(
      /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = ytMatch ? ytMatch[1] : undefined;
    return {
      platform: 'youtube',
      platformName: 'يوتيوب',
      badgeLabel: 'فيديو يوتيوب',
      watchLabel: 'مشاهدة على يوتيوب',
      videoId,
      thumbnailUrl: videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : undefined,
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : undefined,
    };
  }

  // 2. TikTok
  if (lower.includes('tiktok.com')) {
    return {
      platform: 'tiktok',
      platformName: 'تيك توك',
      badgeLabel: 'فيديو تيك توك',
      watchLabel: 'مشاهدة على تيك توك',
    };
  }

  // 3. Instagram
  if (lower.includes('instagram.com')) {
    return {
      platform: 'instagram',
      platformName: 'إنستغرام',
      badgeLabel: 'إنستغرام ريلز',
      watchLabel: 'مشاهدة على إنستغرام',
    };
  }

  // 4. Vimeo
  if (lower.includes('vimeo.com')) {
    return {
      platform: 'vimeo',
      platformName: 'فيميو',
      badgeLabel: 'فيديو فيميو',
      watchLabel: 'مشاهدة على فيميو',
    };
  }

  // 5. Facebook
  if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
    return {
      platform: 'facebook',
      platformName: 'فيسبوك',
      badgeLabel: 'فيديو فيسبوك',
      watchLabel: 'مشاهدة على فيسبوك',
    };
  }

  // 6. X (Twitter)
  if (lower.includes('twitter.com') || lower.includes('x.com')) {
    return {
      platform: 'x',
      platformName: 'إكس',
      badgeLabel: 'فيديو إكس',
      watchLabel: 'مشاهدة على إكس',
    };
  }

  // 7. Generic video / other platforms
  return {
    platform: 'generic',
    platformName: 'فيديو',
    badgeLabel: 'فيديو المشروع',
    watchLabel: 'مشاهدة الفيديو',
  };
};
