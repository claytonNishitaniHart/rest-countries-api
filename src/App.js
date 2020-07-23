import React from 'react';
import { useEffect, useState } from 'react';
import CountryCard from "./Components/CountryCard";
import CountryDetail from "./Components/CountryDetail";
import './App.scss';
import {FaMoon, FaSearch, FaChevronDown} from 'react-icons/fa';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterRegion, setFilterRegion] = useState('');
  const [detailCountry, setDetailCountry] = useState('');
  const [detailCountryInfo, setDetailCountryInfo] = useState([]);
  
  useEffect(() => {
    if (document.body.classList.contains('DarkMode')) {
      document.body.classList.replace('DarkMode', 'LightMode');
    } else if (document.body.classList.contains('LightMode')) {
      document.body.classList.replace('LightMode', 'DarkMode');
    } else {
      document.body.classList.add('LightMode');
    }
  }, [darkMode]);
  
  useEffect(() => {
    let text = query ? "name/"+query : "all";
    fetch(`https://restcountries.eu/rest/v2/${text}`)
    .then(result => result.json())
    .then(response => {
      setAllCountries(response);
      setItems(response);
    })
    .catch(error => console.log("there was an error"))
  }, [])
  
  useEffect(() => {
    setItems(allCountries.filter(item => {
      return (item.region === filterRegion);
    }));
  }, [filterRegion])
  
  useEffect(() => {
    if (!query) {
      setItems(allCountries);
    } else {
      setItems(allCountries.filter(item => {
        return (item.name.toLowerCase().includes(query.toLowerCase()));
      }));
    }
  }, [query])
  
  useEffect(() => {
    if (detailCountry !== "") {
      setDetailCountryInfo(items.filter((item) => {
        return(
          item.name === detailCountry
        );
      }));
    }
  }, [detailCountry])
  
  function setRegion(regionName) {
    if (filterRegion === regionName) {
      setFilterRegion("");
    } else {
      setFilterRegion(regionName);
    }
  }
  
  function flipShowDetail(country) {
    setDetailCountry(country);
  }
  
  function getCountryNameFromCode(countryCode) {
    let result = allCountries.filter(item => {
      return (item.alpha3Code === countryCode);
    });
    return (result[0].name);
  }
  
  const FilterDropdown = showFilter ?
    <div className={"Filter-Dropdown"}>
    <div className={"Filter-Dropdown-Region"} onClick={() => setRegion("Africa")}>Africa</div>
    <div className={"Filter-Dropdown-Region"} onClick={() => setRegion("Americas")}>Americas</div>
    <div className={"Filter-Dropdown-Region"} onClick={() => setRegion("Asia")}>Asia</div>
    <div className={"Filter-Dropdown-Region"} onClick={() => setRegion("Europe")}>Europe</div>
    <div className={"Filter-Dropdown-Region"} onClick={() => setRegion("Oceania")}>Oceania</div>
    </div> : null;
  
    const FilterDropdownText = filterRegion ? filterRegion : "Filter by Region";
    
    const Screen = detailCountry ?
        detailCountryInfo.map((item, index) => {
          return(<CountryDetail
            key={index}
            flipShowDetail={flipShowDetail}
            getCountryNameFromCode={getCountryNameFromCode}
            flag={item.flag}
            name={item.name}
            nativeName={item.nativeName}
            population={item.population.toLocaleString()}
            region={item.region}
            subregion={item.subregion}
            capital={item.capital}
            topLevelDomain={item.topLevelDomain}
            currencies={item.currencies}
            languages={item.languages}
            borders={item.borders}
          />);
        })
      :
      <div className={"Main"}>
        <div className={"Search-n-Filter"}>
          <form>
            <FaSearch className={"Search-n-Filter-SearchIcon"}/>
            <input
              className={"SearchBar"}
              type={'text'}
              placeholder={"Search for a country..."}
              value={query}
              onChange={(event) => {setQuery(event.target.value)}}
            />
            <div className={"Filter"} onClick={() => setShowFilter(!showFilter)}>
              {FilterDropdownText}<FaChevronDown className={"Filter-Chevron"}/>
              {FilterDropdown}
            </div>
          </form>
        </div>
        <div className={"Content"}>
          {items.map((item, index) => {
            return (
              <CountryCard key={index} flag={item.flag} name={item.name} population={item.population} region={item.region} capital={item.capital} showDetailFunc={flipShowDetail}/>
            );
          })}
        </div>
      </div>;
  
  return(
    <div className={"App"}>
      <div className={"Navbar"}>
        <h2 className={"Navbar-Title"}>Where in the world?</h2>
        <button className={"Navbar-Button"} onClick={() => setDarkMode(!darkMode)}><FaMoon className={"Navbar-Button-Moon"}/> Dark Mode</button>
      </div>
      {Screen}
    </div>
  );

}

export default App;
