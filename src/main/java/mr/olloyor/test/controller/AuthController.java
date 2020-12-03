package mr.olloyor.test.controller;


import lombok.AllArgsConstructor;
import mr.olloyor.test.payload.ApiResponse;
import mr.olloyor.test.payload.JwtResponse;
import mr.olloyor.test.payload.req.ReqLogin;
import mr.olloyor.test.payload.req.ReqRegister;
import mr.olloyor.test.service.AuthService;
import mr.olloyor.test.security.JwtTokenProvider;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final AuthService authService;


    @PostMapping("/register")
    public HttpEntity<ApiResponse> register(@Valid @RequestBody ReqRegister reqSignUp) {
        ApiResponse response = authService.register(reqSignUp);
        if (response.isSuccess()) {
            response.setResult(getApiToken(reqSignUp.getEmail(), reqSignUp.getPassword()));

            return ResponseEntity.ok().body(response);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }


    @PostMapping("/login")
    public HttpEntity<ApiResponse> login(@Valid @RequestBody ReqLogin reqSignIn) {
        ApiResponse response = authService.login(reqSignIn);
        if (response.isSuccess()) {
            response.setResult(getApiToken(reqSignIn.getEmail(), reqSignIn.getPassword()));

            return ResponseEntity.status(200).body(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    private JwtResponse getApiToken(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }

}
