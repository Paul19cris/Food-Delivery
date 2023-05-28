package com.social.backend.Controller;

import com.social.backend.Model.Account;
import com.social.backend.Model.OrderItem;
import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Service.AccountService;
import com.social.backend.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/placeOrder")
    public ReturnWrapper<Account> placeOrder(@RequestParam(name = "email") String email) {
        try {
            return new ReturnWrapper<Account>(orderService.placeOrder(email));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }

    @GetMapping("/getOrders")
    public ReturnWrapper<List<OrderItem>> getOrders(@RequestParam(name = "email") String email) {
        try {
            return new ReturnWrapper<List<OrderItem>>(orderService.getOrders(email));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<OrderItem>>(ex);
        }
    }

    @GetMapping("/getCurrentNr")
    public ReturnWrapper<List<Integer>> getCurrentNr(@RequestParam(name = "username") String username) {
        try {
            return new ReturnWrapper<List<Integer>>(orderService.getCurrentNr(username));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Integer>>(ex);
        }
    }
}