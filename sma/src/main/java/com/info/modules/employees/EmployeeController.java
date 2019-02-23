package com.info.modules.employees;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;



    @RequestMapping(value = "/generate", method = RequestMethod.GET)
    public List<Employee> getAllPets() {
       List<Employee> employees = new ArrayList<>();
       employeeService.generateEmployees();
       return employees;


    }


    @RequestMapping(value = "/filtered", method = RequestMethod.GET)
    public FinalTeamVO fetchEmployees(@RequestParam("senior") int senior, @RequestParam("junior") int junior, @RequestParam("budget") int budget) {
        FinalTeamVO finalTeamVO = new FinalTeamVO();
        finalTeamVO = employeeService.fetchEmployees(senior,junior,budget);
        return finalTeamVO;


    }

}