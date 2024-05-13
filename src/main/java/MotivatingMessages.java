import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MotivatingMessages {
    public String getRandomMotivatingMessage() throws SQLException {
        try {
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/motivating_messages", "root", "kadekopsid644088");
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT message_content,author FROM motivating_messages ORDER BY RAND() LIMIT 1");

            if (resultSet.next()) {
                String message = resultSet.getString("message_content");
                String author = resultSet.getString("author");
                return "\"" + message + "\" - "+ author;
            }

            resultSet.close();
            statement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}






