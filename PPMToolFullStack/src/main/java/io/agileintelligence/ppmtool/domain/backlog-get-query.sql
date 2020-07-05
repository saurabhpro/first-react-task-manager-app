select projecttas0_.id                  as id1_2_,
       projecttas0_.acceptance_criteria as acceptan2_2_,
       projecttas0_.backlog_id          as backlog11_2_,
       projecttas0_.created_at          as created_3_2_,
       projecttas0_.due_date            as due_date4_2_,
       projecttas0_.priority            as priority5_2_,
       projecttas0_.project_identifier  as project_6_2_,
       projecttas0_.project_sequence    as project_7_2_,
       projecttas0_.status              as status8_2_,
       projecttas0_.summary             as summary9_2_,
       projecttas0_.updated_at          as updated10_2_
from project_task projecttas0_
where projecttas0_.project_identifier = ?
order by projecttas0_.priority asc


select backlog0_.id                     as id1_0_0_,
       backlog0_.ptsequence             as ptsequen2_0_0_,
       backlog0_.project_id             as project_4_0_0_,
       backlog0_.project_identifier     as project_3_0_0_,
       project1_.id                     as id1_1_1_,
       project1_.created_at             as created_2_1_1_,
       project1_.description            as descript3_1_1_,
       project1_.end_date               as end_date4_1_1_,
       project1_.project_identifier     as project_5_1_1_,
       project1_.project_name           as project_6_1_1_,
       project1_.start_date             as start_da7_1_1_,
       project1_.updated_at             as updated_8_1_1_,
       projecttas2_.backlog_id          as backlog11_2_2_,
       projecttas2_.id                  as id1_2_2_,
       projecttas2_.id                  as id1_2_3_,
       projecttas2_.acceptance_criteria as acceptan2_2_3_,
       projecttas2_.backlog_id          as backlog11_2_3_,
       projecttas2_.created_at          as created_3_2_3_,
       projecttas2_.due_date            as due_date4_2_3_,
       projecttas2_.priority            as priority5_2_3_,
       projecttas2_.project_identifier  as project_6_2_3_,
       projecttas2_.project_sequence    as project_7_2_3_,
       projecttas2_.status              as status8_2_3_,
       projecttas2_.summary             as summary9_2_3_,
       projecttas2_.updated_at          as updated10_2_3_
from backlog backlog0_
         inner join
     project project1_ on backlog0_.project_id = project1_.id
         left outer join
     project_task projecttas2_ on backlog0_.id = projecttas2_.backlog_id
where backlog0_.id = ?
