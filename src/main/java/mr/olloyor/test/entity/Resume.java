package mr.olloyor.test.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import mr.olloyor.test.entity.tmp.AbsEntity;
import mr.olloyor.test.utils.StringListConverter;

import javax.persistence.*;
import java.util.List;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "resume")
public class Resume extends AbsEntity {

    @Column
    @JsonFormat(pattern = "dd.MM.yyyy")
    private Date bornDate;

    @Column(nullable = false)
    private String nationality;

    @Convert(converter = StringListConverter.class)
    private List<String> educations;

    @Convert(converter = StringListConverter.class)
    private List<String> experiences;

    private Boolean isPrivate;

//    @JsonIgnore
//    @OneToOne(fetch = FetchType.LAZY, mappedBy = "resume")
//    private User user;

//    public Resume(Date bornDate, String nationality, List<String> educations, List<String> experiences, Boolean isPrivate) {
//        this.bornDate = bornDate;
//        this.nationality = nationality;
//        this.educations = educations;
//        this.experiences = experiences;
//        this.isPrivate = isPrivate;
//    }
}
