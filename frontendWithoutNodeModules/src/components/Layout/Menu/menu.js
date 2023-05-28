import './menu.css';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUserData } from '../../Application/selectors';
import { Box, Button, Container, FormControl, IconButton, InputLabel, List, ListItemButton, ListItemText, MenuItem, Paper, Select, TextField } from '@mui/material';
import { getFavoritesData, getRestaurantsData, sortRestaurantsAsync } from '../actions';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../api/paths';

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userAccount = useAppSelector(selectUserData);
    const [restaurants, setRestaurants] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [postDate, setPostDate] = useState(true);
    const [left, setLeft] = useState("");
    const [middle, setMiddle] = useState("");
    const [right, setRight] = useState("");
    const [nr, setNr] = useState(0);
    const [order, setOrder] = useState(0);
    const [name, setName] = useState(``);
    const [location, setLocation] = useState(``);
    const [type, setType] = useState(``);

    useEffect(() => {
        if (userAccount) {
            dispatch(getRestaurantsData()).then((e) => {
                setRestaurants(e.payload.data.returnValue)
            })
            dispatch(getFavoritesData(userAccount.data.returnValue.username)).then((e) => {
                if (e.payload.data.isSuccess === true) {
                    setFavorites(e.payload.data.returnValue)
                    setNr(e.payload.data.returnValue.length)
                    setOrder(e.payload.data.returnValue.length-2)
                    setLeft(e.payload.data.returnValue[e.payload.data.returnValue.length-3].name)
                    setMiddle(e.payload.data.returnValue[e.payload.data.returnValue.length-2].name)
                    setRight(e.payload.data.returnValue[e.payload.data.returnValue.length-1].name)
                }
            })
        }
    }, [userAccount]);

    const handleMouseEnter = () => {
        setPostDate(false)
    }

    const handleMouseLeave = () => {
        setPostDate(true)
    }

    const goToRestaurant = (key) => {
        navigate(`${paths.RESTAURANT}/?restaurant=${key}`);
      };

    const getRestaurants = (
        restaurants && restaurants.map((val) => {
            return (
                <List style={{ background: 'rgba(0,162,232,0.5)', display: 'flex', flexDirection: 'column', padding: '19px' }} key={val.id} > 
                    <List style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                        <div sx={{fullWidth: '350px'}}>
                            <ListItemButton style={{display: 'flex', flexDirection: 'row', gap: '19px'}} onClick={() => {goToRestaurant(val.name)}}>
                                <ListItemText primary={val.name} style={{color: 'rgba(255,255,255,0.75)'}}></ListItemText>
                            </ListItemButton>
                        </div>
                        <List primary={val.location} style={{color: 'rgba(255,255,255,0.75)'}}>{val.location}</List>
                        <List style={{color: 'rgba(255,255,255,0.75)'}} sx={{right: '0px'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {postDate ? `${val.type}` : `${val.owner}`}
                        </List>
                    </List>
                </List>)
        })
    )
    
    const goLeft = () => {
        
        if (order === 0) {
            setOrder(order+nr-2)
        }
        else {
            setLeft(favorites[order % nr - 1].name);
            setMiddle(favorites[order % nr].name);
            setRight(favorites[order % nr + 1].name);
            setOrder((order - 1)%nr);
      }
    };
      
      const goRight = () => {
        if (order+2 < nr) {
            setLeft(favorites[order % nr].name);
            setMiddle(favorites[order % nr + 1].name);
            setRight(favorites[order % nr + 2].name);
            setOrder((order + 1)%nr);
        }
        else setOrder(nr-order)
    };

    const sortRestaurants = () => {
        dispatch(sortRestaurantsAsync([name,type,location])).then((e) => {
            setRestaurants(e.payload.data.returnValue)
        })
    }

    return(
        <Paper style={{minHeight:'75vh', maxHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
            <Container style={{background: 'rgba(0,0,0,0)', padding: '5%', gap: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <IconButton onClick={() => {goLeft()}}>←</IconButton>
                <List style={{background: 'rgba(0,0,0,0.5)', width: '30%', height: '30%'}} >{left}</List>
                <List style={{background: 'rgba(0,0,40,0.5)', width: '40%', minHeight: '40%'}} >{middle}</List>
                <List style={{background: 'rgba(0,0,0,0.5)', width: '30%', height: '30%'}}>{right}</List>
                <IconButton onClick={() => {goRight()}}>→</IconButton>
            </Container>
            <List style={{ background: 'rgba(0,162,232,0.5)', display: 'flex', flexDirection: 'column', padding: '19px' }} key={"1"} > 
                <List style={{gap: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                    <TextField id="name"
                        label={"Name"}
                        value={name}
                        onChange={(event) => {setName(event.target.value)}} />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="typeLabel">Type</InputLabel>
                            <Select
                            labelId="typeLabel"
                            id="type"
                            value={type}
                            label="Type"
                            onChange={(event) => {setType(event.target.value)}}
                            >
                            <MenuItem value={""}>None</MenuItem>
                            <MenuItem value={"Pizza"}>Pizza</MenuItem>
                            <MenuItem value={"Fast Food"}>Fast Food</MenuItem>
                            <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="locationLabel">Location</InputLabel>
                            <Select
                            labelId="locationLabel"
                            id="location"
                            value={location}
                            label="Location"
                            onChange={(event) => {setLocation(event.target.value)}}
                            >
                            <MenuItem value={""}>None</MenuItem>
                            <MenuItem value={"Alba Iulia"}>Alba Iulia</MenuItem>
                            <MenuItem value={"Bucuresti"}>Bucuresti</MenuItem>
                            <MenuItem value={"Brasov"}>Brasov</MenuItem>
                            <MenuItem value={"Cluj"}>Cluj</MenuItem>
                            <MenuItem value={"Timisoara"}>Timisoara</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button variant="contained" color="primary" onClick={() => {sortRestaurants()}}>SORT</Button>
                </List>
            </List>
            <Container style={{backgroundColor: 'rgba(0,0,0,0)', maxHeight: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
                {getRestaurants}
            </Container>
        </Paper>
    )
}

export default Menu