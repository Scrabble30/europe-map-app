import { useState, useEffect } from "react";
import "./App.css";
import SvgMap from "./SvgMap";

function App() {
    const [countryElement, setCountryElement] = useState(null);
    const [countryDetails, setCountryDetails] = useState(null);

    function clickHandler(event) {
        if (countryElement) {
            countryElement.style.fill = "#c0c0c0";
        }

        setCountryElement(event.target);

        event.target.style.fill = "red";
    }

    // useEffect to fetch the country details
    useEffect(() => {
        if (countryElement) {
            const countryId = countryElement.id.includes("-")
                ? countryElement.id.substring(
                      0,
                      countryElement.id.lastIndexOf("-")
                  )
                : countryElement.id;

            fetch("https://restcountries.com/v3.1/alpha/" + countryId)
                .then((response) => response.json())
                .then((data) => {
                    const countryObject = {
                        name: data[0].name.common,
                        area: data[0].area,
                        population: data[0].population,
                    };

                    setCountryDetails(countryObject);
                })
                .catch((error) =>
                    console.error("Error fetching country details:", error)
                );
        }
    }, [countryElement]); // Empty dependency array means this runs once on mount

    return (
        <div>
            <h1>Country Info</h1>
            {countryElement && countryDetails && (
                <div>
                    <p>ID: {countryElement.id}</p>
                    <p>Name: {countryDetails.name}</p>
                    <p>Population: {countryDetails.population}</p>
                    <p>Area: {countryDetails.area}</p>
                </div>
            )}
            <div onClick={clickHandler}>
                <SvgMap></SvgMap>
            </div>
        </div>
    );
}

export default App;
