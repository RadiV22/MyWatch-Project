import type { ChangeEvent } from "react";

interface ShowFormProps {
  isEditing: boolean;

  title: string;
  type: string;
  description: string;
  poster: string;

  onTitleChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;

  onPosterChange: (event: ChangeEvent<HTMLInputElement>) => void;

  onSave: () => void;
  onCancel: () => void;
}

function ShowForm(props: ShowFormProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {props.isEditing ? "Edit Show" : "Add New Show / Movie"}
        </h2>

        <p className="mt-2 text-gray-500">
          {props.isEditing
            ? "Update the information for this show."
            : "Add a new show or movie to your watchlist."}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <label className="mb-2 block font-medium text-gray-700">Title</label>

          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            type="text"
            placeholder="Enter title"
            value={props.title}
            onChange={(event) => {
              props.onTitleChange(event.target.value);
            }}
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block font-medium text-gray-700">Type</label>

          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            type="text"
            placeholder="Movie or TV Series"
            value={props.type}
            onChange={(event) => {
              props.onTypeChange(event.target.value);
            }}
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block font-medium text-gray-700">
            Description
          </label>

          <textarea
            className="min-h-32 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            placeholder="Write a short description..."
            value={props.description}
            onChange={(event) => {
              props.onDescriptionChange(event.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-medium text-gray-700">Poster</label>

          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-600"
            type="file"
            accept="image/*"
            onChange={props.onPosterChange}
          />

          {props.poster && (
            <img
              className="mt-4 h-56 w-40 rounded-lg object-cover"
              src={props.poster}
              alt="Poster preview"
            />
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
            onClick={props.onCancel}
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            onClick={props.onSave}
          >
            {props.isEditing ? "Save Changes" : "Save Show"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowForm;
