import React from "react";
import productService from "../../services/product-service";
import ItemCard from "./item-card.component";
import "./item-page.styles.scss";
import ReactPaginate from "react-paginate";
import { Select } from "semantic-ui-react";

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      groupId: "",
      items: [],
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      sortType: "none",
    };
  }
  Options = [
    { value: "recent", text: "What's New" },
    { value: "price-asc", text: "Price: Low To High" },
    { value: "price-desc", text: "Price: High To Low" },
  ];

  componentDidMount() {
    console.log(this.props);

    this.setState(
      {
        categoryId: this.props.match.params.categoryId,
        groupId: this.props.match.params.groupId,
      },
      () => this.getItemData()
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.groupId !== this.state.groupId ||
      prevState.categoryId !== this.state.categoryId
    ) {
      this.setState({
        groupId: this.state.groupId,
        categoryId: this.state.categoryId,
      });

      this.getItemData();
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.getItemData();
      }
    );
  };
  handleSort = (criteria) => {
    this.setState({ sortType: criteria });
    console.log(this.state.items + "  ---------- " + this.state.data);

    productService
      .sortItemsByPrice(this.state.items, criteria)
      .then((response) => {
        this.setState({ data: response.data });
        const data = response.data;
        const slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
        const postData = slice.map((item) => (
          <ItemCard
            key={item.itemId}
            groupId={item.groupId}
            categoryId={item.categoryId}
            itemId={item.itemId}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
          />
        ));
        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          postData,
        });
      });
    ////////////////////////////////////
  };

  getItemData = () => {
    productService
      .getItemsByGroupIdCategoryId(this.state.groupId, this.state.categoryId)
      .then((response) => {
        this.setState({ items: response });
        const data = response.data;
        const slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
        const postData = slice.map((item) => (
          <ItemCard
            key={item.itemId}
            groupId={item.groupId}
            categoryId={item.categoryId}
            itemId={item.itemId}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
          />
        ));
        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          postData,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.match.params.groupId !== prevState.groupId ||
      nextProps.match.params.categoryId !== prevState.categoryId
    ) {
      return {
        groupId: nextProps.match.params.groupId,
        categoryId: nextProps.match.params.categoryId,
      };
    } else return null;
  }

  render() {
    return (
      <center>
        <div className="collection-preview">
          <div className="title">{this.state.categoryId.toUpperCase()}</div>
          <div
            className="sort-select"
            style={{
              position: "absolute",
              right: "2%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <label for="sort-criteria">Sort By : </label> &nbsp;&nbsp;
            <select
              id="sort-criteria"
              style={{ padding: "3%", border: "none" }}
              onChange={(e) => {
                this.handleSort(e.target.value);
              }}
            >
              <option value="new" selected>
                What's New
              </option>
              <option value="price-inc">Price: Low To High</option>
              <option value="price-dec">Price: High To Low</option>
            </select>
          </div>
          <div
            className="new"
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            {this.state.postData}
          </div>
        </div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
        {/* </div> */}
      </center>
    );
  }
}
export default ItemPage;
