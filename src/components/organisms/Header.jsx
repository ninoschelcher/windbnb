import { useRef, useState, useEffect } from "react";

import "../../styles/organisms/Header.scss";

import logo from "../../assets/images/logo.svg";

import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

const Header = ({ filter, setFilter, setSearch }) => {
  const headerOverlay = useRef(null);
  const [locationFilter, setLocationFilter] = useState(true);
  const [guestsFilter, setGuestsFilter] = useState(false);
  const [filterOverlay, setFilterOverlay] = useState(false);

  const openLocationFilter = () => {
    setFilterOverlay(true);
    setLocationFilter(true);
    setGuestsFilter(false);
  };

  const openGuestsFilter = () => {
    setFilterOverlay(true);
    setGuestsFilter(true);
    setLocationFilter(false);
  };

  const showGuestsFilter = () => {
    setLocationFilter(false);
    setGuestsFilter(true);
  };

  const showLocationFilter = () => {
    setLocationFilter(true);
    setGuestsFilter(false);
  };

  const handleSearch = () => {
    setFilterOverlay(false);
    setSearch(1);
  };

  const handleClickOutside = (e) => {
    if (headerOverlay.current && !headerOverlay.current.contains(e.target)) {
      setFilterOverlay(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className={filterOverlay ? "header-open" : "header"}>
      <div className="header__items">
        <img src={logo} alt="windbnb logo with red square" className="header__logo" />
        <div className="header__filter-container">
          <div className="header__filter-city" onClick={openLocationFilter}>
            {filter.location}, Finland
          </div>
          <div
            className="header__filter-guests"
            style={filter.guests.adults !== 1 ? { color: "#333" } : { color: "#BDBDBD" }}
            onClick={openGuestsFilter}
          >
            {filter.guests.adults !== 1
              ? `${filter.guests.adults} adult, ${filter.guests.children} children`
              : `Add guests`}
          </div>
          <div className="header__filter-search" onClick={() => setFilterOverlay(true)}>
            <AiOutlineSearch className="header__filter-search-icon" />
          </div>
        </div>
      </div>

      <CSSTransition
        nodeRef={headerOverlay}
        in={filterOverlay}
        timeout={700}
        classNames="overlay"
        unmountOnExit
      >
        <div className="header__overlay" ref={headerOverlay}>
          <div className="header__overlay-heading">
            <p className="header__overlay-title">Edit your search</p>
            <AiOutlineClose
              onClick={() => setFilterOverlay(false)}
              className="header__overlay-close"
            />
          </div>
          <div className="header__overlay-items">
            <div
              className="header__overlay-item-location"
              style={
                locationFilter
                  ? { border: "1px solid #333", borderRadius: "1rem" }
                  : { borderRight: "1px solid #f2f2f2", borderRadius: "0px" }
              }
              onClick={showLocationFilter}
            >
              <p>Location</p>
              <p>{filter.location}, Finland</p>
            </div>
            <div
              className="header__overlay-item-guests"
              style={
                guestsFilter
                  ? { border: "1px solid #333", borderRadius: "1rem" }
                  : { borderRight: "1px solid #f2f2f2", borderRadius: "0px" }
              }
              onClick={showGuestsFilter}
            >
              <p>Guests</p>
              <p style={filter.guests.adults !== 1 ? { color: "#333" } : { color: "#BDBDBD" }}>
                {filter.guests.adults !== 1
                  ? `${filter.guests.adults} adult, ${filter.guests.children} children`
                  : `Add guests`}
              </p>
            </div>
            <div className="header__overlay-search-container">
              <button className="header__overlay-search--desktop" onClick={handleSearch}>
                <AiOutlineSearch />
                Search
              </button>
            </div>
          </div>
          <div className="header__overlay-lists">
            <div className="header__overlay-lists-location">
              {locationFilter && (
                <ul>
                  <li onClick={() => setFilter({ ...filter, location: "Helsinki" })}>
                    <MdLocationOn />
                    <p>Helsinki, Finland</p>
                  </li>
                  <li onClick={() => setFilter({ ...filter, location: "Turku" })}>
                    <MdLocationOn />
                    <p>Turku, Finland</p>
                  </li>
                  <li onClick={() => setFilter({ ...filter, location: "Oulu" })}>
                    <MdLocationOn />
                    <p>Oulu, Finland</p>
                  </li>
                  <li onClick={() => setFilter({ ...filter, location: "Vaasa" })}>
                    <MdLocationOn />
                    <p>Vaasa, Finland</p>
                  </li>
                </ul>
              )}
            </div>
            <div className="header__overlay-lists-guests">
              {guestsFilter && (
                <>
                  <p>Adults</p>
                  <span>Ages 13 or above</span>
                  <div className="header__overlay-lists-guests-controls">
                    <button
                      className={filter.guests.adults <= 0 && "header__control-button-disabled"}
                      onClick={() =>
                        setFilter({
                          ...filter,
                          guests: {
                            adults:
                              filter.guests.adults <= 0
                                ? filter.guests.adults
                                : filter.guests.adults--,
                            ...filter.guests,
                          },
                        })
                      }
                    >
                      <AiOutlineMinusSquare />
                    </button>
                    <p>{filter.guests.adults}</p>
                    <button
                      onClick={() =>
                        setFilter({
                          ...filter,
                          guests: { adults: filter.guests.adults++, ...filter.guests },
                        })
                      }
                    >
                      <AiOutlinePlusSquare />
                    </button>
                  </div>
                  <p>Children</p>
                  <span>Ages 2-12</span>
                  <div className="header__overlay-lists-guests-controls">
                    <button
                      className={filter.guests.children <= 0 && "header__control-button-disabled"}
                      onClick={() =>
                        setFilter({
                          ...filter,
                          guests: {
                            children:
                              filter.guests.children <= 0
                                ? filter.guests.children
                                : filter.guests.children--,
                            ...filter.guests,
                          },
                        })
                      }
                    >
                      <AiOutlineMinusSquare />
                    </button>
                    <p>{filter.guests.children}</p>
                    <button
                      onClick={() =>
                        setFilter({
                          ...filter,
                          guests: { children: filter.guests.children++, ...filter.guests },
                        })
                      }
                    >
                      <AiOutlinePlusSquare />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <button className="header__overlay-search--mobile" onClick={handleSearch}>
            <AiOutlineSearch />
            Search
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Header;
