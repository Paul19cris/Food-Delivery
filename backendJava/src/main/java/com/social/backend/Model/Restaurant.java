package com.social.backend.Model;

import jakarta.persistence.*;
import org.aspectj.weaver.ast.Not;
import org.aspectj.weaver.ast.Or;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String owner;
    private String location;
    private String type;
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable
    private final List<Food> menu = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public List<Food> getMenu() {
        return menu;
    }

    public void addToMenu(Food food) {
        this.menu.add(food);
    }

    public void removeFromMenu(Food food){
        this.menu.remove(food);
    }
}