package sharath.newsapp.Model;

public class User {
    private String name, email, password, topics;

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getTopics(){
        return topics;
    }

    public void setTopics(String topics){
        this.topics = topics;
    }
}
