package sharath.newsapp.onboarding.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import sharath.newsapp.Model.User;
import sharath.newsapp.onboarding.Repository.UserRepository;

@Service
@RequestScope
public class OnboardingService {

    private final UserRepository userRepo;

    public OnboardingService(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    public String registerUser(User user) {
        boolean addedUser = userRepo.addUser(user);
        if (addedUser) {
            return "Success";
        } else {
            return "Failure";
        }
    }

    public String loginUser(String email,String password){
        User user = userRepo.checkUser(email);
        if (user == null)
            return "Not Registered";
        else if (user.getPassword().equals(password)) {
            return user.getName();
        } else
            return "Wrong Password";
    }

}
