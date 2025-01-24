package sharath.newsapp.UserActivityTests.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import sharath.newsapp.UserActivity.Model.News;
import sharath.newsapp.UserActivity.Repository.ActivityRepository;

@RequestScope
@Service
public class UserService {
    private final ActivityRepository userRepo;

    public UserService(ActivityRepository userRepo) {
        this.userRepo = userRepo;
    }

    public String addbookMark(String email, News news) {
        boolean bookmarked = userRepo.addBookMark(email, news);
        if (bookmarked) {
            return "Success";
        } else {
            return "Failed";
        }
    }

    public String addlike(String email, News news) {
        boolean liked = userRepo.addLike(email, news);
        if (liked) {
            return "Success";
        } else {
            return "Failed";
        }
    }

    public String removeNews(String email, String url,String source){
        boolean removed = userRepo.removeNews(email,url,source);
        if(removed){
            return "Success";
        }
        else{
            return "Failed";
        }
    }

    public List<News> allBookmarks(String email) {
        return userRepo.allBookMarks(email);
    }

    public List<News> allLikes(String email) {
        return userRepo.allLikes(email);
    }
}
