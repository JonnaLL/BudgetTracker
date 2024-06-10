package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.converter.ExpenseDTOToEntityConverter;
import com.sdacademy.budgettracker.converter.IncomeDTOToEntityConverter;
import com.sdacademy.budgettracker.converter.SavingsDTOToEntityConverter;
import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.*;
import com.sdacademy.budgettracker.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BudgetTrackerServiceImpl implements BudgetTrackerService {
    @Autowired
    private ExpenseDTOToEntityConverter expenseConverter;

    @Autowired
    private IncomeDTOToEntityConverter incomeConverter;

    @Autowired
    private SavingsDTOToEntityConverter savingsConverter;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private SavingsRepository savingsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public void createRecord(BudgetTrackerRecordDTO recordDTO) {
        if (recordDTO.getCategory() != null) {
            Expense expense = expenseConverter.convert(recordDTO);
            expenseRepository.save(expense);
        } else if (recordDTO.getSavingsGoalPercentage() != null) {
            Savings savings = savingsConverter.convert(recordDTO);
            savingsRepository.save(savings);
        } else {
            Income income = incomeConverter.convert(recordDTO);
            incomeRepository.save(income);
        }
    }

    @Override
    public User login(String username, String password) {
        return userService.login(username, password);
    }

    @Override
    public void registerUser(User user) {
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void enterInitialIncome(Double totalIncome, Long userId) {
        User user = userService.getCurrentUser(userId);
        Income income = new Income();
        income.setAmount(totalIncome);
        income.setUser(user);
        incomeRepository.save(income);

        // Adding total income to the existing incomes
        double total = incomeRepository.findTotalIncomeByUserId(userId).orElse(0.0);
        user.setTotalIncome(total);
        userRepository.save(user);
    }

    @Override
    public Map<String, Object> getOverviewOfExpenses(Long userId) {
        List<Expense> expenses = expenseRepository.findAllByUserId(userId);
        double totalExpenses = expenses.stream().mapToDouble(Expense::getAmount).sum();

        Map<String, Double> categoryTotals = expenses.stream()
                .collect(Collectors.groupingBy(expense -> expense.getCategory().getName(), Collectors.summingDouble(Expense::getAmount)));

        List<Map<String, Object>> overview = categoryTotals.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> categoryOverview = new HashMap<>();
                    categoryOverview.put("category", entry.getKey());
                    categoryOverview.put("amount", entry.getValue());
                    categoryOverview.put("percentage", (entry.getValue() / totalExpenses) * 100);
                    return categoryOverview;
                }).collect(Collectors.toList());

        double totalIncome = getTotalIncome(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("totalExpenses", totalExpenses);
        response.put("totalIncome", totalIncome);
        response.put("categories", overview);

        return response;
    }

    @Override
    public void setSavingsGoal(double goalPercentage, Long userId) {
        Savings savings = new Savings();
        savings.setSavingsGoalPercentage(goalPercentage);
        savings.setUser(userService.getCurrentUser(userId));
        savingsRepository.save(savings);
    }

    @Override
    public Double getTotalIncome(Long userId) {
        return incomeRepository.findTotalIncomeByUserId(userId).orElse(0.0);
    }

    @Override
    public Double calculateTotalExpenses(Long userId) {
        return expenseRepository.findTotalExpensesByUserId(userId).orElse(0.0);
    }

    @Override
    public void addExpense(BudgetTrackerRecordDTO recordDTO) {
        Expense expense = new Expense();
        expense.setAmount(recordDTO.getAmount());

        User user = userRepository.findById(recordDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        expense.setUser(user);

        Category category = categoryRepository.findById(recordDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        expense.setCategory(category);

        expenseRepository.save(expense);
    }
    @Override
    @Transactional
    public void addAdditionalIncome(Double amount, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Income income = new Income();
        income.setAmount(amount);
        income.setUser(user);
        incomeRepository.save(income);


        System.out.println("Saved Income: " + income);
        double totalIncome = incomeRepository.findTotalIncomeByUserId(userId).orElse(0.0);

        System.out.println("Total Income before updating user: " + totalIncome);

        user.setTotalIncome(totalIncome);
        userRepository.save(user);
        System.out.println("Updated User's Total Income: " + user.getTotalIncome());
    }


    @Override
    public Map<String, Object> checkSavingsStatus(Long userId) {
        double totalIncome = getTotalIncome(userId);
        double totalExpenses = calculateTotalExpenses(userId);
        double savingsPercentage = Math.round(100 - (totalExpenses * 100 / totalIncome));
        double savingsAmount = Math.round(totalIncome - totalExpenses);

        Map<String, Object> response = new HashMap<>();
        response.put("savingsPercentage", savingsPercentage);
        response.put("savingsAmount", savingsAmount);
        response.put("totalIncome", totalIncome);
        response.put("totalExpenses", totalExpenses);

        double goalPercentage = savingsRepository.findLatestSavingsGoalByUserId(userId)
                .orElse(20.0);

        response.put("goalPercentage", goalPercentage);

        if (savingsPercentage < goalPercentage) {
            response.put("message", "Your expenses are too high! Try to save more.");
            double maxSpending = Math.round(totalIncome * (1 - goalPercentage / 100));
            response.put("advice", "To stay on track, don't spend over " + maxSpending + " euros.");
        } else {
            response.put("message", "Well done! You are on the right track!");
        }

        return response;
    }
}
