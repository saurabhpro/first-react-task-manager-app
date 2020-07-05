package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ProjectTaskService {

    private final BacklogRepository backlogRepository;

    private final ProjectTaskRepository projectTaskRepository;
    private final ProjectRepository projectRepository;


    public ProjectTaskService(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository, ProjectRepository projectRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
        this.projectRepository = projectRepository ;
    }


    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        try {
            //PTs to be added to a specific project, project != null, BL exists
            Optional<Backlog> backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

            if (backlog.isPresent()) {
                //set the bl to pt
                projectTask.setBacklog(backlog.get());
                projectTask.setProjectIdentifier(projectIdentifier);

                // generate and get sequence
                final var projectSequence = getProjectSequence(projectIdentifier, backlog.get());
                //Add Sequence to Project Task
                projectTask.setProjectSequence(projectSequence);

                if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
                    projectTask.setPriority(3);
                }

                //INITIAL status when status is null
                if (StringUtils.isEmpty(projectTask.getStatus())) {
                    projectTask.setStatus("TO_DO");
                }

            }

            return projectTaskRepository.save(projectTask);
        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not Found");
        }
    }

    protected String getProjectSequence(String projectIdentifier, Backlog backlog) {
        //we want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
        AtomicInteger backlogSequence = new AtomicInteger(backlog.getProjectTaskSequence());
        backlogSequence.getAndSet(backlogSequence.get() + 1);

        // Update the BL SEQUENCE
        backlog.setProjectTaskSequence(backlogSequence.get());

        //Add Sequence to Project Task
        return projectIdentifier + "-" + backlogSequence;
    }

    public List<ProjectTask> findBacklogById(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier);

        if (project == null) {
            throw new ProjectNotFoundException("Project with ID: '" + projectIdentifier + "' does not exist");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public Optional<ProjectTask> findPTByProjectSequence(String backlogId, String projectTaskId) {

        //make sure we are searching on the right backlog
        Optional<Backlog> backlog = backlogRepository.findByProjectIdentifier(backlogId);
        if (backlog.isEmpty()) {
            throw new ProjectNotFoundException("Project with ID: '" + backlogId + "' does not exist");
        }

        //make sure that our task exists
        Optional<ProjectTask> projectTask = projectTaskRepository.findByProjectSequence(projectTaskId);
        if (projectTask.isEmpty()) {
            throw new ProjectNotFoundException("Project Task '" + projectTaskId + "' not found");
        }

        //make sure that the backlog/project id in the path corresponds to the right project
        if (!projectTask.get().getProjectIdentifier().equals(backlogId)) {
            throw new ProjectNotFoundException("Project Task '" + projectTaskId + "' does not exist in project: '" + backlogId);
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlogId, String projectTaskId) {
        //used for validating only
        findPTByProjectSequence(backlogId, projectTaskId);
//Todo this is super wrong - if we say passed null - it will overwrite it
        return projectTaskRepository.save(updatedTask);
    }

    public void deletePTByProjectSequence(String backlogId, String projectTaskId) {
        Optional<ProjectTask> projectTask = findPTByProjectSequence(backlogId, projectTaskId);

        projectTask.ifPresent(projectTaskRepository::delete);
    }


}