package sharath.newsapp.userActivity.Repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import sharath.newsapp.Model.User;
import sharath.newsapp.userActivity.Model.News;

public class UserRepository {
    private final JdbcTemplate jdbc;

    public UserRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public boolean addBookMark(User user, News news) {
        try {
            String addNews = "INSERT INTO Bookmarks (email,sourceId,sourceName,author,title,newsdescription,newsurl,imageurl,publishDate,content) VALUES (?,?,?,?,?,?,?,?,?,?)";
            jdbc.update(addNews, user.getEmail(), news.getsourceId(), news.getsourceName(), news.getAuthor(),
                    news.getTitle(), news.getDescription(), news.getUrl(), news.getImageURL(), news.getPublishDate(),
                    news.getContent());
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public boolean addLike(User user, News news) {
        try {
            String addNews = "INSERT INTO Likes (email,sourceId,sourceName,author,title,newsdescription,newsurl,imageurl,publishDate,content) VALUES (?,?,?,?,?,?,?,?,?,?)";
            jdbc.update(addNews, user.getEmail(), news.getsourceId(), news.getsourceName(), news.getAuthor(),
                    news.getTitle(), news.getDescription(), news.getUrl(), news.getImageURL(), news.getPublishDate(),
                    news.getContent());
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
                a.setSourceId(r.getString("sourceId"));
                a.setSourceName(r.getString("sourceName"));
                a.setAuthor(r.getString("author"));
                a.setDescription(r.getString("newsdescription"));
                a.setUrl(r.getString("newsurl"));
                a.setImageURL(r.getString("imageurl"));
                a.setContent(r.getString("content"));
                a.setTitle(r.getString("title"));
                a.setPublishDate(r.getString("publishDate"));
                return a;
            };
            return jdbc.query(allNews, rowMap);
        } catch (Exception e) {
            return null;
        }
    }

    public List<News> allLikes(String email) {
        try {
            String allNews = "SELECT * FROM Likes WHERE email= '" + email+ "'";
            RowMapper<News> rowMap = (r, i) -> {
                News a = new News();
                a.setSourceId(r.getString("sourceId"));
                a.setSourceName(r.getString("sourceName"));
                a.setAuthor(r.getString("author"));
                a.setDescription(r.getString("newsdescription"));
                a.setUrl(r.getString("newsurl"));
                a.setImageURL(r.getString("imageurl"));
                a.setContent(r.getString("content"));
                a.setTitle(r.getString("title"));
                a.setPublishDate(r.getString("publishDate"));
                return a;
            };
            return jdbc.query(allNews, rowMap);
        } catch (Exception e) {
            return null;
        }
    }
}
