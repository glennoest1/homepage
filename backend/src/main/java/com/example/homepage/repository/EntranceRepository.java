package com.example.homepage.repository;

import com.example.homepage.entity.Entrance;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntranceRepository extends JpaRepository<Entrance, Long> {

    List<Entrance> findByIsActiveTrueOrderByPriorityAsc();
}
