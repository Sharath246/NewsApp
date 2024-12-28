package sharath.newsapp.userActivity.Controller;

import org.springframework.web.bind.annotation.RestController;

import sharath.newsapp.userActivity.Model.News;
import sharath.newsapp.userActivity.RequestDTO.AddNewsDTO;
import sharath.newsapp.userActivity.RequestDTO.RemoveNewsDTO;
import sharath.newsapp.userActivity.Service.UserService;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ActivityController {

    private final ApplicationContext context;

    public ActivityController(ApplicationContext context){
        this.context = context;
    }

    @PostMapping("/bookMark")
    public ResponseEntity<String> bookMarkNews(@RequestBody AddNewsDTO request) {
        UserService service = context.getBean(UserService.class);
        String response =service.addbookMark(request.getEmail(),request.getNews());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/like")
    public ResponseEntity<String> likeNews(@RequestBody AddNewsDTO request) {
        UserService service = context.getBean(UserService.class);
        String response = service.addlike(request.getEmail(),request.getNews());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/removeLike")
    public ResponseEntity<String> renovelike(@RequestBody RemoveNewsDTO request) {
        UserService service = context.getBean(UserService.class);
        String response = service.removeNews(request.getEmail(), request.getUrl(), "Likes");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/removeBookmark")
    public ResponseEntity<String> renovebookmark(@RequestBody RemoveNewsDTO request) {
        UserService service = context.getBean(UserService.class);
        String response = service.removeNews(request.getEmail(), request.getUrl(), "Bookmarks");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/allBookmarks")
    public ResponseEntity<List<News>> getAllBookmarks(@RequestHeader String email) {
        UserService service = context.getBean(UserService.class);
        List<News> response = service.allBookmarks(email);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/allLikes")
    public ResponseEntity<List<News>> getAllLikes(@RequestHeader String email) {
        UserService service = context.getBean(UserService.class);
        List<News> response = service.allLikes(email);
        return ResponseEntity.ok(response);
    }
}
