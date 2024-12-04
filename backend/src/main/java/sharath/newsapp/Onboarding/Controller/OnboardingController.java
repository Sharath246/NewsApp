package sharath.newsapp.Onboarding.Controller;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import sharath.newsapp.Model.User;
import sharath.newsapp.Onboarding.UserSession;
import sharath.newsapp.Onboarding.Repository.OnboardingRequest;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OnboardingController {

    private final ApplicationContext context;

    public OnboardingController(ApplicationContext context) {
        this.context = context;
    }

    @GetMapping("/login")
    public ResponseEntity<String> loginHandler(@RequestHeader String email, @RequestHeader String password) {
        OnboardingRequest onboardingRequest = context.getBean(OnboardingRequest.class);
        User user = onboardingRequest.checkUser(email);
        if (user == null)
            return ResponseEntity.status(400).body("Not Registered");
        else if(user.getPassword().equals(password))
        {
            UserSession session = context.getBean(UserSession.class);
            System.out.println("In login-> "+session.getName());
            return ResponseEntity.ok(user.getName());
        }
        else
            return ResponseEntity.status(400).body("Wrong Password");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerHandler(@RequestBody User user) {
        OnboardingRequest onboardingRequest = context.getBean(OnboardingRequest.class);
        boolean addedUser = onboardingRequest.addUser(user);
        if (addedUser) {
            UserSession session = context.getBean(UserSession.class);
            System.out.println("In register-> "+ session.getName());
            return ResponseEntity.ok("Success");
        } else {
            return ResponseEntity.status(400).body("Failed");
        }
    }

    @GetMapping("/getAll")
    public List<User> getAllUSers() {
        OnboardingRequest onboardingRequest = context.getBean(OnboardingRequest.class);
        return onboardingRequest.allUsers();
    }

    @PostMapping("/logout")
    public String logoutUser(){
        OnboardingRequest onboardingRequest = context.getBean(OnboardingRequest.class);
        if(onboardingRequest.logoutUser())
        return "Success";
        else
        return "Failure";
    }

    @GetMapping("/getsession")
    public String getUserSession(){
        UserSession userSession = context.getBean(UserSession.class);
        return userSession.getName();
    }

}
