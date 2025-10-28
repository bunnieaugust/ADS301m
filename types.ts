export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
}

export interface BaseQuestion {
  id: number;
  questionText: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_CHOICE;
  options: string[];
  correctAnswer: string;
}

export interface FillInTheBlankQuestion extends BaseQuestion {
  type: QuestionType.FILL_IN_THE_BLANK;
  correctAnswer: string; // The two words expected, case-insensitive
}

export type Question = MultipleChoiceQuestion | FillInTheBlankQuestion;

export interface LearningTopic {
  title: string;
  points: string[];
}

export interface Session {
  title: string;
  subtitle: string;
  topics: LearningTopic[];
}

export interface SessionInfo {
  id: number;
  title: string;
}
