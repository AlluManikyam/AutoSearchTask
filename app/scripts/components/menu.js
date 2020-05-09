/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from "react";

class Menu extends React.Component {
  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor(props) {
    super(props);
    this.state = {
      showingSearch: false,
      products: props.products,
      searchProducts: props.products,
      searchItems: [],
      productDetails: {},
    };
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */

  componentWillReceiveProps(props) {
    this.setState({ products: props.products, searchProducts: props.products });
  }

  showSearchContainer(e) {
    e.preventDefault();
    document.getElementById("search").value = "";
    this.setState({
      showingSearch: !this.state.showingSearch,
      searchItems: [],
      productDetails:{},
    });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  onSearch(e) {
    const { searchProducts, products } = this.state;
    this.setState({productDetails:{}, searchProducts: products });
    const inputValue = e.target.value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let searchItems =
      inputLength === 0
        ? []
        : searchProducts.filter(
            (lang) =>
              lang.name.toLowerCase().slice(0, inputLength) === inputValue
          );
    this.setState({ searchItems });
  }

  selectProduct(product) {
    this.setState(
      {
        productDetails: product,
      },
      () => {
        document.getElementById("search").value = "";
        this.setState({
          showingSearch: !this.state.showingSearch,
          searchItems: [],
        });
      }
    );
  }

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    const { searchItems, productDetails } = this.state;
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <h1>ELC</h1>
            <nav>
              <a href="#" className="nav-item">
                HOLIDAY
              </a>
              <a href="#" className="nav-item">
                WHAT'S NEW
              </a>
              <a href="#" className="nav-item">
                PRODUCTS
              </a>
              <a href="#" className="nav-item">
                BESTSELLERS
              </a>
              <a href="#" className="nav-item">
                GOODBYES
              </a>
              <a href="#" className="nav-item">
                STORES
              </a>
              <a href="#" className="nav-item">
                INSPIRATION
              </a>

              <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>
        <div
          className={
            (this.state.showingSearch ? "showing " : "") + "search-container"
          }
        >
          <input id="search" type="text" onChange={(e) => this.onSearch(e)} />
          <a href="#" onClick={(e) => this.showSearchContainer(e)}>
            <i className="material-icons close">close</i>
          </a>
          <div className="container">
            {searchItems && searchItems.length > 0
              ? searchItems.map((item, key) => {
                  return (
                    <div
                      className="search-item"
                      key={key}
                      onClick={this.selectProduct.bind(this, item)}
                    >
                      {item.name}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        {productDetails && Object.keys(productDetails).length > 0 && (
          <div id="product-details">
            <figure className="pizza">
              <div className="pizza__hero">
                <div style={{ width: 300, height: 450 }}>
                  <img
                    src={productDetails.picture}
                    alt="Pizza"
                    className="pizza__img"
                  />
                </div>
              </div>
              <div className="pizza__content">
                <div className="pizza__title">
                  <h1 className="pizza__heading">{productDetails.name}</h1>
                </div>
                <p className="pizza__description">{productDetails.about}</p>
                <div className="pizza__details">
                  {productDetails.tags && productDetails.tags.length > 0
                    ? productDetails.tags.map((tag) => {
                        return (
                          <div className="pizza__tag pizza__tag--2">
                            {`#${tag}`}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
              <div className="pizza__price">{productDetails.price}</div>
            </figure>
          </div>
        )}
      </header>
    );
  }
}

// Export out the React Component
module.exports = Menu;
