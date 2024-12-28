package sharath.newsapp.onboarding.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import sharath.newsapp.Model.User;
import sharath.newsapp.onboarding.UserSession;
import sharath.newsapp.onboarding.Repository.UserRepository;

@Service
@RequestScope
public class OnboardingService {

    private final UserRepository userRepo;
    private final UserSession userSession;

    public OnboardingService(UserRepository userRepo, UserSession userSession) {
        this.userRepo = userRepo;
        this.userSession = userSession;
    }

    public String registerUser(User user) {
        boolean addedUser = userRepo.addUser(user);
        if (addedUser) {
            userSession.setEmail(user.getEmail());
            userSession.setUsername(user.getName());
            return "Success";
        } else {
            return "Failed";
        }
    }

    public String loginUser(String email, String password) {
        User user = userRepo.checkUser(email);
        if (user == null)
            return "Not Registered";
        else if (user.getPassword().equals(password)) {
            userSession.setEmail(user.getEmail());
            userSession.setUsername(user.getName());
            return user.getName();
        } else
            return "Wrong Password";
    }

    public boolean logoutUser() {
        userSession.setEmail(null);
        userSession.setUsername(null);
        return true;
    }

    public String getUserSession() {
        return userSession.getUsername();
    }
}
