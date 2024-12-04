package sharath.newsapp.Onboarding;

import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Service
@SessionScope
public class UserSession {
    private String userName;

    public String getName(){
        return userName;
    }
    public void setName(String name){
        userName = name;
    }
}
