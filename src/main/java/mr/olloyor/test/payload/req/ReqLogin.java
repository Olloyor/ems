package mr.olloyor.test.payload.req;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


@Data
public class ReqLogin {

    @NotBlank(message = "Please Fill Your Email")
    @Email(message = "Fill Your Email")
    private String email;

    @NotBlank(message = "Enter Your Password")
    private String password;
}
