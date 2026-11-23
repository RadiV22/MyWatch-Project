import type { Show } from "../types";

interface ShowCardProps {
  show: Show;
  onSelect: (id: number) => void;
}

function ShowCard(props: ShowCardProps) {
  return (
    <article className="watch-card">
      <div className="watch-card-poster">
        {props.show.poster ? (
          <img src={props.show.poster} alt={props.show.title} loading="lazy" />
        ) : (
          <div className="watch-poster-placeholder">
            <span aria-hidden="true">▶</span>
            <span>No poster yet</span>
          </div>
        )}

        <span className="watch-type">{props.show.type}</span>
      </div>

      <div className="watch-card-content">
        <h3>{props.show.title}</h3>

        <p className="watch-card-description">{props.show.description}</p>

        <button
          type="button"
          className="watch-detail-button"
          aria-label={`View details for ${props.show.title}`}
          onClick={() => props.onSelect(props.show.id)}
        >
          View details
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}

export default ShowCard;
