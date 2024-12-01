package sharath.newsapp.Onboarding.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.context.annotation.RequestScope;

import sharath.newsapp.User;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

@Repository
@RequestScope
public class OnboardingRequest {

    private final JdbcTemplate jdbc;

    public OnboardingRequest(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public boolean addUser(User user) {
        if (checkUser(user.getEmail()) == null) {
            System.out.println("adasdasd");
            String addUser = "INSERT INTO USER (name,email,password) VALUES (?,?,?)";
            jdbc.update(addUser, user.getName(), user.getEmail(), user.getPassword());
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

}