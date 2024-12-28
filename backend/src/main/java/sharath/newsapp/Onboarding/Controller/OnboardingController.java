package sharath.newsapp.onboarding.Controller;

import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import sharath.newsapp.Model.User;
import sharath.newsapp.onboarding.Service.OnboardingService;

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
        OnboardingService onboardingRequest = context.getBean(OnboardingService.class);
        String response = onboardingRequest.loginUser(email, password);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerHandler(@RequestBody User user) {
        OnboardingService onboardingRequest = context.getBean(OnboardingService.class);
        String response = onboardingRequest.registerUser(user);
        return ResponseEntity.ok(response);
    }

    // @GetMapping("/getAll")
    // public List<User> getAllUSers() {
    // OnboardingRequest onboardingRequest =
    // context.getBean(OnboardingRequest.class);
    // return onboardingRequest.allUsers();
    // }

    @PostMapping("/logout")
    public String logoutUser() {
        OnboardingService onboardingRequest = context.getBean(OnboardingService.class);
        if (onboardingRequest.logoutUser()) {
            return "Success";
        } else
            return "Failed";
    }

    @GetMapping("/getsession")
    public String getUserSession() {
        OnboardingService onboardingRequest = context.getBean(OnboardingService.class);
        return onboardingRequest.getUserSession();
    }

}
