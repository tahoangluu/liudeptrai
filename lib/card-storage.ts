import { GreetingCardData } from './types';
import { TEMPLATES } from './templates';

const STORAGE_KEY = 'thiep_2010_cards_v1';

/**
 * Encode UTF-8 string to URL-safe Base64
 */
function encodeData(data: GreetingCardData): string {
  try {
    const jsonStr = JSON.stringify(data);
    const utf8Bytes = encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    );
    return btoa(utf8Bytes)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (err) {
    console.error('Failed to encode card data:', err);
    return '';
  }
}

/**
 * Decode URL-safe Base64 to card data
 */
function decodeData(encoded: string): GreetingCardData | null {
  try {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = Array.from(binary, (char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)).join('');
    const jsonStr = decodeURIComponent(bytes);
    return JSON.parse(jsonStr) as GreetingCardData;
  } catch (err) {
    console.error('Failed to decode card data:', err);
    return null;
  }
}

/**
 * Generate a short, unique, aesthetic ID
 */
export function generateCardId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export interface ICardStorage {
  save(data: GreetingCardData): Promise<{ id: string; shareUrl: string }>;
  get(id: string, urlPayload?: string | null): Promise<GreetingCardData | null>;
  getAll(): Promise<GreetingCardData[]>;
  remove(id: string): Promise<void>;
  generateShareUrl(data: GreetingCardData): string;
}

class LocalCardStorage implements ICardStorage {
  private getStore(): Record<string, GreetingCardData> {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private saveStore(store: Record<string, GreetingCardData>): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (err) {
      console.warn('LocalStorage limit reached or disabled:', err);
    }
  }

  public async save(data: GreetingCardData): Promise<{ id: string; shareUrl: string }> {
    const store = this.getStore();
    store[data.id] = data;
    this.saveStore(store);

    const shareUrl = this.generateShareUrl(data);
    return { id: data.id, shareUrl };
  }

  public async get(id: string, urlPayload?: string | null): Promise<GreetingCardData | null> {
    // 1. If URL payload is available, decode it
    if (urlPayload) {
      const decoded = decodeData(urlPayload);
      if (decoded) {
        // Cache to local store
        const store = this.getStore();
        store[decoded.id || id] = decoded;
        this.saveStore(store);
        return decoded;
      }
    }

    // 2. Try to get from local store
    const store = this.getStore();
    if (store[id]) {
      return store[id];
    }

    // 3. Fallback: check if the id matches one of our default templates
    const matchingTemplate = TEMPLATES.find((t) => t.id === id);
    if (matchingTemplate) {
      return {
        id: matchingTemplate.id,
        templateId: matchingTemplate.id,
        themeId: matchingTemplate.defaultTheme,
        recipient: matchingTemplate.defaultRecipient,
        sender: matchingTemplate.defaultSender,
        greeting: matchingTemplate.defaultGreeting,
        fontStyle: matchingTemplate.fontStyle,
        createdAt: new Date().toISOString(),
      };
    }

    return null;
  }

  public async getAll(): Promise<GreetingCardData[]> {
    const store = this.getStore();
    return Object.values(store).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public async remove(id: string): Promise<void> {
    const store = this.getStore();
    delete store[id];
    this.saveStore(store);
  }

  public generateShareUrl(data: GreetingCardData): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const payload = encodeData(data);
    return `${origin}/card/${data.id}?d=${payload}`;
  }
}

// Export singleton instance of storage
export const cardStorage: ICardStorage = new LocalCardStorage();
