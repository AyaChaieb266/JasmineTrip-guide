package com.example.springsecurity.controllers;



import com.example.springsecurity.models.User;
import com.example.springsecurity.repository.UserRepository;
import com.example.springsecurity.utils.EmailService;
import com.example.springsecurity.utils.StorageService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "/user")
@RestController

public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storage;


    @Autowired
    private EmailService emailService;
    @GetMapping("/all")
    public List<User> getAllusers() {
        return userRepository.findAll();
    }


    @PostMapping("/save")
    public User saveuser(@RequestBody User u) {
        return userRepository.save(u);
    }

    @GetMapping ("/getone/{id}")
    public User getOneUser(@PathVariable Long id){
        return userRepository.findById(id).orElse(null);
    }


    @PutMapping("/update/{Id}")
    public User update(@RequestBody User u, @PathVariable Long Id) {
        User u1 = userRepository.findById(Id).orElse(null);
        if (u1!= null) {
            u.setId(Id);
            return userRepository.saveAndFlush(u);
        }
        else{
            throw new RuntimeException("FAIL!");
        }
    }

    @DeleteMapping("/delete/{Id}")
    public HashMap<String,String> deleteUser(@PathVariable Long id) {
        HashMap message= new HashMap();
        try{
            userRepository.deleteById(id);
            message.put("etat","user deleted");
            return message;
        }
        catch (Exception e) {
            message.put("etat","user not deleted");
            return message;
        }
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> extensionToContentType = new HashMap<>();
        extensionToContentType.put("pdf", "application/pdf");
        extensionToContentType.put("jpg", "image/jpeg");
        extensionToContentType.put("jpeg", "image/jpeg");
        extensionToContentType.put("png", "image/png");
        // Obtenez l'extension du fichier à partir du nom de fichier
        String fileExtension = FilenameUtils.getExtension(filename);
        // Obtenez le type de contenu à partir de la correspondance
        String contentType = extensionToContentType.getOrDefault(fileExtension.toLowerCase(),
                MediaType.APPLICATION_OCTET_STREAM_VALUE);
        // Définissez le type de contenu dans les en-têtes de réponse
        headers.setContentType(MediaType.parseMediaType(contentType));
        return ResponseEntity.ok().headers(headers).body(file);
    }




}
