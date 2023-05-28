import React, { useEffect, useState } from 'react';
import { Button, List, ListItemText, Paper } from "@mui/material";
import { Container } from "@mui/system";
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectUserData } from '../../../Application/selectors';
import { deleteFromCartAsync, placeOrderAsync } from './actions';

const Cart = () => {
    const userAccount = useAppSelector(selectUserData);
    const [user, setUser] = useState({});
    const [postDate, setPostDate] = useState(false);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (userAccount) {
            setUser(userAccount.data.returnValue);
        }
    }, [userAccount]);

    const handleMouseEnter = () => {
        setPostDate(false)
    }

    const handleMouseLeave = () => {
        setPostDate(true)
    }
    
    const deleteFromCart = (key) => {
        dispatch(deleteFromCartAsync([key, userAccount.data.returnValue.email]))
        window.location.reload()
    }

    const getCart = (
        (user.basket || []).map((val) => {
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
                            <Button variant="contained" color="primary" onClick={() => {deleteFromCart(val.id)}}>DELETE FROM CART</Button>
                        </List>
                    </List>
                </List>
            )
        }).reverse()
    )

    const placeOrder = () => {
        dispatch(placeOrderAsync(userAccount.data.returnValue.email)).then((e) => {
            window.location.reload()
        })
    }

    return (
        <Paper style={{minHeight:'75vh', maxHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', rowGap: '19px'}}>
            <Container style={{backgroundColor: 'rgba(0,0,0,0)', maxHeight: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
                {getCart}
            </Container> 
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    style={{ width: '150px' }}
                    variant="contained"
                    color="primary"
                    onClick={() => { placeOrder() }}
                >PLACE ORDER</Button>
            </div>
        </Paper>
    )
}

export default Cart;