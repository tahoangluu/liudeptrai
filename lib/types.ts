export type ThemeId = 'rose' | 'red' | 'champagne' | 'elegant' | 'lavender' | 'sage';

export type FontStyleId = 'playfair' | 'cormorant' | 'dancing' | 'script';

export type TemplateCategoryId = 'rose' | 'elegant' | 'love' | 'mom' | 'friend' | 'romantic';

export interface CardTheme {
  id: ThemeId;
  name: string;
  emoji: string;
  description: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  accentColor: string;
  textColor: string;
  subtextColor: string;
  badgeBg: string;
  badgeText: string;
  sealColor: string;
  glowColor: string;
  patternOpacity: string;
  ornamentColor: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: TemplateCategoryId;
  defaultTheme: ThemeId;
  defaultRecipient: string;
  defaultSender: string;
  defaultGreeting: string;
  fontStyle: FontStyleId;
  headerBadge: string;
  badgeSubtitle: string;
  accentIcon: string;
  previewBg: string;
}

export interface GreetingCardData {
  id: string;
  templateId: string;
  themeId: ThemeId;
  recipient: string;
  sender: string;
  greeting: string;
  fontStyle: FontStyleId;
  createdAt: string;
  musicEnabled?: boolean;
}

export interface GreetingSuggestion {
  category: 'mom' | 'lover' | 'friend' | 'colleague' | 'teacher';
  categoryLabel: string;
  recipientPlaceholder: string;
  items: string[];
}
