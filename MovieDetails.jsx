import { useState } from "react";
import "./MovieDetails.css";

function MovieDetails({ movie, onBack, onContinue }) {
  const [language, setLanguage] = useState(movie.languages[0]);
  const [format, setFormat] = useState(movie.formats[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [members, setMembers] = useState(1);

  const price =
    format === "3D"
      ? movie.price3D
      : movie.price2D;

  const total = price * members;

  const dates = [
    "2026-09-01",
    "2026-09-02",
    "2026-09-03",
    "2026-09-04",
  ];

  const times = [
    "10:30 AM",
    "01:30 PM",
    "04:15 PM",
    "06:15 PM",
    "09:30 PM",
  ];

  const continueBooking = () => {
    if (!language) {
      alert("Please select a language.");
      return;
    }

    if (!format) {
      alert("Please select a format.");
      return;
    }

    if (!date) {
      alert("Please select a date.");
      return;
    }

    if (!time) {
      alert("Please select a show time.");
      return;
    }

    if (!members || members < 1) {
      alert("Please select number of members.");
      return;
    }

    onContinue({
      language,
      format,
      date,
      time,
      members,
      price,
      total,
    });
  };

  return (
    <div className="details-page">

      {/* NAVBAR */}
      <header className="details-navbar">

        <button
          className="details-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <h2>
          CINEBLUE<span>MOON</span>
        </h2>

      </header>


      {/* MAIN */}
      <main className="details-container">

        <div className="movie-details-card">


          {/* POSTER */}
          <div className="details-poster-box">

            <img
              src={movie.image}
              alt={movie.title}
            />

            <div className="poster-price">
              From ₹{movie.price2D}
            </div>

          </div>


          {/* MOVIE CONTENT */}
          <div className="details-content">

            <span className="details-label">
              MOVIE DETAILS
            </span>

            <h1>
              {movie.title}
            </h1>

            <div className="movie-meta">
              ⭐ {movie.rating}
              <span> • </span>
              {movie.release}
              <span> • </span>
              {movie.duration}
            </div>


            {/* DESCRIPTION */}
            <p className="details-description">
              {movie.description}
            </p>


            {/* CAST */}
            <div className="details-cast">

              <div>
                <span>CAST</span>
                <p>{movie.cast}</p>
              </div>

              <div>
                <span>DIRECTOR</span>
                <p>{movie.director}</p>
              </div>

              <div>
                <span>WRITER</span>
                <p>{movie.writer}</p>
              </div>

            </div>


            <div className="details-divider"></div>


            {/* LANGUAGE */}
            <div className="choice-section">

              <h3>
                Language
              </h3>

              <div className="choice-buttons">

                {movie.languages.map((item) => (
                  <button
                    key={item}
                    className={
                      language === item
                        ? "choice active"
                        : "choice"
                    }
                    onClick={() =>
                      setLanguage(item)
                    }
                  >
                    {item}
                  </button>
                ))}

              </div>

            </div>


            {/* FORMAT */}
            <div className="choice-section">

              <h3>
                Format
              </h3>

              <div className="choice-buttons">

                {movie.formats.map((item) => (
                  <button
                    key={item}
                    className={
                      format === item
                        ? "choice active"
                        : "choice"
                    }
                    onClick={() =>
                      setFormat(item)
                    }
                  >
                    {item}

                    <small>
                      {item === "2D"
                        ? ` ₹${movie.price2D}`
                        : ` ₹${movie.price3D}`}
                    </small>

                  </button>
                ))}

              </div>

            </div>


            {/* DATE */}
            <div className="choice-section">

              <h3>
                Select Date
              </h3>

              <div className="date-buttons">

                {dates.map((item) => (
                  <button
                    key={item}
                    className={
                      date === item
                        ? "date-btn active"
                        : "date-btn"
                    }
                    onClick={() =>
                      setDate(item)
                    }
                  >

                    <strong>
                      {new Date(
                        item + "T00:00:00"
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "short",
                        }
                      )}
                    </strong>

                    <span>
                      {new Date(
                        item + "T00:00:00"
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )}
                    </span>

                  </button>
                ))}

              </div>

            </div>


            {/* TIME */}
            <div className="choice-section">

              <h3>
                Show Time
              </h3>

              <div className="time-buttons">

                {times.map((item) => (
                  <button
                    key={item}
                    className={
                      time === item
                        ? "time-btn active"
                        : "time-btn"
                    }
                    onClick={() =>
                      setTime(item)
                    }
                  >
                    {item}
                  </button>
                ))}

              </div>

            </div>


            {/* MEMBERS */}
            <div className="members-section">

              <div>

                <h3>
                  Number of Members
                </h3>

                <small>
                  Select the number of tickets
                </small>

              </div>

              <div className="member-control">

                <button
                  onClick={() =>
                    setMembers(
                      Math.max(
                        1,
                        members - 1
                      )
                    )
                  }
                >
                  −
                </button>

                <strong>
                  {members}
                </strong>

                <button
                  onClick={() =>
                    setMembers(
                      Math.min(
                        10,
                        members + 1
                      )
                    )
                  }
                >
                  +
                </button>

              </div>

            </div>


            {/* SUMMARY */}
            <div className="details-summary">

              <div>

                <span>
                  {format} Ticket
                </span>

                <strong>
                  ₹{price} × {members}
                </strong>

              </div>

              <div>

                <span>
                  Selected
                </span>

                <strong>
                  {members}{" "}
                  {members === 1
                    ? "Ticket"
                    : "Tickets"}
                </strong>

              </div>

              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{total}
                </strong>

              </div>

            </div>


            {/* CONTINUE */}
            <button
              className="continue-details"
              onClick={continueBooking}
            >
              Continue to Seat Selection →
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default MovieDetails;