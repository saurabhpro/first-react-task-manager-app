package io.agileintelligence.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer projectTaskSequence = 0;
    private String projectIdentifier;

    //OneToOne with project
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "project_id", nullable = false
    )
    @JsonIgnore
    private Project project;

    //OneToMany projecttasks
    @OneToMany(
            cascade = CascadeType.REFRESH,
            fetch = FetchType.EAGER,
            mappedBy = "backlog",
            orphanRemoval = true)
    private List<ProjectTask> projectTasks = new ArrayList<>();
    //Cascade REFRESH
    //ORPHAN REMOVAL


    @Override
    public String toString() {
        return "Backlog{" +
                "id=" + id +
                ", projectTaskSequence=" + projectTaskSequence +
                ", projectIdentifier='" + projectIdentifier + '\'' +
                ", projectTasks=" + projectTasks +
                '}';
    }
}