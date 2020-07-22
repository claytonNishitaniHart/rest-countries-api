import React from 'react';
import "./CountryCard.scss";

const CountryCard = ({ flag, name, population, region, capital, showDetailFunc }) => {
  return (
    <div className={"Card"} onClick={() => showDetailFunc(name)}>
      <img className={"Card-Flag"} src={flag} alt={"flag"}/>
      <div className={"Card-Info"}>
        <h1 className={"Card-Info-Name"}>{name}</h1>
        <span className={"Card-Info-Text"}><span className={"Card-Info-TextLabel"}>Population: </span>{population.toLocaleString()}</span>
        <span className={"Card-Info-Text"}><span className={"Card-Info-TextLabel"}>Region: </span>{region}</span>
        <span className={"Card-Info-Text"}><span className={"Card-Info-TextLabel"}>Capital: </span>{capital}</span>
      </div>
    </div>
  );
  
}

export default CountryCard;