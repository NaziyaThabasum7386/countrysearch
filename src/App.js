import './App.css';
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getContriesData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const countries = await res.json();
      setData(countries);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContriesData();
  }, []);

  const containerstyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const cardstyle = {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
  };
  const para = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
    marginTop: "10px",
    marginBottom: "10px",
  };

  // Filter countries based on search query
  const filteredCountries = data.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ margin: "20px auto", padding: "10px", width: "300px", display: "block" }}
      />
      <div style={containerstyle}>
        {filteredCountries.map((item) => {
          return (
            <div  className={"countryCard"} key={item.cca3} style={cardstyle}>
              <img src={item.flags.png} alt="flag" width={100} height={100} />
              <p style={para}>{item.name.common} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
