package com.social.backend.Controller;

import com.social.backend.Model.*;
import com.social.backend.Service.AccountService;
import com.social.backend.Service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
@CrossOrigin
public class FoodController {
    @Autowired
    private FoodService foodService;

    @PostMapping("/addNewFoodToRestaurant")
    public ReturnWrapper<Restaurant> addNewFoodToRestaurant(@RequestParam(name = "name") String name, @RequestParam(name = "origin") String origin, @RequestParam(name = "price") int price, @RequestParam(name = "calories") int calories, @RequestParam(name = "ingredient1") String ingredient1, @RequestParam(name = "ingredient2") String ingredient2, @RequestParam(name = "ingredient3") String ingredient3, @RequestParam(name = "restaurant") String restaurant){
        try {
            return new ReturnWrapper<Restaurant>(foodService.addNewFoodToRestaurant(name, origin, price, calories, ingredient1, ingredient2, ingredient3, restaurant));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Restaurant>(ex);
        }
    }

    @PostMapping("/deleteFoodFromMenu")
    public ReturnWrapper<Restaurant> deleteFoodFromMenu(@RequestParam(name = "id") int id, @RequestParam(name = "restaurant") String restaurant){
        try {
            return new ReturnWrapper<Restaurant>(foodService.deleteFoodFromMenu(id, restaurant));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Restaurant>(ex);
        }
    }

    @GetMapping("/getFoodByOrigin")
    public ReturnWrapper<List<Food>> getFoodByOrigin(@RequestParam(name = "origin") String origin, @RequestParam(name = "restaurant") String restaurant){
        try {
            return new ReturnWrapper<List<Food>>(foodService.getFoodByOrigin(origin, restaurant));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Food>>(ex);
        }
    }

    @GetMapping("/getRestaurantMenu")
    public ReturnWrapper<List<Food>>  getRestaurantMenu(@RequestParam(name = "restaurant") String restaurant) {
        try {
            return new ReturnWrapper<List<Food>>(foodService.getRestaurantMenu(restaurant));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Food>>(ex);
        }
    }

    @GetMapping("/sortFoodByPrice")
    public ReturnWrapper<List<Food>> sortFoodByPrice() {
        try {
            return new ReturnWrapper<List<Food>>(foodService.sortFoodByPrice());
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Food>>(ex);
        }
    }

    @GetMapping("/sortFoodByCalories")
    public ReturnWrapper<List<Food>> sortFoodByCalories() {
        try {
            return new ReturnWrapper<List<Food>>(foodService.sortFoodByCalories());
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Food>>(ex);
        }
    }
    @PostMapping("/addFoodToBasket")
    public ReturnWrapper<Account> addFoodToBasket(@RequestParam("id") int id, @RequestParam("restaurant") String restaurant, @RequestParam("email") String email){
        try {
            return new ReturnWrapper<Account>(foodService.addFoodToBasket(id, restaurant, email));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }

    @PostMapping("/deleteFoodFromBasket")
    public ReturnWrapper<Account> deleteFoodFromBasket(@RequestParam(name = "id") int id, @RequestParam(name = "email") String email){
        try {
            return new ReturnWrapper<Account>(foodService.deleteFoodFromBasket(id, email));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }

    @GetMapping("/getBasket")
    public ReturnWrapper<List<OrderItem>> getBasket(@RequestParam(name = "email") String email) {
        try {
            return new ReturnWrapper<List<OrderItem>>(foodService.getBasket(email));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<OrderItem>>(ex);
        }
    }
}
