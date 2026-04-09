export type KanaType = 'hiragana' | 'katakana' | 'dakuten' | 'yoon';

export interface CharacterData {
  id: string;      // 例如: 'h-a', 'k-ka'
  char: string;    // 日文字元
  romaji: string;  // 羅馬拼音
  type: KanaType;  // 類型
}

export const kanaData: CharacterData[] = [
  // --- 平假名 (Hiragana) 基本五十音 ---
  // A 行
  { id: 'h-a', char: 'あ', romaji: 'a', type: 'hiragana' },
  { id: 'h-i', char: 'い', romaji: 'i', type: 'hiragana' },
  { id: 'h-u', char: 'う', romaji: 'u', type: 'hiragana' },
  { id: 'h-e', char: 'え', romaji: 'e', type: 'hiragana' },
  { id: 'h-o', char: 'お', romaji: 'o', type: 'hiragana' },
  // Ka 行
  { id: 'h-ka', char: 'か', romaji: 'ka', type: 'hiragana' },
  { id: 'h-ki', char: 'き', romaji: 'ki', type: 'hiragana' },
  { id: 'h-ku', char: 'く', romaji: 'ku', type: 'hiragana' },
  { id: 'h-ke', char: 'け', romaji: 'ke', type: 'hiragana' },
  { id: 'h-ko', char: 'こ', romaji: 'ko', type: 'hiragana' },
  // Sa 行
  { id: 'h-sa', char: 'さ', romaji: 'sa', type: 'hiragana' },
  { id: 'h-shi', char: 'し', romaji: 'shi', type: 'hiragana' },
  { id: 'h-su', char: 'す', romaji: 'su', type: 'hiragana' },
  { id: 'h-se', char: 'せ', romaji: 'se', type: 'hiragana' },
  { id: 'h-so', char: 'そ', romaji: 'so', type: 'hiragana' },
  // Ta 行
  { id: 'h-ta', char: 'た', romaji: 'ta', type: 'hiragana' },
  { id: 'h-chi', char: 'ち', romaji: 'chi', type: 'hiragana' },
  { id: 'h-tsu', char: 'つ', romaji: 'tsu', type: 'hiragana' },
  { id: 'h-te', char: 'て', romaji: 'te', type: 'hiragana' },
  { id: 'h-to', char: 'と', romaji: 'to', type: 'hiragana' },
  // Na 行
  { id: 'h-na', char: 'な', romaji: 'na', type: 'hiragana' },
  { id: 'h-ni', char: 'に', romaji: 'ni', type: 'hiragana' },
  { id: 'h-nu', char: 'ぬ', romaji: 'nu', type: 'hiragana' },
  { id: 'h-ne', char: 'ね', romaji: 'ne', type: 'hiragana' },
  { id: 'h-no', char: 'の', romaji: 'no', type: 'hiragana' },
  // Ha 行
  { id: 'h-ha', char: 'は', romaji: 'ha', type: 'hiragana' },
  { id: 'h-hi', char: 'ひ', romaji: 'hi', type: 'hiragana' },
  { id: 'h-fu', char: 'ふ', romaji: 'fu', type: 'hiragana' },
  { id: 'h-he', char: 'へ', romaji: 'he', type: 'hiragana' },
  { id: 'h-ho', char: 'ほ', romaji: 'ho', type: 'hiragana' },
  // Ma 行
  { id: 'h-ma', char: 'ま', romaji: 'ma', type: 'hiragana' },
  { id: 'h-mi', char: 'み', romaji: 'mi', type: 'hiragana' },
  { id: 'h-mu', char: 'む', romaji: 'mu', type: 'hiragana' },
  { id: 'h-me', char: 'め', romaji: 'me', type: 'hiragana' },
  { id: 'h-mo', char: 'も', romaji: 'mo', type: 'hiragana' },
  // Ya 行
  { id: 'h-ya', char: 'や', romaji: 'ya', type: 'hiragana' },
  { id: 'h-yu', char: 'ゆ', romaji: 'yu', type: 'hiragana' },
  { id: 'h-yo', char: 'よ', romaji: 'yo', type: 'hiragana' },
  // Ra 行
  { id: 'h-ra', char: 'ら', romaji: 'ra', type: 'hiragana' },
  { id: 'h-ri', char: 'り', romaji: 'ri', type: 'hiragana' },
  { id: 'h-ru', char: 'る', romaji: 'ru', type: 'hiragana' },
  { id: 'h-re', char: 'れ', romaji: 're', type: 'hiragana' },
  { id: 'h-ro', char: 'ろ', romaji: 'ro', type: 'hiragana' },
  // Wa 行
  { id: 'h-wa', char: 'わ', romaji: 'wa', type: 'hiragana' },
  { id: 'h-wo', char: 'を', romaji: 'wo', type: 'hiragana' },
  // N
  { id: 'h-n', char: 'ん', romaji: 'n', type: 'hiragana' },

  // --- 片假名 (Katakana) 基本五十音 ---
  { id: 'k-a', char: 'ア', romaji: 'a', type: 'katakana' },
  { id: 'k-i', char: 'イ', romaji: 'i', type: 'katakana' },
  { id: 'k-u', char: 'ウ', romaji: 'u', type: 'katakana' },
  { id: 'k-e', char: 'エ', romaji: 'e', type: 'katakana' },
  { id: 'k-o', char: 'オ', romaji: 'o', type: 'katakana' },
  
  { id: 'k-ka', char: 'カ', romaji: 'ka', type: 'katakana' },
  { id: 'k-ki', char: 'キ', romaji: 'ki', type: 'katakana' },
  { id: 'k-ku', char: 'ク', romaji: 'ku', type: 'katakana' },
  { id: 'k-ke', char: 'ケ', romaji: 'ke', type: 'katakana' },
  { id: 'k-ko', char: 'コ', romaji: 'ko', type: 'katakana' },

  { id: 'k-sa', char: 'サ', romaji: 'sa', type: 'katakana' },
  { id: 'k-shi', char: 'シ', romaji: 'shi', type: 'katakana' },
  { id: 'k-su', char: 'ス', romaji: 'su', type: 'katakana' },
  { id: 'k-se', char: 'セ', romaji: 'se', type: 'katakana' },
  { id: 'k-so', char: 'ソ', romaji: 'so', type: 'katakana' },

  { id: 'k-ta', char: 'タ', romaji: 'ta', type: 'katakana' },
  { id: 'k-chi', char: 'チ', romaji: 'chi', type: 'katakana' },
  { id: 'k-tsu', char: 'ツ', romaji: 'tsu', type: 'katakana' },
  { id: 'k-te', char: 'テ', romaji: 'te', type: 'katakana' },
  { id: 'k-to', char: 'ト', romaji: 'to', type: 'katakana' },

  { id: 'k-na', char: 'ナ', romaji: 'na', type: 'katakana' },
  { id: 'k-ni', char: 'ニ', romaji: 'ni', type: 'katakana' },
  { id: 'k-nu', char: 'ヌ', romaji: 'nu', type: 'katakana' },
  { id: 'k-ne', char: 'ネ', romaji: 'ne', type: 'katakana' },
  { id: 'k-no', char: 'ノ', romaji: 'no', type: 'katakana' },

  { id: 'k-ha', char: 'ハ', romaji: 'ha', type: 'katakana' },
  { id: 'k-hi', char: 'ヒ', romaji: 'hi', type: 'katakana' },
  { id: 'k-fu', char: 'フ', romaji: 'fu', type: 'katakana' },
  { id: 'k-he', char: 'ヘ', romaji: 'he', type: 'katakana' },
  { id: 'k-ho', char: 'ホ', romaji: 'ho', type: 'katakana' },

  { id: 'k-ma', char: 'マ', romaji: 'ma', type: 'katakana' },
  { id: 'k-mi', char: 'ミ', romaji: 'mi', type: 'katakana' },
  { id: 'k-mu', char: 'ム', romaji: 'mu', type: 'katakana' },
  { id: 'k-me', char: 'メ', romaji: 'me', type: 'katakana' },
  { id: 'k-mo', char: 'モ', romaji: 'mo', type: 'katakana' },

  { id: 'k-ya', char: 'ヤ', romaji: 'ya', type: 'katakana' },
  { id: 'k-yu', char: 'ユ', romaji: 'yu', type: 'katakana' },
  { id: 'k-yo', char: 'ヨ', romaji: 'yo', type: 'katakana' },

  { id: 'k-ra', char: 'ラ', romaji: 'ra', type: 'katakana' },
  { id: 'k-ri', char: 'リ', romaji: 'ri', type: 'katakana' },
  { id: 'k-ru', char: 'ル', romaji: 'ru', type: 'katakana' },
  { id: 'k-re', char: 'レ', romaji: 're', type: 'katakana' },
  { id: 'k-ro', char: 'ロ', romaji: 'ro', type: 'katakana' },

  { id: 'k-wa', char: 'ワ', romaji: 'wa', type: 'katakana' },
  { id: 'k-wo', char: 'ヲ', romaji: 'wo', type: 'katakana' },
  
  { id: 'k-n', char: 'ン', romaji: 'n', type: 'katakana' },

  // --- 濁音與半濁音 (Dakuten & Handakuten) ---
  // 平假名
  { id: 'hd-ga', char: 'が', romaji: 'ga', type: 'dakuten' },
  { id: 'hd-gi', char: 'ぎ', romaji: 'gi', type: 'dakuten' },
  { id: 'hd-gu', char: 'ぐ', romaji: 'gu', type: 'dakuten' },
  { id: 'hd-ge', char: 'げ', romaji: 'ge', type: 'dakuten' },
  { id: 'hd-go', char: 'ご', romaji: 'go', type: 'dakuten' },

  { id: 'hd-za', char: 'ざ', romaji: 'za', type: 'dakuten' },
  { id: 'hd-ji', char: 'じ', romaji: 'ji', type: 'dakuten' },
  { id: 'hd-zu', char: 'ず', romaji: 'zu', type: 'dakuten' },
  { id: 'hd-ze', char: 'ぜ', romaji: 'ze', type: 'dakuten' },
  { id: 'hd-zo', char: 'ぞ', romaji: 'zo', type: 'dakuten' },

  { id: 'hd-da', char: 'だ', romaji: 'da', type: 'dakuten' },
  { id: 'hd-ji2', char: 'ぢ', romaji: 'ji', type: 'dakuten' }, // 常被標記為 ji 或 dji
  { id: 'hd-zu2', char: 'づ', romaji: 'zu', type: 'dakuten' }, // 常被標記為 zu 或 dzu
  { id: 'hd-de', char: 'で', romaji: 'de', type: 'dakuten' },
  { id: 'hd-do', char: 'ど', romaji: 'do', type: 'dakuten' },

  { id: 'hd-ba', char: 'ば', romaji: 'ba', type: 'dakuten' },
  { id: 'hd-bi', char: 'び', romaji: 'bi', type: 'dakuten' },
  { id: 'hd-bu', char: 'ぶ', romaji: 'bu', type: 'dakuten' },
  { id: 'hd-be', char: 'べ', romaji: 'be', type: 'dakuten' },
  { id: 'hd-bo', char: 'ぼ', romaji: 'bo', type: 'dakuten' },

  { id: 'hd-pa', char: 'ぱ', romaji: 'pa', type: 'dakuten' },
  { id: 'hd-pi', char: 'ぴ', romaji: 'pi', type: 'dakuten' },
  { id: 'hd-pu', char: 'ぷ', romaji: 'pu', type: 'dakuten' },
  { id: 'hd-pe', char: 'ぺ', romaji: 'pe', type: 'dakuten' },
  { id: 'hd-po', char: 'ぽ', romaji: 'po', type: 'dakuten' },

  // --- 稍微列舉一部份拗音 (Yoon) 作為示範，為避免檔案過長，其他可在後續補充 ---
  { id: 'hy-kya', char: 'きゃ', romaji: 'kya', type: 'yoon' },
  { id: 'hy-kyu', char: 'きゅ', romaji: 'kyu', type: 'yoon' },
  { id: 'hy-kyo', char: 'きょ', romaji: 'kyo', type: 'yoon' },

  { id: 'hy-sha', char: 'しゃ', romaji: 'sha', type: 'yoon' },
  { id: 'hy-shu', char: 'しゅ', romaji: 'shu', type: 'yoon' },
  { id: 'hy-sho', char: 'しょ', romaji: 'sho', type: 'yoon' },
  
  { id: 'hy-cha', char: 'ちゃ', romaji: 'cha', type: 'yoon' },
  { id: 'hy-chu', char: 'ちゅ', romaji: 'chu', type: 'yoon' },
  { id: 'hy-cho', char: 'ちょ', romaji: 'cho', type: 'yoon' },
];
