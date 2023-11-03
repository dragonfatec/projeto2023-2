package com.RP.ControleDeJornada.domain.entitys.relation.userResultCenter;

import com.RP.ControleDeJornada.domain.entitys.resultCenter.ResultCenter;
import com.RP.ControleDeJornada.domain.entitys.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "r_user_resultcenter")
@Data
@NoArgsConstructor
public class RelationUserRC {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    private ResultCenter rc;
    private LocalDate createDate;

    public RelationUserRC(User user, ResultCenter rc){
        this.user = user;
        this.rc = rc;
        this.createDate = LocalDate.now();
    }


}
