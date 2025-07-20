package com.pfe.categoryservice;

import com.pfe.categoryservice.models.Services;
import com.pfe.categoryservice.repository.ServicesRepository;
import com.pfe.categoryservice.services.implementation.servicesAtrImp;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TestUnitaireServiceAttraction {

    @Mock
    private ServicesRepository servicesRepository;

    @InjectMocks
    private servicesAtrImp servicesService;


    @Test
    public void testCreateService() {
        // Création d'un service fictif
        Services newService = new Services();
        newService.setName("Service Test");
        newService.setContent("Description du service de test");
        newService.setPrice(100.0f);

        // Définir le comportement du repository mock pour retourner le service créé
        when(servicesRepository.save(newService)).thenReturn(newService);

        // Appeler la méthode de création
        Services createdService = servicesService.createService(newService);

        // Vérifier que le service a été créé avec succès
        assertNotNull(createdService);
        assertEquals("Service Test", createdService.getName());
        assertEquals("Description du service de test", createdService.getContent());
        assertEquals(100.0f, createdService.getPrice());

        // Vérifier que le repository save a été appelé une fois
        verify(servicesRepository, times(1)).save(newService);
    }

@Test
public void testServiceById() {
    // Création d'un service fictif
    Services service = new Services();
    service.setId(1L);
    service.setName("Service Test");
    service.setContent("Description du service de test");
    service.setPrice(100.0f);

    // Définir le comportement du repository mock pour retourner le service créé
    when(servicesRepository.findById(1L)).thenReturn(Optional.of(service));

    // Appeler la méthode à tester
    Services foundService = servicesService.serviceById(1L);

    // Vérifier que le service a été trouvé avec succès
    assertNotNull(foundService);
    assertEquals(1L, foundService.getId());
    assertEquals("Service Test", foundService.getName());
    assertEquals("Description du service de test", foundService.getContent());
    assertEquals(100.0f, foundService.getPrice());

    // Vérifier que le repository findById a été appelé une fois
    verify(servicesRepository, times(1)).findById(1L);
}
    @Test
    public void testServiceByIdNotFound() {
        // Définir le comportement du repository mock pour retourner un Optional vide
        when(servicesRepository.findById(1L)).thenReturn(Optional.empty());

        // Appeler la méthode à tester
        Services foundService = servicesService.serviceById(1L);

        // Vérifier que le service n'a pas été trouvé (null)
        assertNull(foundService);

        // Vérifier que le repository findById a été appelé une fois
        verify(servicesRepository, times(1)).findById(1L);
    }}


