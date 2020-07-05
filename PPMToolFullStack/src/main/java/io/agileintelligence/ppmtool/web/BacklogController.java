package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.ProjectTaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BacklogController {

    private final ProjectTaskService projectTaskService;

    private final MapValidationErrorService mapValidationErrorService;

    public BacklogController(ProjectTaskService projectTaskService, MapValidationErrorService mapValidationErrorService) {
        this.projectTaskService = projectTaskService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @PostMapping("/projects/{projectIdentifier}/backlog")
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask,
                                            BindingResult result,
                                            @PathVariable String projectIdentifier) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        ProjectTask projectTask1 = projectTaskService.addProjectTask(projectIdentifier, projectTask);

        return new ResponseEntity<>(projectTask1, HttpStatus.CREATED);
    }

    @GetMapping("/projects/{projectIdentifier}/backlog")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String projectIdentifier) {
        return projectTaskService.findBacklogById(projectIdentifier);
    }

    @GetMapping("/backlogs/{backlogId}/tasks/{projectTaskId}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlogId, @PathVariable String projectTaskId) {
        Optional<ProjectTask> projectTask = projectTaskService.findPTByProjectSequence(backlogId, projectTaskId);
        return new ResponseEntity<>(projectTask.get(), HttpStatus.OK);
    }

    @PatchMapping("/backlogs/{backlogId}/tasks/{projectTaskId}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String backlogId, @PathVariable String projectTaskId) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlogId, projectTaskId);

        return new ResponseEntity<>(updatedTask, HttpStatus.OK);

    }

    @DeleteMapping("/backlogs/{backlogId}/tasks/{projectTaskId}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlogId, @PathVariable String projectTaskId) {
        projectTaskService.deletePTByProjectSequence(backlogId, projectTaskId);

        return new ResponseEntity<>("Project Task " + projectTaskId + " was deleted successfully", HttpStatus.OK);
    }
}