import { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import Modal from "../Modal/Modal"
import NoteForm from "../NoteForm/NoteForm"
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox"

import type { Note } from "../../types/note"
import * as services from "../../services/noteService"

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

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = async (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const handleCloseModal = () => {
  setIsModalOpen(false);
};

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button} onClick={()=>{setIsModalOpen(true)}}>Create note +</button>
        {/* Компонент SearchBox */}
    {/* Кнопка створення нотатки */}
  </header>
      <main>
        <Pagination
  currentPage={page}
  onPageChange={setPage}
  totalPages={totalPages}
/>
        {/* Компонент NoteList */
          <SearchForm onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        )}}
        
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <NoteForm onClose={handleCloseModal} />
          </Modal>
        )}
        
  </main>
</div>;

  )
}


// export default function NoteList() {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const { data, error, isSuccess, isLoading, isError } = useQuery({
//     queryKey: ["note", search, page],
//     queryFn: () => fetchNotes(search, page),
//     enabled: search !== "",
//   });
//   return (
//     <ul className={css.list}>
//       <li className={css.listItem}>
//         <h2 className={css.title}>Note title</h2>
//         <p className={css.content}>Note content</p>
//         <div className={css.footer}>
//           <span className={css.tag}>Note tag</span>
//           <button className={css.button} onClick={() => setPage(page + 1)}>
//             Delete
//           </button>
//         </div>
//       </li>
//     </ul>
//   );
// }
