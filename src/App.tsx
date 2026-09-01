import { useEffect, useState, type ChangeEvent } from "react";

import type { Show, Episode } from "./types";
import ShowCard from "./components/ShowCard";
import ShowForm from "./components/ShowForm";
import EpisodeForm from "./components/EpisodeForm";
import EpisodeList from "./components/EpisodeList";

import "./App.css";

const initialSeriesList: Show[] = [
  {
    id: 1,
    title: "Demon Slayer",
    type: "TV Series",
    description: "A Story About Tanjiro",
    poster: "/images/demon_slayer.jpg",
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "TV Series",
    description:
      "tells the story of a chemistry teacher named Walter White who turns into a drug manufacturer for the sake of his family",
    poster: "/images/breaking_bad.jpg",
  },
];

const initialEpisodeList: Episode[] = [
  {
    id: 101,
    seriesId: 1,
    episodeNumber: 1,
    title: "Cruelty",
    watched: true,
  },
  {
    id: 102,
    seriesId: 1,
    episodeNumber: 2,
    title: "Trainer Sakonji Urokodaki",
    watched: false,
  },
  {
    id: 201,
    seriesId: 2,
    episodeNumber: 1,
    title: "Pilot",
    watched: true,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");

  const [seriesList, setSeriesList] = useState<Show[]>(() => {
    const savedSeries = localStorage.getItem("seriesList");

    if (savedSeries) {
      return JSON.parse(savedSeries) as Show[];
    }

    return initialSeriesList;
  });

  const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(null);

  const [episodeList, setEpisodeList] = useState<Episode[]>(() => {
    const savedEpisodes = localStorage.getItem("episodeList");

    if (savedEpisodes) {
      return JSON.parse(savedEpisodes) as Episode[];
    }

    return initialEpisodeList;
  });

  const [episodeForm, setEpisodeForm] = useState(false);
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [editingShow, setEditingShow] = useState<Show | null>(null);

  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("seriesList", JSON.stringify(seriesList));
  }, [seriesList]);

  useEffect(() => {
    localStorage.setItem("episodeList", JSON.stringify(episodeList));
  }, [episodeList]);

  function handleAddNew(): void {
    setTitle("");
    setType("");
    setDescription("");
    setPoster("");

    setShowForm(true);
  }

  function handleCancel(): void {
    setShowForm(false);

    setTitle("");
    setType("");
    setDescription("");
    setPoster("");
  }

  function handlePosterChange(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      if (typeof reader.result === "string") {
        setPoster(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }
  function handleSave(): void {
    if (
      title.trim() === "" ||
      type.trim() === "" ||
      description.trim() === ""
    ) {
      return;
    }

    const newShow: Show = {
      id: Date.now(),
      title: title,
      type: type,
      description: description,
      poster: poster,
    };

    setSeriesList([...seriesList, newShow]);

    setTitle("");
    setType("");
    setDescription("");
    setPoster("");

    setShowForm(false);
  }
  function handleSelectShow(id: number): void {
    setSelectedSeriesId(id);
    setShowForm(false);
  }

  function handleBack(): void {
    setSelectedSeriesId(null);

    setEpisodeForm(false);

    setEditingShow(null);
    setEditingEpisode(null);

    setTitle("");
    setType("");
    setDescription("");
    setPoster("");

    setEpisodeNumber(1);
    setEpisodeTitle("");
    setShowForm(false);
  }

  function handleAddEpisode(): void {
    setEditingEpisode(null);

    setEpisodeNumber(1);
    setEpisodeTitle("");

    setEpisodeForm(true);
  }

  function handleCancelEpisode(): void {
    setEpisodeForm(false);

    setEpisodeNumber(1);
    setEpisodeTitle("");
  }

  function handleSaveEpisode(): void {
    if (selectedSeriesId === null) {
      return;
    }

    if (episodeTitle.trim() === "") {
      return;
    }

    const newEpisode: Episode = {
      id: Date.now(),
      seriesId: selectedSeriesId,
      episodeNumber: episodeNumber,
      title: episodeTitle,
      watched: false,
    };

    setEpisodeList([...episodeList, newEpisode]);

    setEpisodeNumber(1);
    setEpisodeTitle("");

    setEpisodeForm(false);
  }

  const selectedShow = seriesList.find(function (show) {
    return show.id === selectedSeriesId;
  });

  const selectedEpisodes = episodeList.filter(function (episode) {
    return episode.seriesId === selectedSeriesId;
  });

  function handleEditShow(): void {
    if (!selectedShow) {
      return;
    }

    setEditingShow(selectedShow);

    setEpisodeForm(false);
    setEditingEpisode(null);

    setTitle(selectedShow.title);
    setType(selectedShow.type);
    setDescription(selectedShow.description);
    setPoster(selectedShow.poster);
  }

  function handleCancelEditShow(): void {
    setEditingShow(null);

    setTitle("");
    setType("");
    setDescription("");
    setPoster("");
  }

  function handleUpdateShow(): void {
    if (editingShow === null) {
      return;
    }

    const updatedSeriesList = seriesList.map(function (show) {
      if (show.id === editingShow.id) {
        return {
          ...show,
          title: title,
          type: type,
          description: description,
          poster: poster,
        };
      }

      return show;
    });

    setSeriesList(updatedSeriesList);

    setEditingShow(null);

    setTitle("");
    setType("");
    setDescription("");
    setPoster("");
  }

  function handleEditEpisode(episode: Episode): void {
    setEditingEpisode(episode);

    setEpisodeForm(false);
    setEditingShow(null);

    setEpisodeNumber(episode.episodeNumber);

    setEpisodeTitle(episode.title);
  }

  function handleCancelEditEpisode(): void {
    setEditingEpisode(null);

    setEpisodeNumber(1);
    setEpisodeTitle("");
  }

  function handleUpdateEpisode(): void {
    if (editingEpisode === null) {
      return;
    }

    const updatedEpisodeList = episodeList.map(function (episode) {
      if (episode.id === editingEpisode.id) {
        return {
          ...episode,
          episodeNumber: episodeNumber,
          title: episodeTitle,
        };
      }

      return episode;
    });

    setEpisodeList(updatedEpisodeList);

    setEditingEpisode(null);

    setEpisodeNumber(1);
    setEpisodeTitle("");
  }

  function handleDeleteEpisode(id: number): void {
    const updatedEpisodeList = episodeList.filter(function (episode) {
      return episode.id !== id;
    });

    setEpisodeList(updatedEpisodeList);
  }

  function handleDeleteShow(): void {
    if (selectedSeriesId === null) {
      return;
    }

    const updatedSeriesList = seriesList.filter(function (show) {
      return show.id !== selectedSeriesId;
    });

    const updatedEpisodeList = episodeList.filter(function (episode) {
      return episode.seriesId !== selectedSeriesId;
    });

    setSeriesList(updatedSeriesList);

    setEpisodeList(updatedEpisodeList);

    setSelectedSeriesId(null);

    setEditingShow(null);
    setEditingEpisode(null);

    setEpisodeForm(false);

    setTitle("");
    setType("");
    setDescription("");
    setPoster("");

    setEpisodeNumber(1);
    setEpisodeTitle("");
  }

  function handleToggleWatched(id: number): void {
    const updatedEpisodeList = episodeList.map(function (episode) {
      if (episode.id === id) {
        return {
          ...episode,
          watched: !episode.watched,
        };
      }

      return episode;
    });

    setEpisodeList(updatedEpisodeList);
  }

  const watchedEpisodeCount = selectedEpisodes.reduce(function (
    total,
    episode,
  ) {
    if (episode.watched) {
      return total + 1;
    }

    return total;
  }, 0);

  const progress =
    selectedEpisodes.length === 0
      ? 0
      : Math.round((watchedEpisodeCount / selectedEpisodes.length) * 100);

  const filteredSeriesList = seriesList.filter(function (show) {
    return show.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <header className="mb-10 border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-bold text-blue-600">MyWatch</h1>

          <p className="mt-1 text-sm text-gray-500">
            Your personal watch tracker
          </p>
        </header>
        {selectedShow ? (
          <>
            {editingShow ? (
              <ShowForm
                isEditing={true}
                title={title}
                type={type}
                description={description}
                poster={poster}
                onTitleChange={setTitle}
                onTypeChange={setType}
                onDescriptionChange={setDescription}
                onPosterChange={handlePosterChange}
                onSave={handleUpdateShow}
                onCancel={handleCancelEditShow}
              />
            ) : editingEpisode ? (
              <EpisodeForm
                isEditing={true}
                episodeNumber={episodeNumber}
                episodeTitle={episodeTitle}
                onEpisodeNumberChange={setEpisodeNumber}
                onEpisodeTitleChange={setEpisodeTitle}
                onSave={handleUpdateEpisode}
                onCancel={handleCancelEditEpisode}
              />
            ) : episodeForm ? (
              <EpisodeForm
                isEditing={false}
                episodeNumber={episodeNumber}
                episodeTitle={episodeTitle}
                onEpisodeNumberChange={setEpisodeNumber}
                onEpisodeTitleChange={setEpisodeTitle}
                onSave={handleSaveEpisode}
                onCancel={handleCancelEpisode}
              />
            ) : (
              <div className="mx-auto max-w-4xl">
                <button
                  className="mb-6 font-medium text-gray-600 transition hover:text-gray-900"
                  onClick={handleBack}
                >
                  ← Back
                </button>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr]">
                    <div>
                      {selectedShow.poster && (
                        <img
                          className="h-80 w-full rounded-lg object-cover"
                          src={selectedShow.poster}
                          alt={selectedShow.title}
                        />
                      )}
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-medium text-blue-600">
                        {selectedShow.type}
                      </p>

                      <h2 className="mb-3 text-3xl font-bold text-gray-900">
                        {selectedShow.title}
                      </h2>

                      <p className="mb-6 leading-7 text-gray-600">
                        {selectedShow.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <button
                          className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                          onClick={handleEditShow}
                        >
                          Edit Show
                        </button>

                        <button
                          className="rounded-lg border border-red-300 px-4 py-2 font-medium text-red-600 transition hover:bg-red-50"
                          onClick={handleDeleteShow}
                        >
                          Delete Show
                        </button>

                        <button
                          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                          onClick={handleAddEpisode}
                        >
                          + Add Episode
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Progress
                      </h3>

                      <span className="font-semibold text-blue-600">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                      {watchedEpisodeCount} / {selectedEpisodes.length} episodes
                      watched
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <EpisodeList
                    episodes={selectedEpisodes}
                    onToggleWatched={handleToggleWatched}
                    onEditEpisode={handleEditEpisode}
                    onDeleteEpisode={handleDeleteEpisode}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            {showForm && (
              <ShowForm
                isEditing={false}
                title={title}
                type={type}
                description={description}
                poster={poster}
                onTitleChange={setTitle}
                onTypeChange={setType}
                onDescriptionChange={setDescription}
                onPosterChange={handlePosterChange}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}

            {!showForm && (
              <>
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      My Watchlist
                    </h2>

                    <p className="mt-2 text-gray-500">
                      Keep track of your favorite shows and movies.
                    </p>
                  </div>

                  <button
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                    onClick={handleAddNew}
                  >
                    + Add New
                  </button>
                </div>

                <div className="mb-8">
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 sm:max-w-md"
                    type="text"
                    placeholder="Search show..."
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                    }}
                  />
                </div>

                {filteredSeriesList.length === 0 && (
                  <p className="text-gray-500">No shows found.</p>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredSeriesList.map(function (show) {
                    return (
                      <ShowCard
                        key={show.id}
                        show={show}
                        onSelect={handleSelectShow}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
