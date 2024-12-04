package sharath.newsapp.Onboarding.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.context.annotation.RequestScope;

import sharath.newsapp.Model.User;
import sharath.newsapp.Onboarding.UserSession;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

@Repository
@RequestScope
public class OnboardingRequest {

    private final JdbcTemplate jdbc;
    private final ApplicationContext context;

    public OnboardingRequest(JdbcTemplate jdbc,ApplicationContext context) {
        this.jdbc = jdbc;
        this.context = context;
    }

    public boolean addUser(User user) {
        if (checkUser(user.getEmail()) == null) {
            String addUser = "INSERT INTO USER (name,email,password) VALUES (?,?,?)";
            jdbc.update(addUser, user.getName(), user.getEmail(), user.getPassword());
            UserSession session = context.getBean(UserSession.class);
            session.setName(user.getName());
            return true;
        } else {
            return false;
        }
    }

    public User checkUser(String email) {
        String checkUser = "SELECT * FROM USER WHERE email = '" + email + "'";
        RowMapper<User> rowMap = (r, i) -> {
            User a = new User();
            a.setName(r.getString("name"));
            a.setEmail(r.getString("email"));
            a.setPassword(r.getString("password"));
            return a;
        };
        List<User> allUser = jdbc.query(checkUser, rowMap);
        if (allUser.size() == 0) {
            return null;
        } else {
            UserSession session = context.getBean(UserSession.class);
            session.setName(allUser.get(0).getName());
            return allUser.get(0);
        }
    }

    public List<User> allUsers() {
        String checkUser = "SELECT * FROM USER";
        RowMapper<User> rowMap = (r, i) -> {
            User a = new User();
            a.setName(r.getString("name"));
            a.setEmail(r.getString("email"));
            a.setPassword(r.getString("password"));
            return a;
        };
        return jdbc.query(checkUser, rowMap);
    }

    public boolean logoutUser(){
        UserSession session = context.getBean(UserSession.class);
        System.out.println("in Logout "+session.getName());
        session.setName(null);
        return true;
    }

}
