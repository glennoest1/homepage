package com.example.homepage.service;

import com.example.homepage.entity.Entrance;
import com.example.homepage.repository.EntranceRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class EntranceServiceImpl implements EntranceService {

    private static final Logger log = LoggerFactory.getLogger(EntranceServiceImpl.class);

    private final EntranceRepository entranceRepository;

    public EntranceServiceImpl(EntranceRepository entranceRepository) {
        this.entranceRepository = entranceRepository;
    }

    @Override
    public List<Entrance> getActiveLinks() {
        return entranceRepository.findByIsActiveTrueOrderByPriorityAsc();
    }

    @Override
    public void logClick(Long entranceId) {
        log.info("User clicked on entrance ID: {}", entranceId);
    }
}
