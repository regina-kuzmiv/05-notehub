import css from "./SearchBox.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    1000,
  );
}

<input className={css.input} type="text" placeholder="Search notes" />;
