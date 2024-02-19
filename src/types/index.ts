export type Tag = {
  label: string;
  value: string;
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Note = {
  id: string;
} & NoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tags: string[];
};

export type RawNote = {
  id: string;
} & RawNoteData;
