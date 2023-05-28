package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.Food;
import com.social.backend.Model.OrderItem;
import com.social.backend.Model.Restaurant;
import com.social.backend.Repository.AccountRepository;
import com.social.backend.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FoodServiceImpl implements FoodService {
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Override
    public Account addFoodToBasket(int id, String restaurant, String email) {
        Account account = accountRepository.getAccountByEmail(email).get();
        Restaurant r = restaurantRepository.getRestaurantByName(restaurant).get();
        for (Food food : r.getMenu()) {
            if (food.getId() == id) {
                account.addBasket(food);
            }
        }
        accountRepository.save(account);
        return account;
    }
    @Override
    public Account deleteFoodFromBasket(int id, String email){
        Account account = accountRepository.getAccountByEmail(email).get();
        for (Food food : account.getBasket()) {
            if (food.getId() == id) {
                account.removeBasket(food);
                break;
            }
        }
        accountRepository.save(account);
        return account;
    }
    @Override
    public List<OrderItem> getBasket(String email) {
        Account account = accountRepository.getAccountByEmail(email).get();
        return account.getOrders();
    }
    @Override
    public Restaurant addNewFoodToRestaurant(String name, String origin, int price, int calories, String ingredient1, String ingredient2, String ingredient3, String restaurant) {
        Food food = new Food();
        food.setName(name);
        food.setOrigin(origin);
        food.setPrice(price);
        food.setCalories(calories);
        food.setRestaurant(restaurant);
        food.addIngredients(ingredient1);
        food.addIngredients(ingredient2);
        food.addIngredients(ingredient3);
        Restaurant r = restaurantRepository.getRestaurantByName(restaurant).get();
        r.addToMenu(food);
        restaurantRepository.save(r);
        return r;
    }
    @Override
    public Restaurant deleteFoodFromMenu(int id, String restaurant) throws Exception {
        Restaurant r = restaurantRepository.getRestaurantByName(restaurant).get();
        for (Food food : r.getMenu()) {
            if (food.getId() == id) {
                r.removeFromMenu(food);
                break;
            }
        }
        restaurantRepository.save(r);
        return r;
    }
    @Override
    public List<Food> getFoodByOrigin(String origin, String restaurant) {
        return null;
    }
    public List<Food> sortFoodByPrice() {
        return null;
    }
    public List<Food> sortFoodByCalories() {
        return null;
    }
    public List<Food> getRestaurantMenu(String restaurant) throws Exception {
        List<Food> menu = new ArrayList<Food>();
        Restaurant r = restaurantRepository.getRestaurantByName(restaurant).get();
        return r.getMenu();
    }
}
