package io.agileintelligence.ppmtool.web;


import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.exceptions.MapValidationErrorComponent;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;

/*this allows url from some other server to be allowed*/
@CrossOrigin
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final BacklogRepository backlogRepository;
    private final MapValidationErrorComponent mapValidationErrorComponent;

    public ProjectController(ProjectService projectService, BacklogRepository backlogRepository, MapValidationErrorComponent mapValidationErrorComponent) {
        this.projectService = projectService;
        this.backlogRepository = backlogRepository;
        this.mapValidationErrorComponent = mapValidationErrorComponent;
    }

    @PostMapping
    public ResponseEntity<Project> createNewProject(@Validated @RequestBody Project project, BindingResult result, Principal currentLoggedInUser) {

        mapValidationErrorComponent.mapValidationErrors(result);

        if (project.getId() == null) {
            Backlog backlog = new Backlog();
            project.setBacklog(backlog);
            backlog.setProject(project);
            backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
        }

        if (project.getId() != null) {
            project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()).orElse(null));
        }

        Project project1 = projectService.saveOrUpdateProject(project, currentLoggedInUser.getName());

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(project1.getProjectIdentifier())
                .toUri();

        return ResponseEntity.created(uri).body(project1);
    }


    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable String projectId, Principal currentLoggedInUser) {

        Project project = projectService.findProjectByIdentifier(projectId, currentLoggedInUser.getName());

        return ResponseEntity.ok(project);
    }

    @GetMapping
    public List<Project> getAllProjects(Principal currentLoggedInUser) {
        return projectService.findAllProjects(currentLoggedInUser.getName());
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Object> deleteProject(@PathVariable String projectId, Principal currentLoggedInUser) {
        projectService.deleteProjectByIdentifier(projectId, currentLoggedInUser.getName());

        return ResponseEntity.ok("Project with ID: '" + projectId + "' was deleted");
    }
}
