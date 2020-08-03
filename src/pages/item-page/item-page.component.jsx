import React from "react";
import productService from "../../services/product-service";
import ItemCard from "./item-card.component";
import "./item-page.styles.scss";

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      groupId: "",
      items: [],
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

  getItemData = () => {
    productService
      .getItemsByGroupIdCategoryId(this.state.groupId, this.state.categoryId)
      .then((response) => {
        this.setState({
          items: response.data,
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
          <div className="preview">
            {this.state.items.map((item) => (
              <ItemCard
                key={item.itemId}
                groupId={item.groupId}
                categoryId={item.categoryId}
                itemId={item.itemId}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </center>
    );
  }
}
export default ItemPage;
