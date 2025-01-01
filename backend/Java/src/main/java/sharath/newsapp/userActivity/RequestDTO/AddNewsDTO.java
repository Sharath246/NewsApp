package sharath.newsapp.userActivity.RequestDTO;

import sharath.newsapp.userActivity.Model.News;

public class AddNewsDTO {
    private News news;
    private String email;

    public News getNews() {
        return news;
    }

    public String getEmail() {
        return email;
    }

    public void setNews(News news) {
        this.news = news;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
