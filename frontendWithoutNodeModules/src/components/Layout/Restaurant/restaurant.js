import { Button, List, ListItemText, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { paths } from "../../../api/paths";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../Application/selectors";
import { addFoodToMenu, addToCartAsync, addToFavoritesData, deleteFoodAsync, getRestaurantMenu, getRestaurantStatus } from "../actions";
import "./restaurant.css"
import { fetchVisitRestaurantData } from "./actions";
import pizza from "./pizza.png"
import restaurant from "./restaurant.png"
import fastfood from "./fastfood.png"

const Restaurant = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userAccount = useAppSelector(selectUserData);
    const url = new URLSearchParams(window.location.search);
    const visitUsername = url.get("restaurant");
    const [visitRestaurant, setVisitRestaurant] = useState({});
    const [user, setUser] = useState({});
    const [menu, setMenu] = useState([]);
    const [postDate, setPostDate] = useState(false);
    const [restaurantStatus, setRestaurantStatus] = useState("");
    const [picture, setPicture] = useState("");
    const [name, setName] = useState(``);
    const [origin, setOrigin] = useState(``);
    const [price, setPrice] = useState();
    const [calories, setCalories] = useState();
    const [ingredient1, setIngredient1] = useState(``);
    const [ingredient2, setIngredient2] = useState(``);
    const [ingredient3, setIngredient3] = useState(``);

    useEffect(() => {
        if (userAccount) {
            setUser(userAccount.data.returnValue);
            dispatch(fetchVisitRestaurantData(visitUsername)).then((result) => {
                setVisitRestaurant(result.payload.data.returnValue);
                if (result.payload.data.returnValue.type === "Pizza") setPicture(pizza);
                if (result.payload.data.returnValue.type === "Restaurant") setPicture(restaurant);
                if (result.payload.data.returnValue.type === "Fast Food") setPicture(fastfood);
            })
            dispatch(getRestaurantMenu(visitUsername)).then((e) => {
                setMenu(e.payload.data.returnValue)
            })
        }
    }, [userAccount]);

    useEffect(() => {
        dispatch(getRestaurantStatus([user.username, visitRestaurant.name])).then((e) => {
            setRestaurantStatus(e.payload.data.returnValue)
        })
    }, [restaurantStatus])

    const handleMouseEnter = () => {
        setPostDate(false)
    }

    const handleMouseLeave = () => {
        setPostDate(true)
    }

    const goToRestaurant = (key) => {
        navigate(`${paths.RESTAURANT}/?restaurant=${key}`);
      };

    const addToFavorites = (key) => {
        if (user.username !== key) {
            dispatch(addToFavoritesData([user.username, key])).then((e) => {
                setRestaurantStatus(e.payload.data.returnValue)
                window.location.reload()
            })
        }
    }

    const deleteFood = (key) => {
        dispatch(deleteFoodAsync([key, visitRestaurant.name])).then((e) => {
            window.location.reload()
        })
    }

    const addToCart = (key) => {
        dispatch(addToCartAsync([key, visitRestaurant.name, userAccount.data.returnValue.email])).then((e) => {    
            window.location.reload()
        })
    }


    const getMenu = (
        menu.map((val) => {
            return (
                <List style={{ background: 'rgba(0,162,232,0.5)', display: 'flex', flexDirection: 'column', padding: '19px', justifyContent: 'center' }} key={val.id} > 
                    <List style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                        <div sx={{fullWidth: '350px'}}>
                            <ListItemText primary={val.name} style={{color: 'rgba(255,255,255,0.75)'}}></ListItemText>
                        </div>
                        <List style={{color: 'rgba(255,255,255,0.75)'}} sx={{right: '0px'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {val.origin}
                        </List>
                        <List style={{color: 'rgba(255,255,255,0.75)'}} sx={{right: '0px'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {postDate ? `${val.price}$` : `${val.calories} Calories`}
                        </List>
                    </List>
                    <List style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <List style={{paddingLeft: '30px', fontSize: 50, color: 'white', fontFamily: 'roman', display: 'flex', flexDirection: 'row'}}>Ingredients: {val.ingredients}</List>
                        <List style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            <Button variant="contained" color="primary" onClick={() => {deleteFood(val.id)}}>DELETE FOOD</Button>
                            <Button variant="contained" color="primary" onClick={() => {addToCart(val.id)}}>ADD TO CART</Button>
                        </List>
                    </List>
                </List>)
        })
      )

    const addFood = () => {
        const food = [name, origin, price, calories, ingredient1, ingredient2, ingredient3, visitRestaurant.name]
        if (name !== "" && origin !== "" && price !== "" && calories !== "") {
            dispatch(addFoodToMenu(food)).then(() =>{
                window.location.reload()
            })
        }
    }

    return(
        <Paper style={{ maxHeight:'75vh', minHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'column', overflow: 'auto', rowGap: '19px'}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Container sx={{ textAlign: 'center' }} className="restaurantPictureHeader">
                    <img src={picture} className="Restaurant-profilePicture" alt="restaurantPicture"/>
                </Container>
                <Button onClick={() => {goToRestaurant(visitRestaurant.name)}}>{visitRestaurant.name}</Button>
                <Button onClick={() => {addToFavorites(visitRestaurant.name)}}>{restaurantStatus}</Button>
            </div>
            <List style={{ background: 'rgba(0,162,232,0.5)', display: 'flex', flexDirection: 'column', padding: '19px' }} key={"1"} > 
                <List style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                    <TextField id="name"
                        label={"Name"}
                        value={name}
                        onChange={(event) => {setName(event.target.value)}} />
                    <TextField id="price"
                        label={"Price"}
                        value={price}
                        onChange={(event) => {setPrice(event.target.value)}} />
                    <TextField id="calories"
                        label={"Calories"}
                        value={calories}
                        onChange={(event) => {setCalories(event.target.value)}} />
                    <TextField id="origin"
                        label={"Origin"}
                        value={origin}
                        onChange={(event) => {setOrigin(event.target.value)}} />
                </List>
                <List style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                    <TextField id="ingredient1"
                        label={"Ingredient 1"}
                        value={ingredient1}
                        onChange={(event) => {setIngredient1(event.target.value)}} />
                    <TextField id="ingredient2"
                        label={"Ingredient 2"}
                        value={ingredient2}
                        onChange={(event) => {setIngredient2(event.target.value)}} />
                    <TextField id="ingredient3"
                        label={"Ingredient 3"}
                        value={ingredient3}
                        onChange={(event) => {setIngredient3(event.target.value)}} />
                    <Button variant="contained" color="primary" onClick={() => {addFood()}}>ADD FOOD</Button>
                </List>
            </List>
            {getMenu}
        </Paper>
    )
}

export default Restaurant;