import * as yup from "yup";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import css from "./NoteForm.module.css";
import toast from "react-hot-toast";

type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface NoteFormValues {
  title: string;
  content: string;
  tag: Tag;
}

interface NoteFormProps {
  onClose: () => void;
}

const NoteFormSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: yup.string().max(500, "Note is too long"),
  tag: yup
    .string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const handleSubmit = async (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>,
  ) => {
    try {
      await createNote(values);
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      actions.resetForm();
      onClose();
    } catch {
      toast.error("This didn't work.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="p" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="p" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="p" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
