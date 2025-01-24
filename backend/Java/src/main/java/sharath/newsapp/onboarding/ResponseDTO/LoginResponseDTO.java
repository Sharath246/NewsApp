package sharath.newsapp.Onboarding.ResponseDTO;

public class LoginResponseDTO {
    String name=null,email=null,topics=null,response=null;

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTopics(String topics) {
        this.topics = topics;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getTopics() {
        return topics;
    }

    public void setResponse(String response){
        this.response = response;
    }

    public String getResponse(){
        return response;
    }
}
