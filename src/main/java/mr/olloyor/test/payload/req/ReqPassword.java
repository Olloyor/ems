package mr.olloyor.test.payload.req;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class ReqPassword {

    @NotBlank(message = "Enter your old password")
    private String password;

    @NotBlank(message = "Enter new password")
    @Size(min = 5, max = 16,message = "Password size must be between 5 and 16")
    private String newPassword;
}
