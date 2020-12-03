package mr.olloyor.test.controller;

import lombok.AllArgsConstructor;
import mr.olloyor.test.entity.User;
import mr.olloyor.test.payload.req.ReqResume;
import mr.olloyor.test.payload.req.ReqUserForAdmin;
import mr.olloyor.test.security.CurrentUser;
import mr.olloyor.test.service.AdminService;
import mr.olloyor.test.utils.AppConstants;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private final AdminService adminService;


    @GetMapping("/users")
    private HttpEntity<?> getAllUsers(
            @PageableDefault(page = AppConstants.DEFAULT_PAGE_NUMBER, size = AppConstants.DEFAULT_PAGE_SIZE)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "createdAt", direction = Sort.Direction.DESC)
            })
                    Pageable pageable
            , @CurrentUser User admin) {
        return adminService.getAllUsers(pageable, admin);
    }

    @GetMapping("/users/{id}")
    private HttpEntity<?> getUserById(@PathVariable UUID id, @CurrentUser User admin) {
        return adminService.getUserById(id, admin);
    }

    @PostMapping("/users")
    private HttpEntity<?> addUser(@Valid @RequestBody ReqUserForAdmin reqUser, @CurrentUser User admin){
        return adminService.addUser(reqUser, admin);
    }

    @PutMapping("/users/resume/{id}")
    private HttpEntity<?> editUserResume(@PathVariable UUID id, @Valid @RequestBody ReqResume resume, @CurrentUser User admin){
        return adminService.editUserResume(id,resume,admin);
    }

    @DeleteMapping("/users/{id}")
    private HttpEntity<?> deleteUserById(@PathVariable UUID id, @CurrentUser User admin){
        return adminService.deleteUserById(id, admin);
    }

}
