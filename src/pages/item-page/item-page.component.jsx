import React from 'react'
import productService from '../../services/product-service'
import ItemCard from './item-card.component'
import './item-page.styles.scss'

class ItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          categoryId:'',
          groupId:'',
            items: []                   
        }
    }

    componentDidMount(){
      console.log(this.props)

       this.setState({categoryId:this.props.match.params.categoryId,groupId:this.props.match.params.groupId},
        ()=>(
          productService.getItemsByGroupIdCategoryId(this.state.groupId,this.state.categoryId)
          .then(response => {
            this.setState({
              items: response.data
            });
           
          })
          .catch(e => {
            console.log(e);
          })
        ))
    
    }

    render () {        
        
  
        return (
            <center>
            <div className='collection-preview'>          
              <div className="title">{this.state.categoryId.toUpperCase()}</div>     
                <div className='preview'>
                { this.state.items.map(item=>(
                  <ItemCard key={item.itemId} groupId={item.groupId} categoryId={item.categoryId} itemId={item.itemId} imageUrl={item.imageUrl} title={item.title} price={item.price} />
                  ))
                  }
                </div>        
            </div>
            </center>
        )

    }
}
export default ItemPage;
