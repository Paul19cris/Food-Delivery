import { List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { Container } from '@mui/system';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectUserData } from '../../../Application/selectors';
import { getOrderesAsync } from './actions';

const Orders = () => {
    const dispatch = useAppDispatch();
    const userAccount = useAppSelector(selectUserData);
    const [ orders, setOrders ]  = React.useState([]);
    const [ option, setOption ] = React.useState([]);
    const [postDate, setPostDate] = React.useState(true);
    const [details, setDetails] = React.useState([]);

    React.useEffect (() => {
        if (userAccount) {
            dispatch(getOrderesAsync(userAccount.data.returnValue.email)).then((e) => {
                setOrders(e.payload.data.returnValue)
        })
    }
    }, [userAccount] )


    const handleMouseEnter = () => {
        setPostDate(false)
    }

    const handleMouseLeave = () => {
        setPostDate(true)
    }

    const restaurantNames = (
        (orders || []).map((val) => {
            return (
                <ListItemButton key={val.id} onClick={() => { setOption([val.order]); setDetails([val]) }} style={{fontFamily: 'roman', fontSize:25, color: 'white'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                    {val.restaurant}
                </ListItemButton>
                    
            )
        })
    )

    const displayy = option[0] && (
        option[0].map((val) => {
            return (
                <List style={{ background: 'rgba(0,162,232,0.5)', display: 'flex', flexDirection: 'column', padding: '19px', justifyContent: 'center' }} key={`display${val.id}`} > 
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
                    </List>
                </List>)
            }
    ))  

    const getDetails = details && (
        details.map((val) => {
            return (
                <List style={{ background: 'rgba(255, 215, 0, 0.5)', display: 'flex', flexDirection: 'row', padding: '19px', justifyContent: 'space-between' }} key={`details${val.id}`}>
                    <List style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <List style={{paddingLeft: '30px', fontSize: 50, color: 'white', fontFamily: 'roman', display: 'flex', flexDirection: 'row'}}>Price: {val.price}$</List>
                    </List>
                    <List style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <List style={{paddingLeft: '30px', fontSize: 50, color: 'white', fontFamily: 'roman', display: 'flex', flexDirection: 'row'}}>Distance: {val.distance}km</List>
                    </List>
                    <List style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <List style={{paddingLeft: '30px', fontSize: 50, color: 'white', fontFamily: 'roman', display: 'flex', flexDirection: 'row'}}>{val.delivered ? "Delivered" : "Delivering"}</List>
                    </List>
                </List>
            )
        })
    )

    return (
        <Paper style={{ maxHeight:'75vh', minHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'row', rowGap: '19px'}}>
            <List sx={{overflowY: 'auto', height: 'auto', width: '30%', padding: 2}}>    
                {restaurantNames}
            </List>
            <Paper sx={{width: '70%', padding: 7 }} style={{display: 'flex', flexDirection: 'column-reverse', rowGap: 10}}>
                {getDetails}
                <Container style={{backgroundColor: 'rgba(0,0,0,0)', maxHeight: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', rowGap: '19px' }}>
                    {displayy}
                </Container>
            </Paper>
        </Paper>
    )
}

export default Orders;