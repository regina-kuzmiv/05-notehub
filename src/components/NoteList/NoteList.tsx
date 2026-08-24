import css from "./NoteList.module.css";
import { useState } from "react";
import fetchNotes from "../../services/noteService";

export default function NoteList() {
    const [search, setSearch] = useState("");
    const {
      data,
      error: isSuccess,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["note", search],
      queryFn: () => fetchNotes(search),
    });
    return (
        <ul className={css.list}>
  <li className={css.listItem}>
    <h2 className={css.title}>Note title</h2>
    <p className={css.content}>Note content</p>
    <div className={css.footer}>
      <span className={css.tag}>Note tag</span>
      <button className={css.button} onClick={()=>setSearch()}>Delete</button>
    </div>
  </li>
</ul>;
    )
}

