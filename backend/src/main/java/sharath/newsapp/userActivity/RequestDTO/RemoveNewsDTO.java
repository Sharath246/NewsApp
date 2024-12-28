package sharath.newsapp.userActivity.RequestDTO;

public class RemoveNewsDTO {
    private String email,url;

    public void setUrl(String url){
        this.url = url;
    }
    public String getUrl(){
        return url;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
