/**
 * Block with location instance id to which the user should come
 */
export interface LocationInstanceBlock {
  type: 'locationInstance';
  data: {
    /**
     * Location instance id to which the user should come
     */
    locationInstanceId: string;
  }
}

/**
 * Text header block data
 */
export interface HeaderBlock {
  type: 'header';
  data: {
    /**
     * Header level
     */
    level: number;

    /**
     * Header text
     */
    text: string;
  }
}

/**
 * Text paragraph block data
 */
export interface ParagraphBlock {
  type: 'paragraph';
}

/**
 * Text quote block data
 */
export interface QuoteBlock {
  type: 'quote';
}

/**
 * Text delimiter block data
 */
export interface DelimiterBlock {
  type: 'delimiter';
}

/**
 * All text blocks
 */
export type TextQuestBlock =
  | HeaderBlock
  | ParagraphBlock
  | QuoteBlock
  | DelimiterBlock;

/**
 * All quest blocks
 */
export type QuestBlock =
  | LocationInstanceBlock
  | TextQuestBlock;
