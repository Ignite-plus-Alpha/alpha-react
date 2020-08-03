import React from "react";
import productService from "../../services/product-service";
import CategoryItem from "../../components/category-item/category-item.component";
import "./category-page.styles.scss";

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: "",
      categories: [],
    };
  }

  componentDidMount() {
    this.setState({ groupId: this.props.match.params.groupId }, () =>
      this.getData()
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.groupId !== this.state.groupId) {
      this.setState({ groupId: this.state.groupId }, () => this.getData());
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.groupId !== prevState.groupId) {
      return { groupId: nextProps.match.params.groupId };
    } else return null;
  }

  getData = () => {
    productService
      .getCategoriesByGroupId(this.state.groupId)
      .then((response) => {
        this.setState({
          categories: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <center>
        <div className="collection-preview">
          <div className="title">{this.state.groupId.toUpperCase()}</div>
          <div className="preview">
            {this.state.categories.map((category) => (
              <CategoryItem
                key={category.categoryId}
                categoryId={category.categoryId}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>
        </div>
      </center>
    );
  }
}
export default CategoryPage;
