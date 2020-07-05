package io.agileintelligence.ppmtool.web;


import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/*this allows url from some other server to be allowed*/
@CrossOrigin
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final BacklogRepository backlogRepository;
    private final MapValidationErrorService mapValidationErrorService;

    public ProjectController(ProjectService projectService, BacklogRepository backlogRepository, MapValidationErrorService mapValidationErrorService) {
        this.projectService = projectService;
        this.backlogRepository = backlogRepository;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @PostMapping
    public ResponseEntity<?> createNewProject(@Validated @RequestBody Project project, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        if (project.getId() == null) {
            Backlog backlog = new Backlog();
            project.setBacklog(backlog);
            backlog.setProject(project);
            backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
        }

        if (project.getId() != null) {
            project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()).orElse(null));
        }

        Project project1 = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<>(project1, HttpStatus.CREATED);
    }


    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId) {

        Project project = projectService.findProjectByIdentifier(projectId);

        return new ResponseEntity<>(project, HttpStatus.OK);
    }


    @GetMapping
    public Iterable<Project> getAllProjects() {
        return projectService.findAllProjects();
    }


    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId) {
        projectService.deleteProjectByIdentifier(projectId);

        return new ResponseEntity<>("Project with ID: '" + projectId + "' was deleted", HttpStatus.OK);
    }
}