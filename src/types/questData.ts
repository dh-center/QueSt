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
 * Block with location coordinates
 */
export interface LocationFromCoordsBlock {
  type: 'approximationToCoordinates';
  data: {
    /**
     * Location latitude
     */
    latitude: number;

    /**
     * Location longitude
     */
    longitude: number;
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
 * Allocation task data
 */
export interface AllocationBlock {
  type: 'matchOptions';
  data: {
    /**
     * Task
     */
    task: string;

    /**
     * Answer options
     */
    options: {
      /**
       * Item to match
       */
      left: string;

      /**
       * Right answer
       */
      right: string;
    }[];
  }
}

/**
 * Dialog block data
 */
export interface DialogBlock {
  type: 'dialog';
  data: {
    messages: {
      /**
       * Is this message left-side
       */
      isLeft: boolean;

      /**
       * Message text
       */
      message: string;

      /**
       * Person id or 'user'
       */
      sender: string;

      /**
       * Text for button with users answer
       */
      reaction?: string;
    }[];
  }
}

/**
 * Highlighting inn text block data
 */
export interface HighlightingInTextBlock {
  type: 'answerInText';
  data: {
    /**
     * Task
     */
    task: string;

    /**
     * Text with highlighting
     */
    text: string;
  }
}

export interface CurrentTaskBlock {
  type: 'currentQuestTask';
  data: {
    /**
     * Information about current quest task
     */
    currentQuestTask: string;
  }
}

export interface ImageBlock {
  type: 'image';
  data: {
    /**
     * Information about image
     */
    caption?: string;

    /**
     * Url of image
     */
    file: {
      url: string
    };
  }
}

/**
 * Page block includes all text blocks
 */
export interface PageBlock {
  type: 'page',
  data: TextQuestBlock[],
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
 * All quest blocks (raw data from API)
 */
export type QuestBlock =
  | LocationInstanceBlock
  | LocationFromCoordsBlock
  | TextQuestBlock
  | TestBlock
  | QuestionBlock
  | AllocationBlock
  | DialogBlock
  | HighlightingInTextBlock
  | CurrentTaskBlock;

/**
 * All quest blocks after grouping
 */
export type GroupedQuestBlock =
  | LocationInstanceBlock
  | LocationFromCoordsBlock
  | PageBlock
  | TestBlock
  | QuestionBlock
  | AllocationBlock
  | DialogBlock
  | HighlightingInTextBlock
  | CurrentTaskBlock;

/**
 * All credit blocks
 */
export type CreditBlock =
  | ParagraphBlock
  | ImageBlock;

/**
 * Array of all text blocks
 */
export const textBlockTypes = ['header', 'paragraph', 'quote'];


/**
 * Checks that passed block is text block
 *
 * @param block - block to be checked
 */
export function isTextBlock(block: QuestBlock): block is TextQuestBlock {
  return textBlockTypes.some(type => type === block.type);
}

/**
 * Group series of text blocks in the quest data into one page
 *
 * @param data - data to be grouped
 */
export function groupQuestData(data: QuestBlock[]): GroupedQuestBlock[] {
  let i = 0;
  let currentTextBlocks: TextQuestBlock[] = [];

  const finalArray: GroupedQuestBlock[] = [];

  while (i < data.length) {
    const currentBlock = data[i];

    if (isTextBlock(currentBlock)) {
      currentTextBlocks = [...currentTextBlocks, currentBlock];
      const nextBlock = data[i + 1];

      if (!nextBlock || !isTextBlock(nextBlock)) {
        const pageBlock: PageBlock = {
          type: 'page',
          data: currentTextBlocks,
        };

        finalArray.push(pageBlock);
        currentTextBlocks = [];
      }
    } else {
      finalArray.push(currentBlock);
    }
    i++;
  }

  return finalArray;
}
