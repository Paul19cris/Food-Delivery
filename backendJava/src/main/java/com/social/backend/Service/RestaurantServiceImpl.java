package com.social.backend.Service;

import com.social.backend.Controller.RestaurantController;
import com.social.backend.Model.Account;
import com.social.backend.Model.Food;
import com.social.backend.Model.Restaurant;
import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Repository.AccountRepository;
import com.social.backend.Repository.RestaurantRepository;
import com.social.backend.Validates.RestaurantValidates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantValidates restaurantValidates;

    public Restaurant createNewRestaurant(String name, String type, String location, String username) throws Exception {
        Restaurant restaurant = new Restaurant();
        restaurant.setLocation(location);
        restaurant.setName(name);
        restaurant.setLocation(location);
        restaurant.setOwner(username);
        restaurant.setType(type);
        if(restaurantRepository.getRestaurantByName(name).isPresent()) {
            throw new Exception("Restaurant already exists.");
        }
        try{
            restaurantValidates.checkRestaurant(restaurant);
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        restaurantRepository.save(restaurant);
        return restaurant;
    }
    public Restaurant deleteRestaurant(String restaurant) {
        return null;
    }
    public Restaurant getMenuFromRestaurant(String restaurant) {
        return null;
    }
    @Override
    public List<Restaurant> getRestaurants() throws Exception {
        ArrayList<Restaurant> restaurants = (ArrayList<Restaurant>) restaurantRepository.findAll();
        if ( restaurants.isEmpty() ) {
            throw new Exception("Nothing was found.");
        }
        return restaurants;
    }
    @Override
    public List<Restaurant> getFavorites(String username) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        List<Restaurant> favorites = new ArrayList<Restaurant>();
        favorites.addAll(account.getFavorites());
        if ( favorites.isEmpty() ) {
            throw new Exception("Nothing was found.");
        }
        return favorites;
    }
    @Override
    public String addToFavorites(String username, String restaurant) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        Restaurant r = restaurantRepository.getRestaurantByName(restaurant).get();
        String msg = "Error";
        if (restaurantValidates.checkFavorite(account, restaurant)) {
            account.removeFavorite(r);
            msg = "Remove From Favorites";
        }
        else {
            account.addFavorites(r);
            msg = "Add To Favorites";
        }
        accountRepository.save(account);
        return msg;
    }
    @Override
    public Restaurant getRestaurantByName(String restaurant) throws Exception {
        Restaurant r = restaurantRepository.getRestaurantByName(restaurant).get();
        return r;
    }
    @Override
    public String getRestaurantStatus(String username, String restaurant) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        Restaurant r = restaurantRepository.getRestaurantByName(restaurant).get();
        if (restaurantValidates.checkFavorite(account, restaurant)) return "Remove From Favorites";
        else return "Add To Favorites";
    }
    public List<Restaurant> getRestaurantsOfUser(String username) throws Exception {
        List<Restaurant> restaurants = new ArrayList<Restaurant>();
        for (Restaurant r : restaurantRepository.findAll()) {
            if (r.getOwner().equals(username)) {
                restaurants.add(r);
            }
         }
        return restaurants;
    }
    @Override
    public List<Restaurant> sortRestaurants(String name, String type, String location) throws Exception {
        List<Restaurant> restaurants = new ArrayList<>();
        for (Restaurant r : restaurantRepository.findAll()) {
            if (r.getName().startsWith(name) && r.getType().startsWith(type) && r.getLocation().startsWith(location)) {
                restaurants.add(r);
            }
        }
        return restaurants;
    }
}
