package sharath.newsapp.OnboardingTests.Controller;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.http.ResponseEntity;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestHeader;

// import sharath.newsapp.Model.User;
// import sharath.newsapp.Onboarding.Controller.OnboardingController;
// import sharath.newsapp.Onboarding.ResponseDTO.LoginResponseDTO;
// import sharath.newsapp.Onboarding.Service.OnboardingService;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// @WebMvcTest(OnboardingController.class)

public class OnboardingControllerTests {

    // @Autowired 
    // private MockMvc mockMvc;

    // @Test
    // public void loginHandlerTest() throws Exception {//(@RequestHeader String email, @RequestHeader String password) {
    //     mockMvc.perform(get("/login").header("email", "a@a.com").header("password", "a"))
    //     .andExpect(status().isOk())
    //     .andExpect(content().string("{\"name\": \"John\",\"email\":\"abcd@abcd.com\",\"password\":\"a\",\"topics:}"));
    // }

    // @Test
    // public void registerHandlerTest() throws Exception {//(@RequestBody User user) {
    //     String user = "{\"name\": \"John\",\"email\":\"abcd@abcd.com\",\"password\":\"a\"}";
    //     mockMvc.perform(post("/register").content(user))
    //     .andExpect(status().isOk())
    //     .andExpect(content().string("Success"));
    // }

    // @PostMapping("/addTopic")
    // public String addTopic(@RequestHeader String topic,@RequestHeader String email) {
    //     OnboardingService onboardingRequest = context.getBean(OnboardingService.class);
    //     if(onboardingRequest.addTopic(topic, email))
    //     return "Success";
    //     else return "Failed";
    // }
    

    // @PostMapping("/logout")
    // public String logoutUser() {
    //     OnboardingService onboardingRequest = context.getBean(OnboardingService.class);
    //     if (onboardingRequest.logoutUser()) {
    //         return "Success";
    //     } else
    //         return "Failed";
    // }

    // @GetMapping("/getsession")
    // public String getUserSession() {
    //     OnboardingService onboardingRequest = context.getBean(OnboardingService.class);
    //     return onboardingRequest.getUserSession();
    // }

}