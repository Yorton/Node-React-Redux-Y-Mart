import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
//import data from '../data';
//import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen(props) {
    //const [products, setProduct] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';

    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;

    const dispatch= useDispatch();

    useEffect(() => {

        dispatch(listProducts(category));

        // const fetchData = async ()=>{
        //     const {data} = await axios.get('/api/products');
        //     setProduct(data);
        // }

        // fetchData();

        return () => {

        };
    },[category]);



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword, sortOrder));

        //setSearchKeyword('');
        //setSortOrder('');
    };
    
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, sortOrder));
    };

    return (<>
                {category && <h2>{category}</h2>}

                <ul className="filter">
                    <li>
                        <form onSubmit={submitHandler}>
                            <input
                                name="searchKeyword"
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <button type="submit">Search</button>
                        </form>
                    </li>
                    <li>
                        Sort By{' '}
                        <select name="sortOrder" onChange={sortHandler}>
                            <option value="">Newest</option>
                            <option value="lowest">Lowest</option>
                            <option value="highest">Highest</option>
                        </select>
                    </li>
                </ul> 
                {
                    loading ? (<div>Loading...</div>) :
                    error ? (<div>{error}</div>) : 
                    (

                        <ul className="products">
                            {
                                console.log("products", products)
                            }
                            {
                                //data.products.map(product => (
                                products.map(product => (
                                    <li key={product._id}>
                                        <div className="product">
                                            <Link to={"/product/"+product._id}>
                                                <img className="product-image" 
                                                src={product.image} 
                                                alt="product" />
                                            </Link>
                                            <div className="product-name">
                                                <Link to={"/product/"+product._id}>{product.name}</Link>
                                            </div>
                                            <div className="product-brand">{product.brand}</div>
                                            <div className="product-price">{product.price}</div>
                                            <div className="product-rating">
                                                {
                                                    /*
                                                    {product.rating} Stars ({product.numReviews} Reviews)
                                                    */
                                                }
                                                <Rating
                                                    value={product.rating}
                                                    text={product.numReviews + ' reviews'}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))    
                            }
                        </ul>
                    )
                }
            </>) 

}

export default HomeScreen;
