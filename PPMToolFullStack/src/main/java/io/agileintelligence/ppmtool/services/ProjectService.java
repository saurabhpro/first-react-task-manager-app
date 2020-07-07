package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.InvalidUserException;
import io.agileintelligence.ppmtool.exceptions.projectid.ProjectIdException;
import io.agileintelligence.ppmtool.exceptions.projectnotfound.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {


    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project saveOrUpdateProject(final Project project, final String username) {

        // handle existing project
        // TODO incorrect way FIX NEEDED we can pass any object with ID filled and it will treat it as existing
        if (project.getId() != null) {
            Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());

            if (existingProject == null) {
                throw new ProjectNotFoundException("Project with ID: '" + project.getProjectIdentifier() + "' cannot be updated because it doesn't exist");
            } else if (!existingProject.getProjectLeader().equals(username)) {
                throw new ProjectNotFoundException("Project not found in your account");
            }
        }

        Optional<User> user = userRepository.findByUsername(username);
        return user.map(usr -> {
                    project.setUser(usr);
                    project.setProjectLeader(usr.getUsername());

                    project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
                    try {
                        return projectRepository.save(project);
                    } catch (Exception e) {
                        throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
                    }
                }
        ).orElseThrow(() -> new InvalidUserException("User with username : " + username + " not found!"));
    }


    public Project findProjectByIdentifier(String projectId, String username) {

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "' does not exist");
        }

        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }

        return project;
    }

    public List<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }


    public void deleteProjectByIdentifier(String projectId, String username) {
        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }
}
