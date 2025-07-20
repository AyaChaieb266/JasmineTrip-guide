package com.pfe.apigatewayservice;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.cors.reactive.CorsWebFilter;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;


@SpringBootTest
@AutoConfigureWebTestClient
class ApiGatewayServiceApplicationTests {

    @Autowired
    private WebTestClient webTestClient;
    @Mock
    private ReactiveDiscoveryClient reactiveDiscoveryClient;

    @Mock
    private DiscoveryLocatorProperties discoveryLocatorProperties;

    @InjectMocks
    private ApiGatewayServiceApplication apiGatewayServiceApplication;

    @Test
    //corsWebFilter() de l'application de service API Gateway retourne
    // une instance non nulle de CorsWebFilter si oui =>
    //(Cross-Origin Resource Sharing) est correctement configuré dans l'application

    public void testCorsWebFilterBean() {
        CorsWebFilter corsWebFilter = apiGatewayServiceApplication.corsWebFilter();
        assertNotNull(corsWebFilter);
    }


    //test d'integtation
    @Test
    public void testUnauthorizedReservationAccess() {
        // Test pour vérifier l'accès non autorisé
        webTestClient.get().uri("/reservations")
                .exchange()
                .expectStatus().isUnauthorized();
    }
    @Test
    public void testUnauthorizedCommentsAccess() {
        // Test pour vérifier l'accès non autorisé
        webTestClient.get().uri("/comments")
                .exchange()
                .expectStatus().isUnauthorized();
    }


}





