import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

// import type { Note } from "../../types/note";
import * as services from "../../services/noteService";
import { useDebouncedCallback } from "use-debounce";

import css from "./App.module.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const perPage = 12;

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", search, page, perPage],
    queryFn: () => services.fetchNotes(search, page, perPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data.notes.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [isSuccess, data]);

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    1000,
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button
          className={css.button}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create note +
        </button>
        <SearchBox onSearchChange={handleChange} />
      </header>

      <main>
        {isSuccess && totalPages > 1 && (
          <Pagination
            currentPage={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        )}

        {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

        {isLoading && <Loader />}

        {isError && <ErrorMessage />}

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <NoteForm onClose={handleCloseModal} />
          </Modal>
        )}
      </main>
    </div>
  );
}
