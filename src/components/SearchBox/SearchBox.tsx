import css from "./SearchBox.module.css";

type SearchBoxProps = {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBox({ onSearchChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      onChange={onSearchChange}
      placeholder="Search notes"
    />
  );
}
