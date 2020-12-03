package mr.olloyor.test.service;


import mr.olloyor.test.entity.Resume;
import mr.olloyor.test.entity.User;
import mr.olloyor.test.exception.ResourceNotFoundException;
import mr.olloyor.test.exception.UserNotFoundException;
import mr.olloyor.test.payload.ApiResponse;
import mr.olloyor.test.payload.req.*;
import mr.olloyor.test.repository.ResumeRepository;
import mr.olloyor.test.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;


@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final ResumeRepository resumeRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, ResumeRepository resumeRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.resumeRepository = resumeRepository;
    }


    public ResponseEntity<ApiResponse> me(User user) {
        return ResponseEntity.status(200).body(new ApiResponse("User", true, user));
    }

    public HttpEntity<ApiResponse> editUserFields(ReqUser reqUser, User user) {
        try {

            if (!reqUser.getFirstName().isEmpty()) {
                user.setFirstName(reqUser.getFirstName());
            }
            if (!reqUser.getLastName().isEmpty()) {
                user.setLastName(reqUser.getLastName());
            }
            if (!reqUser.getSureName().isEmpty()) {
                user.setSureName(reqUser.getSureName());
            }

            user = userRepository.save(user);
            return ResponseEntity.status(200).body(new ApiResponse("Updated", true, user));

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(new ApiResponse("Something Went Wrong!", false, e));
//            throw new Exception(e);
        }
    }

    public HttpEntity<?> addOrEditResume(ReqResume reqResume, User user) throws Exception {
        try {
            if (user.getResume() == null) {
                Resume newResume = new Resume(
                        reqResume.getBornDate(),
                        reqResume.getNationality(),
                        reqResume.getEducations(),
                        reqResume.getExperiences(),
                        reqResume.getIsPrivate()
                );
                newResume = resumeRepository.save(newResume);
                user.setResume(newResume);
                user = userRepository.save(user);
                return ResponseEntity.status(201).body(user.getResume());
            } else {
                Resume oldResume = resumeRepository.findById(user.getResume().getId()).orElseThrow(() -> new ResourceNotFoundException("M", "", ""));

                oldResume.setBornDate(reqResume.getBornDate());
                oldResume.setNationality(reqResume.getNationality());
                oldResume.setEducations(reqResume.getEducations());
                oldResume.setExperiences(reqResume.getExperiences());
                oldResume.setIsPrivate(reqResume.getIsPrivate());

//                oldResume = resumeRepository.save(oldResume);
                user.setResume(oldResume);
                user = userRepository.save(user);
                return ResponseEntity.status(200).body(user.getResume());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Something Went Wrong!", false));
//            throw new Exception(e);
        }
    }


    public HttpEntity<ApiResponse> addOrEditPhoneNumber(ReqPhoneNumber phoneNumber, User user) {
        boolean existPhone = userRepository.existsByPhoneNumber(phoneNumber.getPhoneNumber());
        if (!existPhone) {
            user.setPhoneNumber(phoneNumber.getPhoneNumber());
            user = userRepository.save(user);
            return ResponseEntity.status(201).body(new ApiResponse("Phone Number Added", true, user));

//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Verification Code Wrong", false));
        } else if (user.getPhoneNumber() != null && user.getPhoneNumber().equals(phoneNumber.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ApiResponse("This is your Phone Number", true));
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse("This Number Already registered", false));
    }

    public HttpEntity<ApiResponse> editPassword(ReqPassword reqPassword, User user) {
        if (passwordEncoder.matches(reqPassword.getPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(reqPassword.getNewPassword()));
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ApiResponse("password.edited", true));

        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse("password.incorrect", false, LocaleContextHolder.getLocale()));
    }


    public HttpEntity<ApiResponse> editEmail(ReqEmail reqEmail, User user) {
        if (userRepository.existsByEmail(reqEmail.getEmail()) && !user.getEmail().equals(reqEmail.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse("This Email already in use", false));
        }
        if (!user.getEmail().equals(reqEmail.getEmail())) {
            user.setEmail(reqEmail.getEmail());
            userRepository.save(user);
            // TO-DO: SHOULD SEND EMAIL VERIFICATION
        }
        return ResponseEntity.status(200).body(new ApiResponse("Changed to " + reqEmail.getEmail(), true, reqEmail.getEmail()));
    }

    public ApiResponse checkEmailAvailability(String email) {
        Boolean isFree = !userRepository.existsByEmail(email);
        return new ApiResponse(isFree ? "Email Available" : " Email Not Available", isFree, (isFree));
    }

    private String genRandNum() {
        Random rnd = new Random();
        return String.format("%06d", rnd.nextInt(999999));
    }


}
