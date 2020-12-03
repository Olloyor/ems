package mr.olloyor.test.payload.req;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;


@Data
public class ReqPhoneNumber {

    @NotBlank
    @Length(min = 13,max = 13,message = "ex: [+998 XX XXX XX XX]")
    private String phoneNumber;


}
