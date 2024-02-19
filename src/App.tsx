import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { useState } from "react";
import { NoteData, RawNote, Tag } from "./types";
import { v4 } from "uuid";
import { useLocaleStorage } from "./utils/useLocaleStorage";
import MainPage from "./components/MainPage";

const App = () => {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  const addNote = ({ tags, ...data }: NoteData) => {
    const newNote = {
      id: v4(),
      ...data,
      tagIds: tags.map((tag) => tag.value),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const createTag = (tag: Tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/new"
          element={
            <CreateNote
              availableTags={tags}
              createTag={createTag}
              onSubmit={addNote}
            />
          }
        />
        <Route path="/:id">
          <Route index element={<h1>Detay Sayfası</h1>} />
          <Route path="edit" element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
