package com.social.backend.Service;

import com.social.backend.Model.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface FoodService {
    public Account addFoodToBasket(int id, String restaurant, String email);
    public Account deleteFoodFromBasket(int id, String email);
    public List<OrderItem> getBasket(String email);
    public Restaurant addNewFoodToRestaurant(String name, String origin, int price, int calories, String ingredient1, String ingredient2, String ingredient3, String restaurant);
    public Restaurant deleteFoodFromMenu(int id, String restaurant) throws Exception;
    public List<Food> getFoodByOrigin(String origin, String restaurant);
    public List<Food> sortFoodByPrice();
    public List<Food> sortFoodByCalories();
    public List<Food> getRestaurantMenu(String restaurant) throws Exception;
}
