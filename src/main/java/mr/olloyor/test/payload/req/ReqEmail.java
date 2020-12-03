package mr.olloyor.test.payload.req;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


@Data
public class ReqEmail {

    @NotBlank(message = "Please Fill Your Email")
    @Email(message = "Please Fill Valid Email")
    private String email;

}
