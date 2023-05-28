package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.OrderItem;
import com.social.backend.Model.ReturnWrapper;
import org.aspectj.weaver.ast.Or;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface OrderService {
    public List<Integer> getCurrentNr(String username);
    public List<OrderItem> getOrders(String email);
    public Account placeOrder(String email) throws Exception;
    Account setOrderToDelivered(String username, int id) throws Exception;
}
