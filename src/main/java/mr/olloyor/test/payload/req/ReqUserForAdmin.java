package mr.olloyor.test.payload.req;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Data
public class ReqUserForAdmin {

    private String phoneNumber;

    @NotBlank(message = "Please Fill Email")
    @Email(message = "Fill valid email")
    private String email;

    @NotBlank
    @Size(min = 5, max = 16,message = "Password size must be between 5 and 16")
    private String password;

    @NotBlank(message = "Fill Your FirstName")
    @Size(min=2, max = 80, message = "FirstName size must be between 2 and 80")
    private String firstName;

    @NotBlank(message = "Fill Your LastName")
    @Size(min=2, max = 80, message = "LastName size must be between 2 and 80")
    private String lastName;

    @NotBlank(message = "Fill Your SureName")
    @Size(min=2, max = 80, message = "SureName size must be between 2 and 80")
    private String sureName;

    private Date bornDate;

    @NotBlank(message = "Please Fill Nationality")
    private String nationality;

    @NotEmpty(message = "Educations can't be empty")
    private List<String> educations;

    @NotEmpty(message = "Experiences can't be empty")
    private List<String> experiences;

    private Boolean isPrivate;

}
