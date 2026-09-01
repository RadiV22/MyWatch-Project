import type { Show } from "../types";

interface ShowCardProps {
  show: Show;
  onSelect: (id: number) => void;
}

function ShowCard(props: ShowCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {props.show.poster && (
        <img
          className="h-56 w-full object-cover"
          src={props.show.poster}
          alt={props.show.title}
        />
      )}

      <div className="p-5">
        <p className="mb-2 text-sm font-medium text-blue-600">
          {props.show.type}
        </p>

        <h2 className="mb-2 text-xl font-bold text-gray-900">
          {props.show.title}
        </h2>

        <p className="mb-5 text-sm leading-6 text-gray-500">
          {props.show.description}
        </p>

        <button
          className="w-full rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          onClick={() => {
            props.onSelect(props.show.id);
          }}
        >
          View Detail
        </button>
      </div>
    </div>
  );
}

export default ShowCard;
