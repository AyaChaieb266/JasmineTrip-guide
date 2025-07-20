package com.example.springsecurity.services.Imp;


import com.example.springsecurity.models.User;
import com.example.springsecurity.repository.UserRepository;
import com.example.springsecurity.services.Userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class UserserviceImp implements Userservice {

    @Autowired
    private UserRepository userDao;


    @Override
    public User createUser(User User) {
        return userDao.save(User);
    }

    @Override
    public User updateUser(User User) {
        return userDao.save(User);
    }

    @Override
    public List<User> getAllUser() {
        return userDao.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userDao.findById(id).orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
   userDao.deleteById(id);
    }


}
