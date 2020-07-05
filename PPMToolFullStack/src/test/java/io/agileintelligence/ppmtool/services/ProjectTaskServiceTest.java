package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.mock.mockito.MockBean;

class ProjectTaskServiceTest {

    private ProjectTaskService projectTaskService;

    @InjectMocks
    private BacklogRepository backlogRepository;

    @MockBean
    private ProjectTaskRepository projectTaskRepository;

    @MockBean
    private ProjectRepository projectRepository;

    @Test
    void getProjectSequence() {
        Project project = new Project();
        project.setProjectIdentifier("APP64");

        Backlog backlog = new Backlog();
        backlog.setProject(project);
        backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

        projectTaskService = new ProjectTaskService(backlogRepository, projectTaskRepository, projectRepository);

        var sequenceNo = projectTaskService.getProjectSequence("APP64", backlog);
        Assertions.assertEquals("APP64-1", sequenceNo);

        sequenceNo = projectTaskService.getProjectSequence("APP64", backlog);
        Assertions.assertEquals("APP64-2", sequenceNo);

        sequenceNo = projectTaskService.getProjectSequence("APP64", backlog);
        Assertions.assertEquals("APP64-3", sequenceNo);
    }
}