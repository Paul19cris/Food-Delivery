import './newRestaurant.css';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUserData } from '../../Application/selectors';
import { Box, Container, FormControl, InputLabel, ListItemButton, MenuItem, Paper, Select, Stack, TextField } from '@mui/material';
import { getRestaurantsData } from '../actions';
import { newRestaurantAsync } from './actions';

const NewRestaurant = () => {
    const dispatch = useAppDispatch();
    const userAccount = useAppSelector(selectUserData);
    const [user, setUser] = useState({});
    const[error, setError] = useState('')
    const[name, setName] = useState('')
    const[type, setType] = useState('')
    const[location, setLocation] = useState('')

    // useEffect(() => {
    //     const ws = new WebSocket('ws://localhost:3000')

    //     ws.onmessage = (event) => {
    //         const nw = JSON.parse(event.data);
    //         setNews((news) => [...news, nw]);
    //     }

    //     return () => {
    //         ws.close()
    //     };
    // })

    useEffect(() => {
        if (userAccount) {
            setUser(userAccount.data.returnValue);
            dispatch(getRestaurantsData(userAccount.data.returnValue.username)).then((e) => {
                // setNews(e.payload.data.returnValue)
            })
        }
    }, [userAccount]);

    const createNewRestaurant = () => {
        if ( name.length > 0 && type.length > 0 && location.length > 0 ) {
            const accountName = user.username
            const lst = [ name,type,location, accountName ]
            dispatch(newRestaurantAsync(lst)).then((e) => {
                window.location.reload()
            })
        }
    }

    const handleType = (event) => {
        setType(event.target.value);
    };

    const handleLocation = (event) => {
        setLocation(event.target.value);
    };

    return(
        <Paper style={{minHeight:'75vh', maxHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'column', justifyContent : 'space-between', rowGap: '19px'}}>
            <Stack className='newRMain' direction={'column'}>
                <Paper style={{display : 'flex', padding: '50px', justifyContent : 'space-between'}}>
                    <Container key={`option`} sx={{ overFlowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4, position: 'center', width: '75%'}}>
                    <TextField key={`restaurantName`} id="restaurantName" label={"Restaurant's name"} fullWidth value={name} onChange={(event) => {setName(event.target.value)}} />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="resturantTypeLabel">Restaurant's Type</InputLabel>
                            <Select
                            labelId="resturantTypeLabel"
                            id="restaurantType"
                            value={type}
                            label="Restaurant's Type"
                            onChange={handleType}
                            >
                            <MenuItem value={"Pizza"}>Pizza</MenuItem>
                            <MenuItem value={"Fast Food"}>Fast Food</MenuItem>
                            <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="restaurantLocationLabel">Restaurant's Location</InputLabel>
                            <Select
                            labelId="restaurantLocationLabel"
                            id="restaurantLocation"
                            value={location}
                            label="Restaurant's Location"
                            onChange={handleLocation}
                            >
                            <MenuItem value={"Alba Iulia"}>Alba Iulia</MenuItem>
                            <MenuItem value={"Bucuresti"}>Bucuresti</MenuItem>
                            <MenuItem value={"Brasov"}>Brasov</MenuItem>
                            <MenuItem value={"Cluj"}>Cluj</MenuItem>
                            <MenuItem value={"Timisoara"}>Timisoara</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Container key={`Error`} style={{ display: 'flex', justifyContent: 'center', color: 'red', fontFamily:'roman'}}>{error}</Container>
                        <Container sx={{ width: '35%', height: '75px' }}>
                            <ListItemButton onClick={() => {createNewRestaurant()}} style={{ fontFamily: 'roman', fontSize:25, backgroundColor: 'rgba(171, 204, 219,0.97)', minWidth: '100px', height: '100%', color: 'white', display: 'flex', justifyContent: 'center' }}>Create</ListItemButton>
                        </Container>
                    </Container>
                </Paper>
            </Stack>
        </Paper>
    )
}

export default NewRestaurant