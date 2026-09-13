import "./TicketSuccess.css";

function TicketSuccess({
  movie,
  members,
  selectedSeats,
  total,
  language,
  format,
  date,
  time,
  onHome,
}) {
  const bookingId =
    "CBM" +
    Math.floor(
      100000 + Math.random() * 900000
    );

  const formattedDate = date
    ? new Date(
        date + "T00:00:00"
      ).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "Today";

  const downloadTicket = () => {
    const ticket = `
CINEBLUE MOON
==============================

BOOKING CONFIRMED ✓

Movie:
${movie.title}

Theatre:
CineBlueMoon

Screen:
Screen 01

Language:
${language}

Format:
${format}

Date:
${formattedDate}

Time:
${time}

Members:
${members}

Seats:
${selectedSeats.join(", ")}

Total Amount:
₹${total}

Booking ID:
${bookingId}

==============================
Thank you for booking with
CineBlueMoon
`;

    const blob = new Blob(
      [ticket],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      `${bookingId}-CineBlueMoon-Ticket.txt`;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="ticket-page">

      <div className="ticket-container">

        {/* SUCCESS */}

        <div className="success-circle">
          ✓
        </div>

        <h1>
          Booking Confirmed!
        </h1>

        <p className="success-text">
          Your movie tickets have been
          booked successfully.
        </p>


        {/* TICKET */}

        <div className="ticket-card">

          {/* HEADER */}

          <div className="ticket-header">

            <div>
              <span>
                CINEBLUE
              </span>

              <strong>
                MOON
              </strong>
            </div>

            <small>
              E-TICKET
            </small>

          </div>


          {/* MOVIE */}

          <div className="ticket-movie">

            <div className="ticket-poster">

              <img
                src={movie.image}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

            </div>

            <div>

              <small>
                MOVIE
              </small>

              <h2>
                {movie.title}
              </h2>

              <p>
                {language} • {format}
              </p>

            </div>

          </div>


          {/* INFORMATION */}

          <div className="ticket-info-grid">

            <div>
              <small>
                THEATRE
              </small>

              <strong>
                CineBlueMoon
              </strong>
            </div>


            <div>
              <small>
                SCREEN
              </small>

              <strong>
                Screen 01
              </strong>
            </div>


            <div>
              <small>
                DATE
              </small>

              <strong>
                {formattedDate}
              </strong>
            </div>


            <div>
              <small>
                TIME
              </small>

              <strong>
                {time}
              </strong>
            </div>


            <div>
              <small>
                MEMBERS
              </small>

              <strong>
                {members}
              </strong>
            </div>


            <div>
              <small>
                SEATS
              </small>

              <strong>
                {selectedSeats.join(
                  ", "
                )}
              </strong>
            </div>

          </div>


          {/* DIVIDER */}

          <div className="ticket-divider">

            <span></span>
            <span></span>

          </div>


          {/* BOTTOM */}

          <div className="ticket-bottom">

            <div className="qr-box">

              <div className="qr-pattern">
                <span>
                  ▦
                </span>
              </div>

              <small>
                Scan at entrance
              </small>

            </div>


            <div className="booking-details">

              <small>
                BOOKING ID
              </small>

              <strong>
                {bookingId}
              </strong>


              <small>
                TOTAL PAID
              </small>

              <strong className="ticket-price">
                ₹{total}
              </strong>

            </div>

          </div>

        </div>


        {/* BUTTONS */}

        <div className="ticket-actions">

          <button
            className="download-ticket-btn"
            onClick={downloadTicket}
          >
            ↓ Download Ticket
          </button>


          <button
            className="home-ticket-btn"
            onClick={onHome}
          >
            ← Back to Home
          </button>

        </div>


        <p className="ticket-note">
          Please keep this ticket ready
          when entering the theatre.
        </p>

      </div>

    </div>
  );
}

export default TicketSuccess;