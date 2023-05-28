package com.social.backend.Service;

import com.social.backend.Model.Account;

import java.util.ArrayList;

public interface AccountService {
    public Account register(Account account) throws Exception;
    public Account login(Account account) throws Exception;
    public ArrayList<Account> getAccountsByKey(String key) throws Exception;
    public ArrayList<Account> getAccounts() throws Exception;
    public Account getAccountByEmail(String email) throws Exception;
    public Account getAccountByUsername(String username) throws Exception;
    public Boolean changeUsername(String username, String newUsername, String email, String password) throws Exception;
    public Boolean changeEmail(String username, String newEmail, String email, String password) throws Exception;
    public Boolean changePassword(String username, String newPassword, String email, String password) throws Exception;
    public Boolean deleteAccount(String username, String confirm, String email, String password) throws Exception;
}
