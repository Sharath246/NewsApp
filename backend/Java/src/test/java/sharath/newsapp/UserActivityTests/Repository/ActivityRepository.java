package sharath.newsapp.UserActivityTests.Repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import sharath.newsapp.UserActivity.Model.News;

@Repository
public class ActivityRepository {
    private final JdbcTemplate jdbc;

    public ActivityRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public boolean addBookMark(String email, News news) {
        try {
            String addNews = "INSERT INTO Bookmarks (email,title,newsurl,imageurl) VALUES (?,?,?,?)";
            jdbc.update(addNews, email, news.getTitle(), news.getUrl(), news.getImageURL());
        } catch (Exception e) {
            System.err.println(e);
            return false;
        }
        return true;
    }

    public boolean addLike(String email, News news) {
        try {
            String addNews = "INSERT INTO Likes (email,title,newsurl,imageurl) VALUES (?,?,?,?)";
            jdbc.update(addNews, email, news.getTitle(), news.getUrl(), news.getImageURL());
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public boolean removeNews(String email,String url,String source){
        try {
            String removeNews = "DELETE FROM " + source + " where email='" + email + "' AND " + "newsurl='" + url + "'";
            jdbc.update(removeNews);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public List<News> allBookMarks(String email) {
        try {
            String allNews = "SELECT * FROM Bookmarks WHERE email= '" + email + "'";
            RowMapper<News> rowMap = (r, i) -> {
                News a = new News();
                a.setUrl(r.getString("newsurl"));
                a.setUrlToImage(r.getString("imageurl"));
                a.setTitle(r.getString("title"));
                return a;
            };
            return jdbc.query(allNews, rowMap);
        } catch (Exception e) {
            return null;
        }
    }

    public List<News> allLikes(String email) {
        try {
            String allNews = "SELECT * FROM Likes WHERE email= '" + email + "'";
            RowMapper<News> rowMap = (r, i) -> {
                News a = new News();
                a.setUrl(r.getString("newsurl"));
                a.setUrlToImage(r.getString("imageurl"));
                a.setTitle(r.getString("title"));
                return a;
            };
            return jdbc.query(allNews, rowMap);
        } catch (Exception e) {
            return null;
        }
    }
}
