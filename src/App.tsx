import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { NoteData, RawNote, Tag } from "./types";
import { v4 } from "uuid";
import { useLocaleStorage } from "./utils/useLocaleStorage";
import MainPage from "./components/MainPage";
import { useMemo } from "react";
import DetailPage from "./components/DetailPage";
import Layout from "./components/Layout";

const App = () => {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.value)),
      })),
    [notes, tags]
  );

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

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    const updated = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.value),
          }
        : note
    );
    setNotes(updated);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={noteWithTags} availableTags={tags} />}
        />
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
        <Route element={<Layout notes={noteWithTags} />} path="/:id">
          <Route index element={<DetailPage deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                availableTags={tags}
                createTag={createTag}
                onSubmit={updateNote}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
