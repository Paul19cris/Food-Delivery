package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.Food;
import com.social.backend.Model.Restaurant;
import com.social.backend.Model.ReturnWrapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface RestaurantService {
    public Restaurant createNewRestaurant(String name, String type, String location, String username) throws Exception;
    public Restaurant deleteRestaurant(String restaurant);
    public Restaurant getMenuFromRestaurant(String restaurant);
    public List<Restaurant> getRestaurants() throws Exception;
    public List<Restaurant> getFavorites(String username) throws Exception;
    public String addToFavorites(String username, String restaurant) throws Exception;
    public Restaurant getRestaurantByName(String restaurant) throws Exception;
    public String getRestaurantStatus(String username, String restaurant) throws Exception;
    public List<Restaurant> getRestaurantsOfUser(String username) throws Exception;
    public List<Restaurant> sortRestaurants(String name, String type, String location) throws Exception;
}
