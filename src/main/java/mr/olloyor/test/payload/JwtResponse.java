package mr.olloyor.test.payload;

import lombok.Data;

@Data
public class JwtResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType;

    public JwtResponse(String accessToken, String tokenType) {
        this.accessToken = accessToken;
        this.refreshToken = null;
        this.tokenType = tokenType;
    }

    public JwtResponse(String accessToken, String refreshToken, String tokenType) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tokenType = tokenType;
    }
}
