import type { Episode } from "../types";

interface EpisodeListProps {
  episodes: Episode[];

  onToggleWatched: (id: number) => void;
  onEditEpisode: (episode: Episode) => void;
  onDeleteEpisode: (id: number) => void;
}

function EpisodeList(props: EpisodeListProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Episodes</h3>

        <span className="text-sm text-gray-500">
          {props.episodes.length} episodes
        </span>
      </div>

      {props.episodes.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-gray-500">No episodes yet.</p>
        </div>
      )}

      <div className="space-y-4">
        {props.episodes.map(function (episode) {
          return (
            <div
              key={episode.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Episode {episode.episodeNumber}
                  </p>

                  <h4 className="mt-1 text-lg font-semibold text-gray-900">
                    {episode.title}
                  </h4>

                  <p
                    className={
                      episode.watched
                        ? "mt-2 text-sm font-medium text-green-600"
                        : "mt-2 text-sm text-gray-500"
                    }
                  >
                    {episode.watched ? "Watched" : "Not Watched"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className={
                      episode.watched
                        ? "rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        : "rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    }
                    onClick={() => {
                      props.onToggleWatched(episode.id);
                    }}
                  >
                    {episode.watched
                      ? "Mark as Not Watched"
                      : "Mark as Watched"}
                  </button>

                  <button
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    onClick={() => {
                      props.onEditEpisode(episode);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    onClick={() => {
                      props.onDeleteEpisode(episode.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EpisodeList;
