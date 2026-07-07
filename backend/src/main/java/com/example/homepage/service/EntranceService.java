package com.example.homepage.service;

import com.example.homepage.entity.Entrance;
import java.util.List;

public interface EntranceService {

    List<Entrance> getActiveLinks();

    void logClick(Long entranceId);
}
