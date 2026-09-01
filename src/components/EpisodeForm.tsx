interface EpisodeFormProps {
  isEditing: boolean;

  episodeNumber: number;
  episodeTitle: string;

  onEpisodeNumberChange: (value: number) => void;
  onEpisodeTitleChange: (value: string) => void;

  onSave: () => void;
  onCancel: () => void;
}

function EpisodeForm(props: EpisodeFormProps) {
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {props.isEditing ? "Edit Episode" : "Add Episode"}
        </h2>

        <p className="mt-2 text-gray-500">
          {props.isEditing
            ? "Update this episode information."
            : "Add a new episode to this show."}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <label className="mb-2 block font-medium text-gray-700">
            Episode Number
          </label>

          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            type="number"
            min="1"
            value={props.episodeNumber}
            onChange={(event) => {
              props.onEpisodeNumberChange(Number(event.target.value));
            }}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-medium text-gray-700">
            Episode Title
          </label>

          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            type="text"
            placeholder="Enter episode title"
            value={props.episodeTitle}
            onChange={(event) => {
              props.onEpisodeTitleChange(event.target.value);
            }}
          />
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
            {props.isEditing ? "Save Changes" : "Save Episode"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EpisodeForm;
