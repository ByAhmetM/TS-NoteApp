import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type CreateNoteProps = {
  onSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const CreateNote = ({
  onSubmit,
  createTag,
  availableTags,
}: CreateNoteProps) => {
  return (
    <div className="container p-4 ">
      <h1>Yeni Not Oluştur</h1>
      <NoteForm
        onSubmit={onSubmit}
        createTag={createTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default CreateNote;
