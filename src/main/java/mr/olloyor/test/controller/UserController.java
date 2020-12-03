package mr.olloyor.test.controller;


import lombok.AllArgsConstructor;
import mr.olloyor.test.entity.User;
import mr.olloyor.test.payload.ApiResponse;
import mr.olloyor.test.payload.req.*;
import mr.olloyor.test.security.CurrentUser;
import mr.olloyor.test.service.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;


@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping
    public HttpEntity<ApiResponse> getUser(@CurrentUser User user) {
        return userService.me(user);
    }

    @PutMapping
    public HttpEntity<ApiResponse> editUser(@RequestBody ReqUser reqUser, @CurrentUser User user) {
        return userService.editUserFields(reqUser,user);
    }

    @PostMapping("/resume")
    public HttpEntity<?> addOrEditResume(@Valid @RequestBody ReqResume resume, @CurrentUser User user) throws Exception {
        return userService.addOrEditResume(resume,user);
    }

    @PostMapping("/phone")
    public HttpEntity<ApiResponse> addOrEditPhoneNumber(@Valid @RequestBody ReqPhoneNumber phoneNumber, @CurrentUser User user){
        return userService.addOrEditPhoneNumber(phoneNumber,user);
    }

    @PutMapping("/changePwd")
    public HttpEntity<ApiResponse> editPassword(@Valid @RequestBody ReqPassword reqPassword, @CurrentUser User user) {
        return userService.editPassword(reqPassword, user);
    }

    @PutMapping("/email")
    public HttpEntity<ApiResponse> changeEmail(@Valid @RequestBody ReqEmail email,@CurrentUser User user){
        return userService.editEmail(email,user);
    }

    @GetMapping("/checkEmailAvailability")
    public ApiResponse checkEmailAvailability(@RequestParam(value = "email") String email) {
        return userService.checkEmailAvailability(email);
    }

}
