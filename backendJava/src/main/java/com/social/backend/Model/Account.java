package com.social.backend.Model;

import jakarta.persistence.*;
import org.aspectj.weaver.ast.Not;
import org.aspectj.weaver.ast.Or;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String email;
    private String password;
    private String address;
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable
    private final List<OrderItem> orders = new ArrayList<>();
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable
    private List<Food> basket = new ArrayList<>();
    @ManyToMany( cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable
    private final List<Restaurant> favorites = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<OrderItem> getOrders() {
        return orders;
    }

    public void addOrder(OrderItem order) {
        this.orders.add(order);
    }

    public void setOrderToDelivered(int index) {
        for (OrderItem ord : this.orders) {
            if ( ord.getOrderId() == index) {
                this.orders.remove(ord);
                ord.setDelivered(true);
                this.orders.add(ord);
            }
        }
    }

    public void removeOrder(OrderItem order){
        this.orders.remove(order);
    }

    public List<Food> getBasket() {
        return basket;
    }
    public void emptyBasket() {
        this.basket = new ArrayList<Food>();
    }

    public void addBasket(Food food) {
        this.basket.add(food);
    }

    public void removeBasket(Food food){
        this.basket.remove(food);
    }

    public List<Restaurant> getFavorites() {
        return favorites;
    }

    public void addFavorites(Restaurant restaurant) {
        this.favorites.add(restaurant);
    }

    public void removeFavorite(Restaurant restaurant) {
        this.favorites.remove(restaurant);
    }
}
