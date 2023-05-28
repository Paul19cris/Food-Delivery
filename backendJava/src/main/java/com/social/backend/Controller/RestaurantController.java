package com.social.backend.Controller;

import com.social.backend.Model.Account;
import com.social.backend.Model.Food;
import com.social.backend.Model.Restaurant;
import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Service.AccountService;
import com.social.backend.Service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurant")
@CrossOrigin
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/createNewRestaurant")
    public ReturnWrapper<Restaurant> createNewRestaurant(@RequestParam(name = "name") String name, @RequestParam(name = "type") String type, @RequestParam(name = "location") String location, @RequestParam(name = "username") String username){
        try {
            return new ReturnWrapper<Restaurant>(restaurantService.createNewRestaurant(name, type, location, username));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Restaurant>(ex);
        }
    }

    @PostMapping("/deleteRestaurant")
    public ReturnWrapper<Restaurant> deleteRestaurant(@RequestBody String restaurant){
        try {
            return new ReturnWrapper<Restaurant>(restaurantService.deleteRestaurant(restaurant));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Restaurant>(ex);
        }
    }

    @GetMapping("/getMenuFromRestaurant")
    public ReturnWrapper<Restaurant> getMenuFromRestaurant(@RequestParam(name = "restaurant") String restaurant) {
        try {
            return new ReturnWrapper<Restaurant>(restaurantService.getMenuFromRestaurant(restaurant));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Restaurant>(ex);
        }
    }

    @GetMapping("/getRestaurants")
    public ReturnWrapper<List<Restaurant>> getRestaurants() {
        try {
            return new ReturnWrapper<List<Restaurant>>(restaurantService.getRestaurants());
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Restaurant>>(ex);
        }
    }

    @GetMapping("/getRestaurantStatus")
    public ReturnWrapper<String> getRestaurantStatus(@RequestParam(name = "username") String username, @RequestParam(name = "restaurant") String restaurant) {
        try {
            return new ReturnWrapper<String>(restaurantService.getRestaurantStatus(username, restaurant));
        }
        catch (Exception ex) {
            return new ReturnWrapper<String>(ex);
        }
    }

    @GetMapping("/getFavorites")
    public ReturnWrapper<List<Restaurant>> getFavorites(@RequestParam(name = "username") String username) {
        try {
            return new ReturnWrapper<List<Restaurant>>(restaurantService.getFavorites(username));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Restaurant>>(ex);
        }
    }

    @PostMapping("/addToFavorites")
    public ReturnWrapper<String> addToFavorites(@RequestParam(name = "username") String username, @RequestParam(name = "restaurant") String restaurant) {
        try {
            return new ReturnWrapper<String>(restaurantService.addToFavorites(username, restaurant));
        }
        catch (Exception ex) {
            return new ReturnWrapper<String>(ex);
        }
    }

    @GetMapping("/getRestaurantByName")
    public ReturnWrapper<Restaurant> getRestaurantByName(@RequestParam(name = "restaurant") String restaurant) {
        try {
            return new ReturnWrapper<Restaurant>(restaurantService.getRestaurantByName(restaurant));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Restaurant>(ex);
        }
    }

    @GetMapping("/getRestaurantsOfUser")
    public ReturnWrapper<List<Restaurant>> getRestaurantsOfUser(@RequestParam(name = "username") String username) {
        try {
            return new ReturnWrapper<List<Restaurant>>(restaurantService.getRestaurantsOfUser(username));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Restaurant>>(ex);
        }
    }

    @GetMapping("/sortRestaurants")
    public ReturnWrapper<List<Restaurant>> sortRestaurants(@RequestParam(name = "name") String name, @RequestParam(name = "type") String type, @RequestParam(name = "location") String location) {
        try {
            return new ReturnWrapper<List<Restaurant>>(restaurantService.sortRestaurants(name, type, location));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Restaurant>>(ex);
        }
    }
}
