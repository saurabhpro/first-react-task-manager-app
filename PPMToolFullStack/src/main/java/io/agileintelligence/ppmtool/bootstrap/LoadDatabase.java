package io.agileintelligence.ppmtool.bootstrap;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Configuration
class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(ProjectRepository repository, UserService userService) {
        CommandLineRunner commandLineRunner = null;
        if (repository.findAll().isEmpty()) {
            User user = saveUser(userService, "Saurabh Kumar", "saurabh@123.com");
            User user2 = saveUser(userService, "Saurabh K2", "saurabh@1234.com");

            Project project1 = new Project();
            project1.setProjectIdentifier("REACT");
            project1.setProjectName("Spring / React Project");
            project1.setDescription("Project to create a Kanban Board with Spring Boot and React");
            project1.setStartDate(LocalDate.of(2020, 6, 30));
            project1.setEndDate(LocalDate.of(2020, 7, 15));

            Backlog backlog = new Backlog();
            backlog.setProject(project1);
            backlog.setProjectIdentifier(project1.getProjectIdentifier().toUpperCase());
            project1.setBacklog(backlog);

            project1.setProjectLeader(user.getUsername());
            project1.setUser(user);

            Project project2 = new Project();
            project2.setProjectIdentifier("RECT2");
            project2.setProjectName("React UI Project");
            project2.setDescription("Project to create a Board with Spring Boot and React Web");
            project2.setStartDate(LocalDate.of(2020, 7, 2));
            project2.setEndDate(LocalDate.of(2020, 7, 30));

            backlog = new Backlog();
            backlog.setProject(project2);
            backlog.setProjectIdentifier(project2.getProjectIdentifier().toUpperCase());
            project2.setBacklog(backlog);

            project2.setProjectLeader(user2.getUsername());
            project2.setUser(user2);

            commandLineRunner = args ->
                    List.of(project1, project2)
                            .forEach(s -> log.debug("Preloading " + repository.save(s)));
        }

        return commandLineRunner;
    }

    @Transactional
    public User saveUser(UserService userService, String s2, String s3) {
        User user = new User();
        user.setFullName(s2);
        user.setUsername(s3);
        user.setPassword("test@123");
        return userService.saveUser(user);
    }
}