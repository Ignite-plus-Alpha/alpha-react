import React,{  useState, useEffect, Component } from "react";
import ItemDetails from './wishlistItems';
import { Redirect, withRouter } from "react-router-dom";
import Axios from "axios";
import Grid from "@material-ui/core/Grid"
import Link from 'react-dom';
import CustomAlert from './customAlert'
import { remove } from './remove'
import Alert from "@material-ui/lab/Alert"

class WishlistDirectory extends Component {

    // const [wishlistId,setWishlistId] = useState('');
    // const [cartId,setCartId] = useState('');
    // const [isLoaded,setIsLoaded] = useState(false);
    // const [wishlistItems, setWishlistItems] = useState([]);
    // const [total,setTotal] = useState('0');
    constructor(props) {
      super(props);
      this.state = {
        cartId: "",
        wishlistId:"",
        isLoaded: false,
        wishlistItems:[],
        total:0,
        chosenSize:'na',
        showAlert:false,
        sizes:[],
        item:{},
        isAdded:false,
      };
    }
    
    componentDidMount = () =>{
        if (this.props.email !== null) {
            this.getUserWishlistId();
            this.getUserCartId();
          }
      }

    getUserCartId = () => {
        Axios.get(`http://localhost:8081/cart/${localStorage.getItem("userId")}`)
          .then((response) => {
            console.log(response.data);
            this.setState({cartId:response.data});
          })
          .catch((e) => {
            console.log(e);
          });
      };

    getUserWishlistId = () => {
        Axios.get(`http://localhost:8081/cart/wishlistId/${localStorage.getItem("userId")}`)
        .then((response) => {
            this.setState({wishlistId:response.data});
            this.getItems(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    getItems = (wishlistId) => { 
      Axios.get(`http://localhost:8081/wishlist/${wishlistId}`)
      .then((response) => {
          this.setState({wishlistItems:response.data.wishlistItems,total:response.data.total_quantity, isLoaded:true});
          // getItemsDetails(response.data);
      })
      .catch((e) => {
          console.log(e);
      });
    }

    moveToCart = (item) => {
      console.log(item.size);
      if(item.size === null)
        this.add(item,this.state.chosenSize);
      else{
        this.setState({sizes:item.size});
        this.setState({item})
        this.setState({showAlert:true})
      }
    }

    add = (item,chosenSize) => {
      Axios.get(
        `http://localhost:8081/cartItem/${this.state.cartId}/${item.itemId}/${chosenSize}`
      )
        .then((response) => {
          console.log(response.data);
          if (response.data !== "") {
            if (response.data.itemQuantity < 10) {
              this.updateCart(
                response.data.itemId,
                response.data.itemSize,
                response.data.itemQuantity
              );
            } else
              alert(
                "Already this item exists in cart with maximum quantity limit."
              );
          } else {
            this.addToCart(item,chosenSize);
          }
        })
        .catch((e) => {
          console.log(e);
        });

    }

    updateCart = (itemId, itemSize, itemQuantity) => {
      Axios.put(
        `http://localhost:8081/cartItem/${
          this.state.cartId
        }/${itemId}/${itemSize}/${itemQuantity + 1}`
      )
        .then((response) => {
          this.setState({ isAdded: true });
          let quantity = this.props.totalQuantity + 1;
          this.props.setTotalQuantity(quantity);
          console.log(response.data);
          remove('http://localhost:8081/wishlist/',this.state.wishlistId,itemId,this.getItems);
        })
        .catch((e) => {
          console.log(e);
        });
      // alert("Successfully added the item to your Cart.");
      // window.location = "/cart";
    };
  
    addToCart = (item,chosenSize) => {
      const data = {
        cartId: this.state.cartId,
        itemId: item.itemId,
        itemSize: chosenSize,
        itemTitle: item.title,
        itemGroup: item.groupId,
        itemCategory: item.categoryId,
        itemImageURL: item.imageUrl,
        itemQuantity: 1,
        itemPrice: item.price,
      };
      console.log(data);
      Axios.post(`http://localhost:8081/cartItem`, data)
        .then((response) => {
          this.setState({isAdded:true});
          console.log(response.data);
          let quantity = this.props.totalQuantity + 1;
          this.props.setTotalQuantity(quantity);
          remove('http://localhost:8081/wishlist/',this.state.wishlistId,item.itemId,this.getItems);
        })
        .catch((e) => {
          console.log(e);
        });
      // alert("Successfully added the item to your Cart.");
      //  window.location = "/cart";
    };

    handleAlertClose = () => {
      this.setState({ showAlert: false,chosenSize:'na' });
    };

    handleSelectedSize = (s) => {
      this.setState({chosenSize:s})
    }

    handleAlertOk = () => {
      if(this.state.chosenSize !== 'na')
        this.add(this.state.item,this.state.chosenSize);
      this.handleAlertClose();
    }

    alert = () => {
      this.setState({isAdded:false})
    }
      
      
  
  render(){
    if (this.props.email === null) return <Redirect to="/login" />;
    
    // if (this.state.isLoaded && this.state.total===0)
    //   return(
    //     <div className="Item">
    //       <div className="NoItem">
    //         <center>
    //           <img src="https://www.scholarswing.in/resources/images/empty-cart.png" />
    //           <h3>OOPS nothing found in your Wishlist!!! </h3>
    //           <h1>
    //             <Link to="/">SHOP HERE</Link>
    //           </h1>
    //         </center>
    //       </div>
    //     </div>
    //   );
    
    if(this.state.isLoaded)
        return (
          <div className="Item">
             Wishlist
          <br />
          <br />
          
          <Grid container direction="row" style={{paddingLeft:30}}> 
            {this.state.wishlistItems.map((item,index)=>
            <Grid key={item} item sm={3} xs={12} >
            <ItemDetails key={item} item={item} wishlistId={this.state.wishlistId} getItems={this.getItems} moveToCart={this.moveToCart}/>
            </Grid>
          )}
          </Grid>
          {/* {this.state.isAdded && (
          <Alert severity="success">Item Successfully Added</Alert>
          )} */}
          {this.state.showAlert && (
          <CustomAlert
            handleAlertClose={this.handleAlertClose}
            handleAlertOk={this.handleAlertOk}
            handleSelectedSize={this.handleSelectedSize}
            showAlert={this.state.showAlert}
            sizes={this.state.sizes}
            chosenSize={this.state.chosenSize}
          />
        )}
          </div>
        )
    return (
      <div className="Item">
        <center>
          <img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />
        </center>
      </div>
    );
    }

}
export default withRouter(WishlistDirectory);
