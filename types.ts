
export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface StyleClasses {
  // Add index signature to allow string-based access for iteration.
  [key: string]: string | undefined;
  base?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
  p?: string;
  ul?: string;
  ol?: string;
  li?: string;
  a?: string;
  strong?: string;
  em?: string;
  blockquote?: string;
  code?: string;
  pre?: string;
  table?: string;
  th?: string;
  td?: string;
  hr?: string;
}

export interface StylePreset {
  name: string;
  description: string;
  classes: StyleClasses;
}

export enum StylePresetName {
  Modern = 'Modern',
  Classic = 'Classic',
  Minimalist = 'Minimalist',
  Elegant = 'Elegant',
  Futuristic = 'Futuristic',
  Professional = 'Professional',
}

export type MarkdownElementType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'ul'
  | 'ol'
  | 'li'
  | 'a'
  | 'strong'
  | 'em'
  | 'blockquote'
  | 'code'
  | 'pre'
  | 'table'
  | 'th'
  | 'td'
  | 'hr';