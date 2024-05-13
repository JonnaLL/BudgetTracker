import org.junit.jupiter.api.Test;

// What needs testing:
// 1. testStart
// 2. addAdditionalIncome method
// 3. addExpense method
// 4. getPositiveNumberInput

import java.io.ByteArrayInputStream;
import java.util.Scanner;

import static org.junit.jupiter.api.Assertions.*;

public class BudgetTrackerTest {

    @Test
    void
    testStart() {

        BudgetTracker budgetTracker = new BudgetTracker();
        budgetTracker.start();
    }

}