package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findByProjectIdentifier(String projectId);

    List<Project> findAllByProjectLeader(String username);
}
