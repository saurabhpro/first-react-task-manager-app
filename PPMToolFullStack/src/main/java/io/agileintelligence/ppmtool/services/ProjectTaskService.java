package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.projectnotfound.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ProjectTaskService {

    private final BacklogRepository backlogRepository;
    private final ProjectTaskRepository projectTaskRepository;
    private final ProjectService projectService;

    public ProjectTaskService(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository, ProjectService projectService) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
        this.projectService = projectService;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {
        //PTs to be added to a specific project, project != null, BL exists
        Backlog backlog = projectService
                .findProjectByIdentifier(projectIdentifier, username)
                .getBacklog();

        if (backlog != null) {
            //set the bl to pt
            projectTask.setBacklog(backlog);
            projectTask.setProjectIdentifier(projectIdentifier);

            // generate and get sequence
            final var projectSequence = getProjectSequence(projectIdentifier, backlog);
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

    public List<ProjectTask> findBacklogById(String projectIdentifier, String username) {
        // validate
        projectService.findProjectByIdentifier(projectIdentifier, username);

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public Optional<ProjectTask> findPTByProjectSequence(String backlogId, String projectTaskId, String username) {

        //make sure we are searching on the right backlog
        // a backlog cannot exist without a project - so instead of finding the backlog, lets find the project
        // validate
        projectService.findProjectByIdentifier(backlogId, username);


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

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlogId, String projectTaskId, String username) {
        //used for validating only
        findPTByProjectSequence(backlogId, projectTaskId, username);
//Todo this is super wrong - if we say passed null - it will overwrite it
        return projectTaskRepository.save(updatedTask);
    }

    public void deletePTByProjectSequence(String backlogId, String projectTaskId, String username) {
        Optional<ProjectTask> projectTask = findPTByProjectSequence(backlogId, projectTaskId, username);

        projectTask.ifPresent(projectTaskRepository::delete);
    }


}