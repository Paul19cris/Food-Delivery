package com.social.backend.Service;

import com.social.backend.Model.*;
import com.social.backend.Repository.AccountRepository;
import com.social.backend.Repository.RestaurantRepository;
import com.social.backend.Validates.AccountValidates;
import com.social.backend.Validates.RestaurantValidates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountValidates accountValidates;
    @Autowired
    private RestaurantValidates friendValidates;
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public Account register(Account account) throws Exception {
        Optional<Account> accountOptional = accountRepository.getAccountByUsername(account.getUsername());
        if(accountOptional.isPresent()){
            throw new Exception("Username already exists.");
        }
        Optional<Account> emailOptional = accountRepository.getAccountByEmail(account.getEmail());
        if(emailOptional.isPresent()){
            throw new Exception("Email already exists.");
        }
        try{
            accountValidates.checkAccount(account);
        }
        catch (IllegalAccessException e) {
            throw new Exception(e.getMessage());
        }
        accountRepository.save(account);
        Optional<Account> accountCheck = accountRepository.getAccountByEmail(account.getEmail());
        return accountCheck.get();
    }

    @Override
    public Account login(Account account) throws Exception {
        Optional<Account> accountCheck = accountRepository.getAccountByEmail(account.getEmail());
        if(accountCheck.isEmpty()){
            throw new Exception("Email does not exist.");
        }
        if(!accountCheck.get().getPassword().equals(account.getPassword())){
            throw new Exception("Incorrect password.");
        }
        return accountCheck.get();
    }

    @Override
    public Account getAccountByEmail(String email) throws Exception{
        Optional<Account> account = accountRepository.getAccountByEmail(email);
        if ( account.isEmpty() ){
            throw new Exception("Account does not exist.");
        }
        return account.get();
    }

    @Override
    public Account getAccountByUsername(String username) throws Exception{
        Optional<Account> account = accountRepository.getAccountByUsername(username);
        if ( account.isEmpty() ){
            throw new Exception("Account does not exist.");
        }
        return account.get();
    }

    @Override
    public ArrayList<Account> getAccounts() throws Exception {
        ArrayList<Account> accounts = (ArrayList<Account>) accountRepository.findAll();
        if ( accounts.isEmpty() ) {
            throw new Exception("Nothing was found.");
        }
        return accounts;
    }

    @Override
    public ArrayList<Account> getAccountsByKey(String key) throws Exception {
        ArrayList<Account> accounts = (ArrayList<Account>) accountRepository.findAll();
        ArrayList<Account> finalAccounts = new ArrayList<Account>();
        for(Account i : accounts){
            if (i.getUsername().toLowerCase().startsWith(key.toLowerCase())) {
                finalAccounts.add(i);
            }
        }
        if ( finalAccounts.isEmpty() ) {
            throw new Exception("Nothing was found.");
        }
        return finalAccounts;
    }
    @Override
    public Boolean changeUsername(String username, String newUsername, String email, String password) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        Optional<Account> checkIfExist = accountRepository.getAccountByUsername(newUsername);
        if(checkIfExist.isPresent()){
            throw new Exception("Username already exists.");
        }
        if (!account.getEmail().equals(email)) {
            throw new Exception("Wrong email");
        }
        if (!account.getPassword().equals(password)) {
            throw new Exception("Wrong password");
        }
        for (Restaurant restaurant : restaurantRepository.findAll()) {
            if (restaurant.getOwner().equals(username)) {
                restaurant.setOwner(newUsername);
                restaurantRepository.save(restaurant);
            }
        }
        account.setUsername(newUsername);
        try{
            accountValidates.checkAccount(account);
        }
        catch (IllegalAccessException e) {
            throw new Exception(e.getMessage());
        }
        accountRepository.save(account);
        return true;
    }
    @Override
    public Boolean deleteAccount(String username, String confirm, String email, String password) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        int id = account.getId();
        if (!confirm.equals("YES")) {
            throw new Exception("Delete was not confirmed.");
        }
        if (!account.getEmail().equals(email)) {
            throw new Exception("Wrong email");
        }
        if (!account.getPassword().equals(password)) {
            throw new Exception("Wrong password");
        }
        try {
            accountRepository.deleteById(id);
        }
        catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return true;
    }
    @Override
    public Boolean changeEmail(String username, String newEmail, String email, String password) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        Optional<Account> checkEmail = accountRepository.getAccountByEmail(newEmail);
        if(checkEmail.isPresent()){
            throw new Exception("Email already exists.");
        }
        if (!account.getEmail().equals(email)) {
            throw new Exception("Wrong email");
        }
        if (!account.getPassword().equals(password)) {
            throw new Exception("Wrong password");
        }
        account.setEmail(newEmail);
        try{
            accountValidates.checkAccount(account);
        }
        catch (IllegalAccessException e) {
            throw new Exception(e.getMessage());
        }
        accountRepository.save(account);
        return true;
    }
    @Override
    public Boolean changePassword(String username, String newPassword, String email, String password) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        if (!account.getEmail().equals(email)) {
            throw new Exception("Wrong email");
        }
        if (!account.getPassword().equals(password)) {
            throw new Exception("Wrong password");
        }
        account.setPassword(newPassword);
        try{
            accountValidates.checkAccount(account);
        }
        catch (IllegalAccessException e) {
            throw new Exception(e.getMessage());
        }
        accountRepository.save(account);
        return true;
    }
}