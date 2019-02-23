package com.info.modules.employees;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
    Employee findBy_id(ObjectId _id);

    @Query("{type : ?0}")
    List<Employee> findByEmployeeCategory(String type, Pageable pageable);

}
