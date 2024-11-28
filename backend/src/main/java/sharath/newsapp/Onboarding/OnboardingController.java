package sharath.newsapp.Onboarding;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import sharath.newsapp.User;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OnboardingController {

    @GetMapping("/login")
    public ResponseEntity<User> loginHandler(@RequestHeader String email) {
        User user = new User();
        user.setName("Sharath");
        user.setEmail(email);
        user.setPassword("a");
        // if(user.getEmail().equals("a@a.com") && user.getPassword().equals("a"))
        return ResponseEntity.status(200).body(user);
        // else 
        // return ResponseEntity.status(200).body(null);
    }

    @PostMapping("/register")
    public String registerHandler(@RequestBody User user) {
        return "User Added";
    }
}
