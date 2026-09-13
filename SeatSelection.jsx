import { useMemo, useState } from "react";
import "./SeatSelection.css";
import PaymentPage from "./PaymentPage";

const ROWS = 10;
const LEFT_SEATS = 5;
const RIGHT_SEATS = 5;

const bookedSeats = new Set([
  "R1-C2",
  "R1-C4",
  "R2-C1",
  "R2-C7",
  "R3-C3",
  "R3-C9",
  "R4-C5",
  "R5-C2",
  "R5-C8",
  "R6-C4",
  "R7-C1",
  "R7-C7",
  "R8-C3",
  "R9-C6",
  "R10-C2",
]);

function SeatSelection({
  movie,
  bookingDetails,
  onBack,
}) {
  const {
    language,
    format,
    date,
    time,
    members: bookingMembers,
    price,
    total: bookingTotal,
  } = bookingDetails;

  const [members, setMembers] = useState(
    bookingMembers || 1
  );

  const [selectedSeats, setSelectedSeats] =
    useState([]);

  const [showPayment, setShowPayment] =
    useState(false);

  const seats = useMemo(() => {
    const list = [];

    for (let row = 1; row <= ROWS; row++) {
      for (
        let col = 1;
        col <= LEFT_SEATS + RIGHT_SEATS;
        col++
      ) {
        list.push({
          id: `R${row}-C${col}`,
          row,
          col,
          booked: bookedSeats.has(
            `R${row}-C${col}`
          ),
        });
      }
    }

    return list;
  }, []);

  const handleMembersChange = (value) => {
    const count = Math.max(
      1,
      Math.min(10, Number(value) || 1)
    );

    setMembers(count);
    setSelectedSeats([]);
  };

  const selectSeat = (seat) => {
    if (seat.booked) return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(
        selectedSeats.filter(
          (id) => id !== seat.id
        )
      );
      return;
    }

    if (
      selectedSeats.length >= members
    ) {
      return;
    }

    setSelectedSeats([
      ...selectedSeats,
      seat.id,
    ]);
  };

  const autoSelect = () => {
    const available = seats.filter(
      (seat) => !seat.booked
    );

    for (
      let row = 1;
      row <= ROWS;
      row++
    ) {
      const rowSeats = available.filter(
        (seat) => seat.row === row
      );

      for (
        let i = 0;
        i <= rowSeats.length - members;
        i++
      ) {
        const group = rowSeats.slice(
          i,
          i + members
        );

        const consecutive =
          group.every(
            (seat, index) =>
              index === 0 ||
              seat.col ===
                group[index - 1].col + 1
          );

        if (consecutive) {
          setSelectedSeats(
            group.map(
              (seat) => seat.id
            )
          );

          return;
        }
      }
    }

    alert(
      "Enough adjacent seats are not available."
    );
  };

  const total =
    selectedSeats.length * price;

  if (showPayment) {
    return (
      <PaymentPage
        movie={movie}
        members={members}
        selectedSeats={selectedSeats}
        total={total}
        language={language}
        format={format}
        date={date}
        time={time}
        price={price}
        onBack={() =>
          setShowPayment(false)
        }
      />
    );
  }

  return (
    <div className="seat-page">

      {/* NAVBAR */}

      <header className="seat-navbar">

        <div className="brand-area">

          <div className="brand-mark">
            ◐
          </div>

          <div>
            <h2>
              CINEBLUE
              <span>MOON</span>
            </h2>

            <small>
              YOUR MOVIE. YOUR MOMENT.
            </small>
          </div>

        </div>

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

      </header>


      {/* MOVIE INFORMATION */}

      <section className="movie-bar">

        <div className="selected-movie-info">

          <img
            src={movie.image}
            alt={movie.title}
          />

          <div>

            <p className="small-title">
              SELECT YOUR SEATS
            </p>

            <h1>
              {movie.title}
            </h1>

            <p>
              CineBlueMoon • Screen 01 •{" "}
              {date} • {time}
            </p>

          </div>

        </div>


        <div className="members-box">

          <label>
            Number of Members
          </label>

          <div className="members-control">

            <button
              onClick={() =>
                handleMembersChange(
                  members - 1
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
                handleMembersChange(
                  members + 1
                )
              }
            >
              +
            </button>

          </div>

        </div>

      </section>


      {/* SEAT AREA */}

      <main className="seat-layout">

        <div className="cinema-screen">

          <div className="screen-light"></div>

          <span>
            SCREEN
          </span>

        </div>

        <p className="screen-note">
          All eyes this way please
        </p>


        <button
          className="auto-seat-btn"
          onClick={autoSelect}
        >
          ✨ Auto Select {members} Seat
          {members > 1 ? "s" : ""}
        </button>


        <div className="seat-area">

          <div className="section-title">

            <span>
              PREMIUM
            </span>

            <small>
              ₹{price} / seat
            </small>

          </div>


          {Array.from(
            { length: ROWS },
            (_, rowIndex) => {

              const row =
                rowIndex + 1;

              return (
                <div
                  className="seat-row"
                  key={row}
                >

                  <div className="row-label">
                    R{row}
                  </div>


                  {/* LEFT SEATS */}

                  <div className="seat-group">

                    {Array.from(
                      {
                        length:
                          LEFT_SEATS,
                      },
                      (_, index) => {

                        const col =
                          index + 1;

                        const seat =
                          seats.find(
                            (item) =>
                              item.row ===
                                row &&
                              item.col ===
                                col
                          );

                        return (
                          <button
                            key={seat.id}
                            className={`seat ${
                              seat.booked
                                ? "booked"
                                : selectedSeats.includes(
                                    seat.id
                                  )
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              selectSeat(
                                seat
                              )
                            }
                            disabled={
                              seat.booked
                            }
                          >
                            {col}
                          </button>
                        );
                      }
                    )}

                  </div>


                  {/* AISLE */}

                  <div className="aisle"></div>


                  {/* RIGHT SEATS */}

                  <div className="seat-group">

                    {Array.from(
                      {
                        length:
                          RIGHT_SEATS,
                      },
                      (_, index) => {

                        const col =
                          LEFT_SEATS +
                          index +
                          1;

                        const seat =
                          seats.find(
                            (item) =>
                              item.row ===
                                row &&
                              item.col ===
                                col
                          );

                        return (
                          <button
                            key={seat.id}
                            className={`seat ${
                              seat.booked
                                ? "booked"
                                : selectedSeats.includes(
                                    seat.id
                                  )
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              selectSeat(
                                seat
                              )
                            }
                            disabled={
                              seat.booked
                            }
                          >
                            {col}
                          </button>
                        );
                      }
                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>


        {/* LEGEND */}

        <div className="legend">

          <div>
            <span className="legend-seat available"></span>
            Available
          </div>

          <div>
            <span className="legend-seat selected"></span>
            Selected
          </div>

          <div>
            <span className="legend-seat booked"></span>
            Booked
          </div>

        </div>

      </main>


      {/* BOOKING BAR */}

      <div className="booking-bar">

        <div className="selected-info">

          <span>
            Selected Seats
          </span>

          <strong>
            {selectedSeats.length > 0
              ? selectedSeats.join(", ")
              : "No seats selected"}
          </strong>

        </div>


        <div className="price-info">

          <small>
            Total Amount
          </small>

          <strong>
            ₹{total}
          </strong>

        </div>


        <button
          className="continue-btn"
          disabled={
            selectedSeats.length !==
            members
          }
          onClick={() =>
            setShowPayment(true)
          }
        >
          Continue →
        </button>

      </div>

    </div>
  );
}

export default SeatSelection;