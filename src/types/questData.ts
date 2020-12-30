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
  data: {
    /**
     * Paragraph text
     */
    text: string;
  }
}

/**
 * Text quote block data
 */
export interface QuoteBlock {
  type: 'quote';
  data: {
    /**
     * Quote text
     */
    text: string;

    /**
     * Caption indicating the source of the quote
     */
    caption: string;
  }
}

/**
 * Text delimiter block data
 */
export interface DelimiterBlock {
  type: 'delimiter';
  data: {
    /**
     * Delimiter text
     */
    text: string;
  }
}

/**
 * Test block data
 */
export interface TestBlock {
  type: 'test';
  data: {
    /**
     * Question to answer
     */
    question: string;

    /**
     * Array of answers to choose from
     */
    answers: string[];

    /**
     * Index of right answer
     */
    correctAnswerIndex: number;

    /**
     * Message for right answer
     */
    rightAnswerMessage: string;

    /**
     * Message for wrong answer
     */
    wrongAnswerMessage: string;

    /**
     * Picture attachment for the test
     */
    picture?: string;
  }
}

/**
 * Question block data
 */
export interface QuestionBlock {
  type: 'question';
  data: {
    /**
     * Question to answer
     */
    question: string;

    /**
     * Correct answer
     */
    answer: string;

    /**
     * Message for right answer
     */
    rightAnswerMessage: string;

    /**
     * Message for wrong answer
     */
    wrongAnswerMessage: string;
  }
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
  | TextQuestBlock
  | TestBlock
  | QuestionBlock;
