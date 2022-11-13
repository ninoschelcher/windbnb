import "../../styles/organisms/LocationOverview.scss";

import { AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";

const LocationOverview = ({ stays }) => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <section className="location-overview">
      <div className="location-overview__title-container">
        <h1 className="location-overview__title">Stays in Finland</h1>
        <p className="location-overview__location-amount">{stays.length} stays</p>
      </div>

      <motion.div
        className="location-overview__stays"
        style={stays.length >= 1 ? { display: "grid" } : { display: "flex" }}
        initial="hidden"
        animate="show"
        variants={container}
      >
        {stays.length >= 1 ? (
          stays.map((stay) => (
            <motion.article key={stay.id} variants={item}>
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
            </motion.article>
          ))
        ) : (
          <>
            <h2 className="location-overview__no-criteria">
              Oops, there were no rooms found with this criteria!
            </h2>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default LocationOverview;
