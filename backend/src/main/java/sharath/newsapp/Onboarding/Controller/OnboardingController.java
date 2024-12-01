package sharath.newsapp.Onboarding.Controller;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import sharath.newsapp.User;
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
        System.out.println(email + " " + email.length() + " " + password + " " + password.length());
        if (user == null)
            return ResponseEntity.status(400).body("Not Registered");
        else if(user.getPassword().equals(password))
            return ResponseEntity.ok(user.getName());
        else
            return ResponseEntity.status(400).body("Wrong Password");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerHandler(@RequestBody User user) {
        OnboardingRequest onboardingRequest = context.getBean(OnboardingRequest.class);
        boolean addedUser = onboardingRequest.addUser(user);
        if (addedUser) {
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

}
