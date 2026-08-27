import axios from "axios";
import type { Note } from "../types/note";

interface NoteResponseProps {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
): Promise<NoteResponseProps> {
  const response = await axios.get<NoteResponseProps>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search,
        page,
        perPage,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    },
  );
  return response.data;
}

interface NoteCreateProps {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(newNote: NoteCreateProps): Promise<Note> {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    {
      title: newNote.title,
      content: newNote.content,
      tag: newNote.tag,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    },
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    },
  );
  return response.data;
}
