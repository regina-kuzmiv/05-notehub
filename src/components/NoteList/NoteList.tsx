import css from "./NoteList.module.css";
import { useMutation } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import type Note from "../../types/note";

export default function NoteList({ notes }: { notes: Note[] }) {
  const mutation = useMutation({
    mutationFn: deleteNote,
  });

  const handleDeleteNote = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDeleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
