export interface LocationInstanceBlock {
  type: 'locationInstance';
  data: {
    locationInstanceId: string;
  }
}

export interface HeaderBlock {
  type: 'header';
  data: {
    level: number;
    text: string;
  }
}

export interface ParagraphBlock {
  type: 'paragraph';
}

export interface QuoteBlock {
  type: 'quote';
}

export interface DelimiterBlock {
  type: 'delimiter';
}

export type TextQuestBlock =
  | HeaderBlock
  | ParagraphBlock
  | QuoteBlock
  | DelimiterBlock;

export type QuestBlock =
  | LocationInstanceBlock
  | HeaderBlock
  | ParagraphBlock
  |QuoteBlock
  |DelimiterBlock;
