import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { useState } from "react";
import { NoteData } from "./types";

const App = () => {
  const [notes, setNotes] = useState();
  const [tags, setTags] = useState();

  const addNote = (note: NoteData) => {
    console.log(note);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Anasayfa</h1>} />
        <Route path="/new" element={<CreateNote onSubmit={addNote} />} />
        <Route path="/:id">
          <Route index element={<h1>Detay Sayfası</h1>} />
          <Route path="edit" element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
