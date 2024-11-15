import "./App.css";
import SvgMap from "./SvgMap";

function clickHandler(event) {
    console.log(event.target.id);
}

function App() {
    return (
        <div>
            <h1>Country Info</h1>
            <div onClick={clickHandler}>
                <SvgMap></SvgMap>
            </div>
        </div>
    );
}

export default App;
