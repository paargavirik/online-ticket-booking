import { useState } from "react";
import "./SeatSelection.css";
import TicketSuccess from "./TicketSuccess";

function PaymentPage({
  movie,
  members,
  selectedSeats,
  total,
  language,
  format,
  date,
  time,
  price,
  onBack,
}) {
  const [method, setMethod] =
    useState("upi");

  const [upi, setUpi] = useState("");
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [paymentDone, setPaymentDone] =
    useState(false);

  const handlePayment = () => {

    if (
      method === "upi" &&
      !upi.trim()
    ) {
      setError(
        "Please enter your UPI ID"
      );
      return;
    }

    if (
      method === "card" &&
      (!card.trim() ||
        !name.trim())
    ) {
      setError(
        "Please enter your card details"
      );
      return;
    }

    setError("");
    setPaymentDone(true);
  };


  if (paymentDone) {
    return (
      <TicketSuccess
        movie={movie}
        members={members}
        selectedSeats={selectedSeats}
        total={total}
        language={language}
        format={format}
        date={date}
        time={time}
        price={price}
        onHome={() => {
          window.location.reload();
        }}
      />
    );
  }


  return (
    <div className="payment-page">

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


      <main className="payment-container">

        <div className="payment-heading">

          <p>
            SECURE CHECKOUT
          </p>

          <h1>
            Complete Your Booking
          </h1>

          <span>
            Your seats are reserved temporarily.
          </span>

        </div>


        <div className="payment-grid">

          {/* PAYMENT CARD */}

          <div className="payment-card">

            <h2>
              Payment Method
            </h2>


            <div className="payment-methods">

              {/* UPI */}

              <button
                className={
                  method === "upi"
                    ? "method active"
                    : "method"
                }
                onClick={() => {
                  setMethod("upi");
                  setError("");
                }}
              >

                <span>
                  ◉
                </span>

                <div>

                  <strong>
                    UPI
                  </strong>

                  <small>
                    Google Pay / PhonePe / Paytm
                  </small>

                </div>

              </button>


              {/* CARD */}

              <button
                className={
                  method === "card"
                    ? "method active"
                    : "method"
                }
                onClick={() => {
                  setMethod("card");
                  setError("");
                }}
              >

                <span>
                  ▣
                </span>

                <div>

                  <strong>
                    Credit / Debit Card
                  </strong>

                  <small>
                    Visa / Mastercard / RuPay
                  </small>

                </div>

              </button>


              {/* NET BANKING */}

              <button
                className={
                  method === "netbanking"
                    ? "method active"
                    : "method"
                }
                onClick={() => {
                  setMethod("netbanking");
                  setError("");
                }}
              >

                <span>
                  ▤
                </span>

                <div>

                  <strong>
                    Net Banking
                  </strong>

                  <small>
                    All major banks supported
                  </small>

                </div>

              </button>

            </div>


            {/* UPI */}

            {method === "upi" && (
              <div className="payment-input-area">

                <label>
                  UPI ID
                </label>

                <input
                  type="text"
                  placeholder="example@upi"
                  value={upi}
                  onChange={(e) =>
                    setUpi(
                      e.target.value
                    )
                  }
                />

                <p>
                  Enter your UPI ID to continue securely.
                </p>

              </div>
            )}


            {/* CARD */}

            {method === "card" && (
              <div className="payment-input-area">

                <label>
                  Card Number
                </label>

                <input
                  type="text"
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                  value={card}
                  onChange={(e) =>
                    setCard(
                      e.target.value
                    )
                  }
                />


                <label>
                  Card Holder Name
                </label>

                <input
                  type="text"
                  placeholder="Name on card"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />


                <div className="card-row">

                  <div>

                    <label>
                      Expiry
                    </label>

                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength="5"
                    />

                  </div>


                  <div>

                    <label>
                      CVV
                    </label>

                    <input
                      type="password"
                      placeholder="•••"
                      maxLength="3"
                    />

                  </div>

                </div>

              </div>
            )}


            {/* NET BANKING */}

            {method === "netbanking" && (
              <div className="payment-input-area">

                <label>
                  Select Bank
                </label>

                <select>

                  <option>
                    Select your bank
                  </option>

                  <option>
                    State Bank of India
                  </option>

                  <option>
                    HDFC Bank
                  </option>

                  <option>
                    ICICI Bank
                  </option>

                  <option>
                    Axis Bank
                  </option>

                  <option>
                    Canara Bank
                  </option>

                </select>

              </div>
            )}


            {error && (
              <div className="payment-error">
                {error}
              </div>
            )}


            <div className="secure-payment">
              🔒 Secure & encrypted payment
            </div>


            <button
              className="pay-now-btn"
              onClick={handlePayment}
            >
              Pay ₹{total} Securely →
            </button>

          </div>


          {/* ORDER SUMMARY */}

          <div className="order-card">

            <div className="order-title">

              <img
                src={movie.image}
                alt={movie.title}
                style={{
                  width: "55px",
                  height: "75px",
                  objectFit: "cover",
                  borderRadius: "7px",
                  flexShrink: 0,
                }}
              />


              <div>

                <small>
                  YOUR BOOKING
                </small>

                <h2>
                  {movie.title}
                </h2>

              </div>

            </div>


            <div className="order-line">

              <span>
                Language
              </span>

              <strong>
                {language}
              </strong>

            </div>


            <div className="order-line">

              <span>
                Format
              </span>

              <strong>
                {format}
              </strong>

            </div>


            <div className="order-line">

              <span>
                Location
              </span>

              <strong>
                CineBlueMoon
              </strong>

            </div>


            <div className="order-line">

              <span>
                Screen
              </span>

              <strong>
                Screen 01
              </strong>

            </div>


            <div className="order-line">

              <span>
                Date
              </span>

              <strong>
                {date}
              </strong>

            </div>


            <div className="order-line">

              <span>
                Show Time
              </span>

              <strong>
                {time}
              </strong>

            </div>


            <div className="order-line">

              <span>
                Members
              </span>

              <strong>
                {members}
              </strong>

            </div>


            <div className="order-line seats-line">

              <span>
                Seats
              </span>

              <strong>
                {selectedSeats.join(", ")}
              </strong>

            </div>


            <div className="amount-section">

              <div>

                <span>
                  Ticket Price
                </span>

                <strong>
                  ₹{price} × {members}
                </strong>

              </div>


              <div>

                <span>
                  Convenience Fee
                </span>

                <strong>
                  ₹0
                </strong>

              </div>


              <div className="grand-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{total}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default PaymentPage;