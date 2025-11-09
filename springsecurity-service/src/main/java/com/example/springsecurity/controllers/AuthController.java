package com.example.springsecurity.controllers;

import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.stream.Collectors;

import com.example.springsecurity.models.*;
import com.example.springsecurity.payload.request.VerificationRequest;
import com.example.springsecurity.security.services.UserDetailsServiceImpl;
import com.example.springsecurity.services.Userservice;
import com.example.springsecurity.utils.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.springsecurity.exception.TokenRefreshException;
import com.example.springsecurity.payload.request.LoginRequest;
import com.example.springsecurity.payload.request.SignupRequest;
import com.example.springsecurity.payload.request.TokenRefreshRequest;
import com.example.springsecurity.payload.response.JwtResponse;
import com.example.springsecurity.payload.response.MessageResponse;
import com.example.springsecurity.payload.response.TokenRefreshResponse;
import com.example.springsecurity.repository.RoleRepository;
import com.example.springsecurity.repository.UserRepository;
import com.example.springsecurity.security.jwt.JwtUtils;
import com.example.springsecurity.security.services.RefreshTokenService;
import com.example.springsecurity.security.services.UserDetailsImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired private AuthenticationManager authenticationManager;
  @Autowired private UserRepository userRepository;
  @Autowired private Userservice userservice;
  @Autowired private RoleRepository roleRepository;
  @Autowired private PasswordEncoder encoder;
  @Autowired private JwtUtils jwtUtils;
  @Autowired private UserDetailsServiceImpl userDetailsService;
  @Autowired private RefreshTokenService refreshTokenService;
  @Autowired private JavaMailSender emailSender;
  @Autowired private EmailService emailService;

  @GetMapping("/all")
  public List<User> getAllusers() {
    return userRepository.findAll();
  }

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
    );

    Optional<User> u = userRepository.findByUsername(loginRequest.getUsername());
    if (u.isPresent() && u.get().getConfirm()) {
      SecurityContextHolder.getContext().setAuthentication(authentication);
      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

      String jwt = jwtUtils.generateJwtToken(userDetails);
      List<String> roles = userDetails.getAuthorities().stream()
              .map(item -> item.getAuthority()).collect(Collectors.toList());

      RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
      return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(),
              userDetails.getId(), userDetails.getUsername(),
              userDetails.getEmail(), userDetails.getImage(), roles));
    } else {
      throw new RuntimeException("User not confirmed");
    }
  }

  // ========================= SIGNUP =========================
  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest,
                                        HttpServletRequest request) throws MessagingException {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
            signUpRequest.getPhoneNumber(), encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        if ("customer".equals(role)) {
          Role customerRole = roleRepository.findByName(ERole.ROLE_TOURIST)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(customerRole);
        } else {
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    // Email confirmation
    String from = "ayachaieb266@gmail.com";
    String to = signUpRequest.getEmail();
    MimeMessage message = emailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message);
    helper.setSubject("Welcome to JasmineTrip 🌸");
    helper.setFrom(from);
    helper.setTo(to);
    helper.setText("""
      <html>
        <body style='font-family: Poppins, sans-serif; color:#333; text-align:center;'>
          <h2>Welcome to JasmineTrip Guide 🌿</h2>
          <p>Thank you for your subscription !</p>
          <p>Click here to confirm your account :</p>
          <a href="http://localhost:8085/auth/confirm?email=%s"
             style='display:inline-block;background:#cda48f;color:#fff;padding:10px 20px;
             text-decoration:none;border-radius:8px;'>Confirm my account</a>
          <p style='margin-top:20px;font-size:12px;color:#888;'>© 2025 JasmineTrip Guide</p>
        </body>
      </html>
    """.formatted(signUpRequest.getEmail()), true);

    emailSender.send(message);

    return ResponseEntity.ok(new MessageResponse("User registered successfully! Check your email for confirmation."));
  }

  // ========================= FORGOT PASSWORD =========================
  @PostMapping("/forgetpassword")
  public HashMap<String, String> resetPassword(String email) throws MessagingException {
    HashMap<String, String> message = new HashMap<>();
    User userexisting = userRepository.findByEmail(email);
    if (userexisting == null) {
      message.put("user", "user not found");
      return message;
    }

    UUID token = UUID.randomUUID();
    userexisting.setPasswordResetToken(token.toString());
    userexisting.setId(userexisting.getId());

    String from = "ayachaieb266@gmail.com";
    String to = userexisting.getEmail();
    MimeMessage messagee = emailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(messagee);
    helper.setSubject("Password reset 🌸");
    helper.setFrom(from);
    helper.setTo(to);

    String emailContent = """
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <title>Password Reset - JasmineTrip Guide</title>
              <style>
                body { font-family: 'Poppins', sans-serif; background-color: #fdeaea; margin: 0; padding: 0; }
                .container {
                  max-width: 600px; background: #fff; margin: 40px auto; padding: 30px;
                  border-radius: 16px; box-shadow: 0 6px 18px rgba(0,0,0,0.1); text-align: center;
                }
                .logo { width: 80px; margin-bottom: 10px; }
                h2 { color: #5a3a3a; }
                p { color: #775959; font-size: 14px; line-height: 1.6; }
                a.button {
                  display: inline-block; background: linear-gradient(90deg,#cda48f,#b68572);
                  color: white; text-decoration: none; padding: 12px 24px; border-radius: 10px;
                  margin-top: 20px; font-weight: 600; transition: 0.3s;
                }
                a.button:hover { background: linear-gradient(90deg,#b68572,#9c6a5e); }
                .footer { margin-top: 30px; font-size: 12px; color: #a68b8b; }
              </style>
            </head>
            <body>
              <div class="container">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" class="logo" alt="JasmineTrip Logo">
                <h2>Password Reset 🌸</h2>
                <p>Hello,</p>
                <p>Please click the buttons below to reset your password:</p>
                <a href="http://localhost:4200/reset-password/%s" class="button">Client - Reset Now</a><br><br>
                <a href="http://localhost:4300/reset-password/%s" class="button">Admin - Reset Now</a>
                <p class="footer">© 2025 JasmineTrip Guide — Thank you for your trust 🌿</p>
              </div>
            </body>
            </html>
                
    """.formatted(userexisting.getPasswordResetToken(), userexisting.getPasswordResetToken());

    helper.setText(emailContent, true);
    emailSender.send(messagee);

    userRepository.saveAndFlush(userexisting);
    message.put("user", "user found, check your email");
    return message;
  }

  // ========================= RESET PASSWORD =========================
  @PostMapping("/resetPassword/{passwordResetToken}")
  public HashMap<String, String> resetPassword(@PathVariable String passwordResetToken, String newPassword) {
    HashMap<String, String> message = new HashMap<>();
    User userexisting = userRepository.findByPasswordResetToken(passwordResetToken);
    if (userexisting != null) {
      userexisting.setPassword(new BCryptPasswordEncoder().encode(newPassword));
      userexisting.setPasswordResetToken(null);
      userRepository.save(userexisting);
      message.put("resetpassword", "processed");
    } else {
      message.put("resetpassword", "failed");
    }
    return message;
  }
  @GetMapping("/confirm")
  public ResponseEntity<?> confirmEmail(@RequestParam("email") String email) {
    // Find the user by email
    User user = userRepository.findByEmail(email);

    // If no user found
    if (user == null) {
      return ResponseEntity.badRequest().body("❌ Invalid confirmation link or user not found.");
    }

    // Mark account as confirmed
    user.setConfirm(true);
    userRepository.save(user);

    // HTML confirmation page with auto-redirect
    String htmlResponse = """
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Account Verified - JasmineTrip Guide</title>
          <meta http-equiv="refresh" content="5;url=http://localhost:4200/login">
          <style>
            body {
              font-family: 'Poppins', sans-serif;
              background-color: #faf6f2;
              text-align: center;
              padding: 60px;
            }
            .card {
              background-color: #fff;
              display: inline-block;
              padding: 40px 60px;
              border-radius: 16px;
              box-shadow: 0 4px 18px rgba(0,0,0,0.1);
            }
            h2 { color: #8b5e3c; }
            p { color: #6b5140; }
            a {
              display: inline-block;
              background: #cda48f;
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              margin-top: 20px;
              font-weight: bold;
            }
            a:hover { background: #b68572; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>🌸 Your JasmineTrip account has been verified!</h2>
            <p>You can now log in and enjoy your journey with us.</p>
            <p>You’ll be redirected to the login page in 5 seconds...</p>
            <a href="http://localhost:4200/login">Go to Login</a>
          </div>
        </body>
        </html>
    """;

    return ResponseEntity.ok().body(htmlResponse);
  }

}

