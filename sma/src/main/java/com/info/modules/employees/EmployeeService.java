package com.info.modules.employees;


import org.apache.commons.lang.RandomStringUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class EmployeeService {


    @Autowired
    private EmployeeRepository repository;

    public void generateEmployees() {

        repository.deleteAll();

        for (int i = 0; i < 5000; i++) {
            Employee emp = new Employee();
            emp.set_id(ObjectId.get());

            Random rand = new Random();
            int exp = rand.nextInt(11);
            emp.setExperience(exp);
            if (exp > 3) {
                emp.setType("SENIOR");
            } else {
                emp.setType("JUNIOR");
            }
            emp.setName(RandomStringUtils.randomAlphanumeric(8).toUpperCase());

            int salary = 0;
            if (exp > 3) {
                salary = rand.nextInt((4000000 - 1000000) + 1) + 1000000;
            } else {
                salary = rand.nextInt((1200000 - 300000) + 1) + 300000;
            }
            emp.setSalary(salary);
            repository.save(emp);
        }
    }

    public FinalTeamVO fetchEmployees(int senior, int junior, int budget) {

        FinalTeamVO finalTeamVO = new FinalTeamVO();
        PageRequest seniorRequest = new PageRequest(0, senior, new Sort(Sort.Direction.ASC, "salary"));
        PageRequest juniorRequest = new PageRequest(0, junior, new Sort(Sort.Direction.ASC, "salary"));
        int budgetUsed = 0;
        List<Employee> seniorEmployees = repository.findByEmployeeCategory("SENIOR", seniorRequest);
        List<Employee> juniorEmployees = repository.findByEmployeeCategory("JUNIOR", juniorRequest);
        List<Employee> allEmployees = new ArrayList<>();
        for (Employee seniorEmployee : seniorEmployees) {
            budgetUsed += seniorEmployee.getSalary();
        }

        if (budgetUsed > budget) {
            finalTeamVO.setEmployees(allEmployees);
            finalTeamVO.setStatus(0);
            finalTeamVO.setMessage("Budget Not Sufficient");
            return finalTeamVO;

        }
        for (Employee juniorEmployee : juniorEmployees) {
            budgetUsed += juniorEmployee.getSalary();
        }

        if(budgetUsed > budget){
            finalTeamVO.setEmployees(allEmployees);
            finalTeamVO.setStatus(0);
            finalTeamVO.setMessage("Budget Not Sufficient");
            return finalTeamVO;

        }

        allEmployees = seniorEmployees;
        allEmployees.addAll(juniorEmployees);
        finalTeamVO.setStatus(1);
        finalTeamVO.setMessage("Team Formed");
        finalTeamVO.setEmployees(allEmployees);
        finalTeamVO.setTotalBudget(budgetUsed);
        return finalTeamVO;
    }
}
