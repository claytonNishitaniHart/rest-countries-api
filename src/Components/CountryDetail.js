import React from 'react';
import "./CountryDetail.scss";
import {FaLongArrowAltLeft} from 'react-icons/fa';

const CountryDetail = ({flipShowDetail, getCountryNameFromCode, flag, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders}) => {
  let CurrenciesText = "";
  for(let c in currencies) {
    CurrenciesText += currencies[c].name + ", ";
  }
  CurrenciesText = CurrenciesText.substr(0, CurrenciesText.length - 2);
  
  let LanguagesText = "";
  for (let l in languages) {
    LanguagesText += languages[l].name + ", ";
  }
  LanguagesText = LanguagesText.substr(0, LanguagesText.length - 2);
  
  function truncateName(str) {
    if (str.length <= 12) {
      return str;
    }
    
    return (str.slice(0, 9) + "...");
  }
  
  let BordersDiv = null;
  
  BordersDiv = borders.length > 0 ?
    <div>
      <span className={"CountryDetail-Info-BordersHeading"}>Border Countries</span>
      <div className={"CountryDetail-Info-Borders"}>
        {borders.map((item, index) => {
          return (
            <button key={index} className={"CountryDetail-Info-Borders-Button"} onClick={() => flipShowDetail(getCountryNameFromCode(item))}>{truncateName(getCountryNameFromCode(item))}</button>
          );
        })}
      </div>
    </div> : null;
  
  return(
    <div className={"CountryDetail"}>
      <button className={"CountryDetail-BackButton"} onClick={() => flipShowDetail("")}><FaLongArrowAltLeft className={"CountryDetail-BackButton-Icon"}/> Back</button>
      <img className={"CountryDetail-Flag"} src={flag} alt={"flag"}/>
      <div className={"CountryDetail-Info"}>
        <h2 className={"CountryDetail-Info-Name"}>{name}</h2>
        <div className={"CountryDetail-Info-Block"}>
          <span className={"CountryDetail-Info-Text"}><span className={"CountryDetail-Info-TextLabel"}>Native Name: </span>{nativeName}</span>
          <span className={"CountryDetail-Info-Text"}><span className={"CountryDetail-Info-TextLabel"}>Population: </span>{population}</span>
          <span className={"CountryDetail-Info-Text"}><span className={"CountryDetail-Info-TextLabel"}>Region: </span>{region}</span>
          <span className={"CountryDetail-Info-Text"}><span className={"CountryDetail-Info-TextLabel"}>Sub Region: </span>{subregion}</span>
          <span className={"CountryDetail-Info-Text"}><span className={"CountryDetail-Info-TextLabel"}>Capital: </span>{capital}</span>
        </div>
        <div className={"CountryDetail-Info-Block"}>
          <span className={"CountryDetail-Info-Text"}><span className={"CountryDetail-Info-TextLabel"}>Top Level Domain: </span>{topLevelDomain}</span>
          <span className={"CountryDetail-Info-Text"}><span className={"CountryDetail-Info-TextLabel"}>Currencies: </span>{CurrenciesText}</span>
          <span className={"CountryDetail-Info-Text"}><span className={"CountryDetail-Info-TextLabel"}>Languages: </span>{LanguagesText}</span>
        </div>
        {BordersDiv}
      </div>
    </div>
  );
}

export default CountryDetail;