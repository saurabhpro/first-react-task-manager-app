package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
    List<ProjectTask> findByProjectIdentifierOrderByPriority(String projectIdentifier);

    Optional<ProjectTask> findByProjectSequence(String sequence);
}