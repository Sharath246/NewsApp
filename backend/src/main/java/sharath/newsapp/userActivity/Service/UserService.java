package sharath.newsapp.userActivity.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import sharath.newsapp.Model.User;
import sharath.newsapp.userActivity.Model.News;
import sharath.newsapp.userActivity.Repository.UserRepository;

@RequestScope
@Service
public class UserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public String bookMark(User user, News news) {
        boolean addedUser = userRepo.addBookMark(user, news);
        if (addedUser) {
            return "Success";
        } else {
            return "Failure";
        }
    }

    public String like(User user, News news) {
        boolean addedUser = userRepo.addBookMark(user, news);
        if (addedUser) {
            return "Success";
        } else {
            return "Failure";
        }
    }

    public List<News> allBookmarks(String email) {
        return userRepo.allBookMarks(email);
    }

    public List<News> allLikes(String email) {
        return userRepo.allLikes(email);
    }
}
