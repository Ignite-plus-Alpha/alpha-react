import React from "react";
import productService from "../../services/product-service";
import ItemCard from "./item-card.component";
import "./item-page.styles.scss";
import ReactPaginate from "react-paginate";

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      groupId: "",
      items: [],
      offset: 0,
      data: [],
      perPage: 4,
      currentPage: 0
    };
  }

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

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.getItemData()
    });

};

  getItemData = () => {
    productService
      .getItemsByGroupIdCategoryId(this.state.groupId, this.state.categoryId)
      .then((response) => {
        const data = response.data;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(item =><ItemCard
          key={item.itemId}
          groupId={item.groupId}
          categoryId={item.categoryId}
          itemId={item.itemId}
          imageUrl={item.imageUrl}
          title={item.title}
          price={item.price}
        />)
        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),                 
          postData
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
          {/* <div className="preview"> */}
          <div
                className="new" style={{display:"flex" , width:"80%", justifyContent:"space-between", margin:"auto" }}>
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
                    activeClassName={"active"}/>
        {/* </div> */}
      </center>
    );
  }
}
export default ItemPage;
