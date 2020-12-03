package mr.olloyor.test.service;

import lombok.AllArgsConstructor;
import mr.olloyor.test.entity.Resume;
import mr.olloyor.test.entity.User;
import mr.olloyor.test.entity.enums.RoleName;
import mr.olloyor.test.payload.ApiResponse;
import mr.olloyor.test.payload.req.ReqResume;
import mr.olloyor.test.payload.req.ReqUserForAdmin;
import mr.olloyor.test.repository.ResumeRepository;
import mr.olloyor.test.repository.RoleRepository;
import mr.olloyor.test.repository.UserRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
//@Transactional
public class AdminService {

    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;


    public HttpEntity<?> getAllUsers(Pageable pageable, User admin) {
        Page<User> allUsers = userRepository.findAll(pageable);
        return ResponseEntity.status(200).body(allUsers);
    }

    public HttpEntity<ApiResponse> getUserById(UUID id, User admin) {
        Optional<User> user = userRepository.findById(id);
        return user.map(value -> ResponseEntity.status(200).body(new ApiResponse("User", true, value)))
                .orElseGet(() -> ResponseEntity.status(404).body(new ApiResponse("User Not Found", false, "No user found: " + id)));
    }

    public HttpEntity<?> addUser(ReqUserForAdmin reqUser, User admin) {
        try {
            Optional<User> optionalUser = userRepository.findByEmail(reqUser.getEmail());
            if (optionalUser.isPresent()) {
                return ResponseEntity.status(409).body(new ApiResponse("User Already Registered", false));
            } else {
                User user = new User(
                        reqUser.getEmail(),
                        passwordEncoder.encode(reqUser.getPassword()),
                        reqUser.getFirstName(),
                        reqUser.getLastName(),
                        reqUser.getSureName(),
                        roleRepository.findAllByName(RoleName.ROLE_USER));

                Resume newResume = new Resume(
                        reqUser.getBornDate(),
                        reqUser.getNationality(),
                        reqUser.getEducations(),
                        reqUser.getExperiences(),
                        reqUser.getIsPrivate()
                );
                newResume = resumeRepository.save(newResume);
                user.setResume(newResume);
                user = userRepository.save(user);
                return ResponseEntity.status(200).body(new ApiResponse("User Added", true, user));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse("Something went wrong!", false));
        }
    }

    public HttpEntity<?> editUserResume(UUID resumeId, ReqResume reqResume, User admin) {
        try {
            Optional<Resume> userResume = resumeRepository.findById(resumeId);
            if (userResume.isPresent()) {
                Resume resume = userResume.get();
                resume.setBornDate(reqResume.getBornDate());
                resume.setNationality(reqResume.getNationality());
                resume.setEducations(reqResume.getEducations());
                resume.setExperiences(reqResume.getExperiences());
                resume.setIsPrivate(reqResume.getIsPrivate());
                resume = resumeRepository.save(resume);
                return ResponseEntity.status(200).body(resume);
            }
            return ResponseEntity.status(200).body(new ApiResponse("Resume Not Found", false));
        } catch (Exception e) {

            return ResponseEntity.status(500).body(e);
        }
    }

    public HttpEntity<?> deleteUserById(UUID userId, User admin) {
        try {
            if (admin.getId().equals(userId)) {
                return ResponseEntity.status(404).body(new ApiResponse("What are you doing?", false));
            }
            userRepository.deleteById(userId);
            return ResponseEntity.status(200).body(new ApiResponse("Deleted", true));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse("Something went wrong!", false));
        }
    }
}
