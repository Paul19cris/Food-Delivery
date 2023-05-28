package com.social.backend.Repository;

import com.social.backend.Model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant,Integer> {
    Optional<Restaurant> getRestaurantByName(String name);
}