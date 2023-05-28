package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.Food;
import com.social.backend.Model.OrderItem;
import com.social.backend.Repository.AccountRepository;
import com.social.backend.Repository.RestaurantRepository;
import jakarta.persistence.criteria.Order;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public List<Integer> getCurrentNr(String username) {
        Account account = accountRepository.getAccountByUsername(username).get();
        int orderNr = 0;
        int cartNr = 0;
        for (OrderItem order : account.getOrders()) {
            if (!order.isDelivered()) {
                orderNr += 1;
            }
        }
        for (Food food : account.getBasket()) {
            cartNr += 1;
        }
        List<Integer> list = new ArrayList<Integer>();
        list.add(orderNr);
        list.add(cartNr);
        return list;
    }

    @Override
    public Account placeOrder(String email) throws Exception {
        Account account = accountRepository.getAccountByEmail(email).get();
        OrderItem orderItem = new OrderItem();
        String match = account.getBasket().get(0).getRestaurant();
        for (Food food : account.getBasket()) {
            if (!food.getRestaurant().equals(match)) {
                throw new Exception("Food must be from the same restaurant.");
            }
        }
        int distance = 0;
        int price = 0;
        if (!restaurantRepository.getRestaurantByName(match).get().getLocation().equals(account.getAddress())) {
            distance = 100;
            price += 10;
        }
        orderItem.setDistance(distance);
        orderItem.setOrder(account.getBasket());
        orderItem.setTime();
        orderItem.setRestaurant(account.getBasket().get(0).getRestaurant());
        orderItem.setDelivered(false);
        int id = orderItem.getOrderId();
        for (Food food : account.getBasket()) {
            price += food.getPrice();
        }
        orderItem.setPrice(price);
        account.emptyBasket();
        account.addOrder(orderItem);
        int index = 0;
        for (OrderItem order : account.getOrders()) {
            index  += 1;
        }
        Timer timer = new Timer();
        int finalIndex = index;
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                account.setOrderToDelivered(finalIndex);
                accountRepository.save(account);
            }
        }, ((100 + orderItem.getDistance()) * 100L));
        accountRepository.save(account);
        return account;
    }
    @Override
    public List<OrderItem> getOrders(String email) {
        Account account = accountRepository.getAccountByEmail(email).get();
        List<OrderItem> orderItems = account.getOrders();
        Collections.reverse(orderItems);
        return orderItems;
    }

    @Override
    public Account setOrderToDelivered(String username, int id) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        for (OrderItem order : account.getOrders()) {
            if(order.getOrderId() == id) {
                if (order.getTime().isAfter(LocalDateTime.now().plusMinutes(5))) {
                    order.setDelivered(true);
                }
            }
        }
        accountRepository.save(account);
        return account;
    }
}
