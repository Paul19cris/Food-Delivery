import { Button, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { paths } from "../../../api/paths";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../Application/selectors";
import profilePicture from "../../images/profilePicture/profilePicture.png";
import { fetchVisitData, getUserRestaurantsData } from "../actions";
import "./profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userAccount = useAppSelector(selectUserData);
    const url = new URLSearchParams(window.location.search);
    const visitUsername = url.get("username");
    const [visitAccount, setVisitAccount] = useState({});
    const [restaurants, setRestaurants] = useState([]);
    const [postDate, setPostDate] = useState(false);

    useEffect(() => {
        if (userAccount) {
            dispatch(fetchVisitData(visitUsername)).then((result) => {
                setVisitAccount(result.payload.data.returnValue);
            })
            dispatch(getUserRestaurantsData(visitUsername)).then((e) => {
                setRestaurants(e.payload.data.returnValue)
            })
        }
    }, [userAccount]);

    const handleMouseEnter = () => {
        setPostDate(false)
    }

    const handleMouseLeave = () => {
        setPostDate(true)
    }

    const goToProfile = (key) => {
        navigate(`${paths.PROFILE}/?profile=${key}`);
      };

    const goToRestaurant = (key) => {
        navigate(`${paths.RESTAURANT}/?restaurant=${key}`);
      };

    const getRestaurants = (
        restaurants.map((val) => {
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

    return(
        <Paper style={{ maxHeight:'75vh', minHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Container sx={{ textAlign: 'center' }} className="profilePictureHeader">
                    <img src={profilePicture} className="Profile-profilePicture" alt="profilePicture"/>
                </Container>
                <Button onClick={() => {goToProfile(visitAccount.username)}}>{visitAccount.username}</Button>
            </div>
            <Container style={{backgroundColor: 'rgba(0,0,0,0)', maxHeight: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
                {getRestaurants}
            </Container>
        </Paper>
    )
}

export default Profile;