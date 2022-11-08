import "../../styles/organisms/LocationOverview.scss";

import { AiFillStar } from "react-icons/ai";

const LocationOverview = ({ stays }) => {
  return (
    <section className="location-overview">
      <div className="location-overview__title-container">
        <h1 className="location-overview__title">Stays in Finland</h1>
        <p className="location-overview__location-amount">{stays.length} stays</p>
      </div>

      <div className="location-overview__stays">
        {stays.length >= 1 ? (
          stays.map((stay) => (
            <article key={stay.id}>
              <div className="location-overview__stay-image-container">
                <img
                  src={stay.photo}
                  alt={`${stay.title} ${stay.type}`}
                  className="location-overview__stay-image"
                />
              </div>
              <div className="location-overview__stay-details">
                {stay.superHost && (
                  <div className="location-overview__stay-host">
                    <p>Super Host</p>
                  </div>
                )}
                <p className="location-overview__stay-beds">
                  {stay.type} {stay.beds != null && `. ${stay.beds} beds`}
                </p>
                <p className="location-overview__stay-rating">
                  <AiFillStar />
                  {stay.rating}
                </p>
              </div>
              <h2 className="location-overview__stay-title">{stay.title}</h2>
            </article>
          ))
        ) : (
          <h2 className="location-overview__no-criteria">
            Oops, there were no rooms found with this criteria!
          </h2>
        )}
      </div>
    </section>
  );
};

export default LocationOverview;
