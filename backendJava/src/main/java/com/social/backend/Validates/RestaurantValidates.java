package com.social.backend.Validates;

import com.social.backend.Model.Account;
import com.social.backend.Model.Restaurant;
import org.springframework.stereotype.Component;

@Component
public class RestaurantValidates {
    private int check;
    public int checkRestaurant(Restaurant restaurant){
//        check = 0;
//        List<Friend> lst = account.getFriends().stream().filter(f -> friend.getUsername().equals(f.getFriendName())).collect(Collectors.toList());
//        if ( !lst.isEmpty() ) {
//            check += 1;
//            if( lst.get(0).getFriendType().equals("Request Received.") ){
//                check += 1;
//            }
//            if( lst.get(0).getFriendType().equals("Friends.") ){
//                check += 2;
//            }
//        }
        return 0;
    }
    public boolean checkFavorite(Account account, String restaurant) {
        for (Restaurant r : account.getFavorites()) {
            if (r.getName().equals(restaurant)) {
                return true;
            }
        }
        return false;
    }
}
