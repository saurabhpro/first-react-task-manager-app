package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.MapValidationErrorComponent;
import io.agileintelligence.ppmtool.services.ProjectTaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BacklogController {

    private final ProjectTaskService projectTaskService;
    private final MapValidationErrorComponent mapValidationErrorComponent;

    public BacklogController(ProjectTaskService projectTaskService, MapValidationErrorComponent mapValidationErrorComponent) {
        this.projectTaskService = projectTaskService;
        this.mapValidationErrorComponent = mapValidationErrorComponent;
    }

    @PostMapping("/projects/{projectIdentifier}/backlog")
    public ResponseEntity<ProjectTask> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask,
                                                      BindingResult result,
                                                      @PathVariable String projectIdentifier,
                                                      Principal principal) {

        mapValidationErrorComponent.mapValidationErrors(result);

        ProjectTask projectTask1 = projectTaskService.addProjectTask(projectIdentifier, projectTask, principal.getName());

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(projectTask1.getProjectSequence())
                .toUri();

        return ResponseEntity.created(uri).body(projectTask1);
    }

    @GetMapping("/projects/{projectIdentifier}/backlog")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String projectIdentifier, Principal principal) {
        return projectTaskService.findBacklogById(projectIdentifier, principal.getName());
    }

    @GetMapping("/backlogs/{backlogId}/tasks/{projectTaskId}")
    public ResponseEntity<ProjectTask> getProjectTask(@PathVariable String backlogId,
                                                      @PathVariable String projectTaskId,
                                                      Principal principal) {
        Optional<ProjectTask> projectTask = projectTaskService.findPTByProjectSequence(backlogId, projectTaskId, principal.getName());
        return ResponseEntity.ok(projectTask.get());
    }

    @PatchMapping("/backlogs/{backlogId}/tasks/{projectTaskId}")
    public ResponseEntity<ProjectTask> updateProjectTask(@Valid @RequestBody ProjectTask projectTask,
                                                         BindingResult result,
                                                         @PathVariable String backlogId,
                                                         @PathVariable String projectTaskId,
                                                         Principal principal) {

        mapValidationErrorComponent.mapValidationErrors(result);

        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlogId, projectTaskId, principal.getName());

        return ResponseEntity.ok(updatedTask);

    }

    @DeleteMapping("/backlogs/{backlogId}/tasks/{projectTaskId}")
    public ResponseEntity<Object> deleteProjectTask(@PathVariable String backlogId,
                                                    @PathVariable String projectTaskId,
                                                    Principal principal) {
        projectTaskService.deletePTByProjectSequence(backlogId, projectTaskId, principal.getName());

        return ResponseEntity.ok("Project Task " + projectTaskId + " was deleted successfully");
    }
}