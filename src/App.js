import Loader from "react-loader-spinner";
import { Component } from "react";
import EachImage from "./components/EachImage";
import "./App.css";

const API_URL = "https://api.unsplash.com/search/photos/";
const imagesPerPage = 20;

class App extends Component {
  state = {
    searchInput: "",
    resultList: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
  };

  onIncrementTotalPages = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.fetchDetails
    );
  };

  onDecrementTotalPages = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.fetchDetails
    );
  };

  onButtonClicked = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onErrorRender = () => {
    return (
      <div>
        <h1>Not Found!</h1>
      </div>
    );
  };

  fetchDetails = async () => {
    this.setState({ isLoading: true });
    const { searchInput, page } = this.state;
    let searchText = "";
    if (searchInput === "") {
      searchText = "ALL";
    } else {
      searchText = searchInput;
    }

    const apiUrl = `${API_URL}?client_id=N0KIziT2Ww49LzNYyBVNrZe0Z_9m3lsO8fXCV-JjcK4&query=${searchText}&per_page=${imagesPerPage}&page=${page}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    this.setState({
      resultList: data.results,
      totalPages: data.total_pages,
      isLoading: false,
    });
  };

  onClickSubmitButton = async () => {
    this.setState({ page: 1 }, this.fetchDetails);
  };

  normalRender = () => {
    const { resultList, searchInput, page, totalPages } = this.state;
    return (
      <div className="bg-container">
        <h1 className="main-heading">Finder</h1>
        <p className="para">Get Free Images Here</p>
        <input
          type="search"
          className="search-bar"
          placeholder="Search something here..."
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          className="search-button"
          onClick={this.onClickSubmitButton}
        >
          Search
        </button>
        <ul className="buttons-list">
          <li>
            <button
              type="button"
              className="button"
              onClick={this.onButtonClicked}
              value="Flowers"
            >
              Flowers
            </button>
          </li>
          <li>
            <button
              type="button"
              className="button"
              onClick={this.onButtonClicked}
              value="Dog"
            >
              Dog
            </button>
          </li>
          <li>
            <button
              type="button"
              className="button"
              onClick={this.onButtonClicked}
              value="Fish"
            >
              Fish
            </button>
          </li>
          <li>
            <button
              type="button"
              className="button"
              onClick={this.onButtonClicked}
              value="Building"
            >
              Building
            </button>
          </li>
        </ul>
        <ul className="images-list">
          {resultList.map((eachImage) => (
            <EachImage
              imageUrl={eachImage.urls.thumb}
              key={eachImage.id}
              description={eachImage.alt_description}
            />
          ))}
        </ul>
        <div className="buttons">
          {page > 1 && (
            <button
              type="button"
              className="button"
              onClick={this.onDecrementTotalPages}
            >
              Previous
            </button>
          )}
          {page < totalPages && (
            <button
              type="button"
              className="button"
              onClick={this.onIncrementTotalPages}
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="bg-container">
        {isLoading === true ? (
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        ) : (
          this.normalRender()
        )}
      </div>
    );
  }
}

export default App;
