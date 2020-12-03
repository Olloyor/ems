package mr.olloyor.test.payload.req;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.List;


@Data
public class ReqResume {

//    @DateTimeFormat(pattern = "dd.MM.yyyy",iso = DateTimeFormat.ISO.DATE,style = "dd.MM.yyyy")
    private Date bornDate;

    @NotBlank(message = "Please Fill Nationality")
    private String nationality;

    @NotEmpty(message = "Educations can't be empty")
    private List<String> educations;

    @NotEmpty(message = "Experiences can't be empty")
    private List<String> experiences;

    private Boolean isPrivate;


}
