package mr.olloyor.test.payload.req;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
public class ReqRegister {

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

}
