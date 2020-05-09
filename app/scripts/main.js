/**
 * The Initial React Setup file
 * ...
 *
 * === CSS
 * The stylesheets are handled seperately using the gulp sass rather than importing them directly into React.
 * You can find these in the ./app/sass/ folder
 *
 * == JS
 * All files in here start from this init point for the React Components.
 *
 *
 * Firstly we need to import the React JS Library
 */
import React from "react";
import ReactDOM from "react-dom";

import Menu from "./components/menu";
import Home from "./components/home";

/**
 * We can start our initial App here in the main.js file
 */
class App extends React.Component {
  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
    constructor(props) {
        super(props);
        this.state = {
            showingSearch: false,
            products: props.products,
            searchProducts:props.products,
        };
    }
  componentDidMount() {
    fetch("http://localhost:3035")
      .then((res) => res.json())
      .then((data) => {
        console.log("in api call");
        console.log(data);
        this.setState({ showingSearch: data[0].name, products: data });
      })
      .catch(console.log);
  }

  render() {
      const {products}=this.state
    return (
      <div className="App">
        <Menu  products={this.state.products}/>
        <Home/>
      </div>
    );
  }

 
}

// Render this out
ReactDOM.render(<App />, document.getElementById("root"));
