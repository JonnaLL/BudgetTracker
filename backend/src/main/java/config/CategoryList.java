package config;

import com.sdacademy.budgettracker.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

public class CategoryList {
    @Bean
    CommandLineRunner initDatabase(CategoryRepository repository) {
        return args -> {
            List<String> predefinedCategories = Arrays.asList(
                    "Food",
                    "Taxes",
                    "Entertainment",
                    "Clothing",
                    "MedicalHealthcare",
                    "HouseholdItems",
                    "Transportation",
                    "Gifts",
                    "Donations",
                    "Other"
            );
        };
    }
}
