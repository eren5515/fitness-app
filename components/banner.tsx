"use client";

import "./banner.scss";

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner__content">
        <h3 className="banner__title">Track Your Daily Activities</h3>
        <p className="banner__desc">
          Keep an eye on your workouts, calories, and steps. Stay consistent and
          reach your goals faster.
        </p>
        <button className="banner__cta">Start Workout</button>
      </div>
      <div className="banner__image" aria-hidden="true" />
    </section>
  );
}


