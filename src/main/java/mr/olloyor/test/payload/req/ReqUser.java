package mr.olloyor.test.payload.req;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class ReqUser {

    @NotBlank(message = "FirstName can't be empty")
    @Size(min = 2, max = 80, message = "FirstName length must be between 2 and 80")
    private String firstName;

    @NotBlank(message = "LastName can't be empty")
    @Size(min = 2, max = 80, message = "LastName length must be between 2 and 80")
    private String lastName;

    @NotBlank(message = "LastName can't be empty")
    @Size(min = 2, max = 80, message = "LastName length must be between 2 and 80")
    private String sureName;

}
