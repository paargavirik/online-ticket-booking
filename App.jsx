import { useState } from "react";
import "./App.css";

import MovieDetails from "./MovieDetails";
import SeatSelection from "./SeatSelection";

import logo from "./assets/cinebluemoon-logo.png";

import movie1 from "./assets/movie1.jpg";
import movie2 from "./assets/movie2.jpg";
import movie3 from "./assets/movie3.jpg";
import movie4 from "./assets/movie4.jpg";
import movie5 from "./assets/movie5.jpg";
import movie6 from "./assets/movie6.jpg";

function App() {
  const [loginValue, setLoginValue] = useState("");
  const [otp, setOtp] = useState("");
  const [loginStep, setLoginStep] = useState("login");
  const [error, setError] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [showSeats, setShowSeats] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const movies = [
    {
      image: movie1,
      title: "Spider-Man: Brand New Day",
      rating: "8.5",
      languages: ["English"],
      formats: ["2D", "3D"],
      price2D: 180,
      price3D: 240,
      genre: "Action • Adventure • Superhero",
      duration: "2h 15m",
      release: "2026",
      description:
        "Peter Parker begins a new chapter as Spider-Man in a world that no longer remembers him. A dangerous new threat forces him to face a transformation he may not be able to control.",
      cast:
        "Tom Holland, Zendaya, Sadie Sink, Jacob Batalon",
      director: "Destin Daniel Cretton",
      writer: "Chris McKenna & Erik Sommers",
    },

    {
      image: movie2,
      title: "The Odyssey",
      rating: "8.8",
      languages: ["English"],
      formats: ["2D", "3D"],
      price2D: 180,
      price3D: 240,
      genre: "Epic • Adventure • Drama",
      duration: "2h 45m",
      release: "2026",
      description:
        "Christopher Nolan brings Homer's legendary epic to the big screen, following Odysseus on an extraordinary journey home after the Trojan War.",
      cast:
        "Matt Damon, Tom Holland, Robert Pattinson, Anne Hathaway",
      director: "Christopher Nolan",
      writer: "Christopher Nolan",
    },

    {
      image: movie3,
      title: "Avengers: Doomsday",
      rating: "9.0",
      languages: ["English"],
      formats: ["2D", "3D"],
      price2D: 200,
      price3D: 260,
      genre: "Action • Sci-Fi • Superhero",
      duration: "2h 40m",
      release: "2026",
      description:
        "Heroes from different universes are drawn into a deadly collision as an existential threat puts multiple worlds at risk.",
      cast:
        "Robert Downey Jr., Chris Hemsworth, Pedro Pascal, Anthony Mackie",
      director: "Anthony Russo & Joe Russo",
      writer: "Stephen McFeely",
    },

    {
      image: movie4,
      title: "Dune 3",
      rating: "8.9",
      languages: ["English"],
      formats: ["2D", "3D"],
      price2D: 200,
      price3D: 260,
      genre: "Sci-Fi • Adventure • Drama",
      duration: "2h 45m",
      release: "2026",
      description:
        "Paul Atreides faces the consequences of his rule as new threats, old allies and political conspiracies challenge the future of Arrakis.",
      cast:
        "Timothée Chalamet, Zendaya, Florence Pugh, Robert Pattinson",
      director: "Denis Villeneuve",
      writer: "Denis Villeneuve & Brian K. Vaughan",
    },

    {
      image: movie5,
      title: "Supergirl",
      rating: "8.3",
      languages: ["English"],
      formats: ["2D", "3D"],
      price2D: 180,
      price3D: 240,
      genre: "Action • Sci-Fi • Superhero",
      duration: "2h 05m",
      release: "2026",
      description:
        "Kara Zor-El joins an unlikely companion on an interstellar journey of vengeance and justice after a ruthless enemy strikes close to home.",
      cast:
        "Milly Alcock, Matthias Schoenaerts, Eve Ridley, Jason Momoa",
      director: "Craig Gillespie",
      writer: "Ana Nogueira",
    },

    {
      image: movie6,
      title: "Toy Story 5",
      rating: "8.6",
      languages: ["English"],
      formats: ["2D", "3D"],
      price2D: 180,
      price3D: 240,
      genre: "Animation • Adventure • Comedy",
      duration: "1h 45m",
      release: "2026",
      description:
        "Woody and the beloved Toy Story characters return for a new adventure as the toys face another unexpected chapter in their lives.",
      cast:
        "Tom Hanks, Tim Allen, Joan Cusack, Tony Hale",
      director: "Andrew Stanton & McKenna Harris",
      writer: "Andrew Stanton & McKenna Harris",
    },
  ];

  const sendOTP = () => {
    const value = loginValue.trim();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phonePattern = /^[0-9]{10}$/;

    if (!value) {
      setError(
        "Please enter your email or phone number."
      );
      return;
    }

    if (
      !emailPattern.test(value) &&
      !phonePattern.test(value)
    ) {
      setError(
        "Enter a valid email or 10-digit phone number."
      );
      return;
    }

    setError("");
    setLoginStep("otp");
  };

  const verifyOTP = () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }

    setError("");
    setLoginStep("home");
  };

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    setShowMovieDetails(true);
  };

  const startBooking = (details) => {
    setBookingDetails(details);
    setShowMovieDetails(false);
    setShowSeats(true);
  };

  if (
    showSeats &&
    selectedMovie &&
    bookingDetails
  ) {
    return (
      <SeatSelection
        movie={selectedMovie}
        bookingDetails={bookingDetails}
        onBack={() => {
          setShowSeats(false);
          setShowMovieDetails(true);
        }}
      />
    );
  }

  if (
    showMovieDetails &&
    selectedMovie
  ) {
    return (
      <MovieDetails
        movie={selectedMovie}
        onBack={() => {
          setShowMovieDetails(false);
          setSelectedMovie(null);
        }}
        onContinue={startBooking}
      />
    );
  }

  if (loginStep === "otp") {
    return (
      <div className="login-page">
        <div className="login-container">

          <img
            src={logo}
            alt="CineBlueMoon"
            className="logo"
          />

          <div className="login-box">

            <h1>
              Verify Your Account
            </h1>

            <p>
              Enter the 6-digit OTP sent to
            </p>

            <strong className="otp-contact">
              {loginValue}
            </strong>

            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
            />

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              className="signin-btn"
              onClick={verifyOTP}
            >
              Verify OTP
            </button>

            <button
              className="change-seat-btn"
              onClick={() => {
                setLoginStep("login");
                setOtp("");
                setError("");
              }}
            >
              ← Change Email / Phone
            </button>

          </div>

        </div>
      </div>
    );
  }

  if (loginStep === "home") {
    return (
      <div className="home-page">

        <header className="navbar">

          <img
            src={logo}
            alt="CineBlueMoon"
            className="nav-logo"
          />

          <nav className="nav-links">
            <a href="#home">
              Home
            </a>

            <a href="#movies">
              Movies
            </a>

            <a href="#coming">
              Coming Soon
            </a>
          </nav>

          <button
            className="logout-btn"
            onClick={() => {
              setLoginStep("login");
              setLoginValue("");
              setOtp("");
              setSelectedMovie(null);
              setBookingDetails(null);
            }}
          >
            Logout
          </button>

        </header>

        <section
          className="hero-section"
          id="home"
        >

          <div className="hero-content">

            <span className="hero-small">
              WELCOME TO
            </span>

            <h1>
              CineBlueMoon
            </h1>

            <p>
              Your movie. Your moment.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                document
                  .getElementById("movies")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Movies
            </button>

          </div>

        </section>

        <section
          className="movies-section"
          id="movies"
        >

          <div className="section-heading">

            <div>
              <span className="section-label">
                DISCOVER
              </span>

              <h2>
                Now Showing
              </h2>

              <p className="section-subtitle">
                Explore movies, discover stories
                and choose your perfect show.
              </p>
            </div>

          </div>

          <div className="movie-list">

            {movies.map(
              (movie, index) => (
                <article
                  className="movie-info-card"
                  key={index}
                >

                  <div className="movie-poster-area">

                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="movie-poster-large"
                    />

                    <div className="poster-rating">
                      ⭐ {movie.rating}
                    </div>

                  </div>

                  <div className="movie-info-content">

                    <div className="movie-title-row">

                      <div>

                        <span className="movie-number">
                          0{index + 1}
                        </span>

                        <h3>
                          {movie.title}
                        </h3>

                      </div>

                      <span className="movie-year">
                        {movie.release}
                      </span>

                    </div>

                    <div className="movie-tags">

                      <span>
                        {movie.genre}
                      </span>

                      <span>
                        {movie.duration}
                      </span>

                    </div>

                    <p className="movie-description">
                      {movie.description}
                    </p>

                    <div className="cast-crew">

                      <div>
                        <strong>
                          CAST
                        </strong>

                        <p>
                          {movie.cast}
                        </p>
                      </div>

                      <div>
                        <strong>
                          DIRECTOR
                        </strong>

                        <p>
                          {movie.director}
                        </p>
                      </div>

                      <div>
                        <strong>
                          WRITER
                        </strong>

                        <p>
                          {movie.writer}
                        </p>
                      </div>

                    </div>

                    <div className="movie-booking-row">

                      <div className="movie-options">

                        <span>
                          🌐 {movie.languages.join(
                            " / "
                          )}
                        </span>

                        <span>
                          🎞️ 2D / 3D
                        </span>

                        <span>
                          💰 From ₹
                          {movie.price2D}
                        </span>

                      </div>

                      <button
                        className="card-book-btn"
                        onClick={() =>
                          selectMovie(movie)
                        }
                      >
                        Book Now →
                      </button>

                    </div>

                  </div>

                </article>
              )
            )}

          </div>

        </section>

        <section className="features-section">

          <span className="section-label">
            CINEBLUEMOON EXPERIENCE
          </span>

          <h2>
            Everything you need for a
            perfect movie night.
          </h2>

          <div className="features">

            <div className="feature">
              <span>🎟️</span>

              <h3>
                Easy Booking
              </h3>

              <p>
                Choose your movie, show,
                seats and pay in a few clicks.
              </p>
            </div>

            <div className="feature">
              <span>💺</span>

              <h3>
                Smart Seat Selection
              </h3>

              <p>
                Pick your preferred seats
                or let the system find seats
                together.
              </p>
            </div>

            <div className="feature">
              <span>🎬</span>

              <h3>
                Premium Cinema
              </h3>

              <p>
                A smooth and cinematic
                booking experience.
              </p>
            </div>

          </div>

        </section>

        <footer className="footer">

          <img
            src={logo}
            alt="CineBlueMoon"
            className="footer-logo"
          />

          <p>
            © 2026 CineBlueMoon.
            All rights reserved.
          </p>

        </footer>

      </div>
    );
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <img
          src={logo}
          alt="CineBlueMoon"
          className="logo"
        />

        <div className="login-box">

          <h1>
            Welcome to CineBlueMoon
          </h1>

          <p>
            Sign in with your email or
            phone number
          </p>

          <input
            type="text"
            placeholder="Email address or phone number"
            value={loginValue}
            onChange={(e) =>
              setLoginValue(
                e.target.value
              )
            }
          />

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            className="signin-btn"
            onClick={sendOTP}
          >
            Send OTP
          </button>

          <div className="divider">
            <span>
              OR
            </span>
          </div>

          <button className="google-btn">
            G
            <span>
              Continue with Google
            </span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;