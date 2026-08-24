import css from "./App.module.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page),
    // enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.nbPages ?? 0;

  const handleSearch = async (newSearch: string) => {
    setSearch(newTopic);
    setPage(1);
  };
}

<div className={css.app}>
  <header className={css.toolbar}>
    {/* Компонент SearchBox */}
    {/* Пагінація */}
    {/* Кнопка створення нотатки */}
  </header>
  <main>{/* Компонент NoteList */
  <SearchForm onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
    )}}
  </main>
</div>;

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
