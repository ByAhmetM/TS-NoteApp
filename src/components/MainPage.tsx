import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import NoteCard from "./NoteCard";
import { Note, Tag } from "../types";
import { useMemo, useState } from "react";

type MainPageProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ notes, availableTags }: MainPageProps) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          (note.title === "" || note.title.toLowerCase().includes(title)) &&
          (selectedTags.length === 0 ||
            selectedTags.every((s_tag) =>
              note.tags.some((noteTag) => noteTag.value === s_tag.value)
            ))
        );
      }),
    [title, selectedTags, notes]
  );
  return (
    <div className="container py-5">
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notlar</h1>

        <Link to={"/new"}>
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      <Form className="mt-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                className="shadow"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Etikete Göre Ara</Form.Label>
              <ReactSelect
                options={availableTags}
                className="shadow text-black"
                isMulti
                //@ts-ignore
                onChange={(all_tags) => setSelectedTags(all_tags)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
