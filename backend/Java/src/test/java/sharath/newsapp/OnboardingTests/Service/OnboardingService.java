package sharath.newsapp.OnboardingTests.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import sharath.newsapp.Model.User;
import sharath.newsapp.Onboarding.UserSession;
import sharath.newsapp.Onboarding.Repository.UserRepository;
import sharath.newsapp.Onboarding.ResponseDTO.LoginResponseDTO;

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

    public LoginResponseDTO loginUser(String email, String password) {
        User user = userRepo.checkUser(email);
        LoginResponseDTO loginResponse = new LoginResponseDTO();
        if (user == null)
            loginResponse.setResponse("Not Registered");
        else if (user.getPassword().equals(password)) {
            userSession.setEmail(user.getEmail());
            userSession.setUsername(user.getName());
            loginResponse.setEmail(email);
            loginResponse.setName(user.getName());
            loginResponse.setTopics(user.getTopics());
            loginResponse.setResponse("Success");
        } else
            loginResponse.setResponse("Wrong Password");
        return loginResponse;
    }

    public boolean addTopic(String topic,String email){
        userRepo.addTopic(email, topic);
        return true;
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
