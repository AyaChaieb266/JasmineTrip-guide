package com.pfe.apigatewayservice;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.security.config.web.server.ServerHttpSecurity;

import org.springframework.context.annotation.Bean;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import org.springframework.web.util.pattern.PathPatternParser;

@SpringBootApplication
// Permet la découverte de services avec Eureka
@EnableDiscoveryClient
// Active la sécurité web pour l'application
@EnableWebSecurity




public class ApiGatewayServiceApplication {
    // Démarre l'application Spring Boot

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayServiceApplication.class, args);
    }

// Crée un bean pour la définition des routes dynamiques basées sur les services enregistrés dans Eureka.
    //indique à Spring de traiter la méthode comme une usine de bean sera utilisable dans d'autres parties de l'application.
    @Bean
//configuration permet à la passerelle Spring Cloud Gateway
// de récupérer dynamiquement les définitions de routes à partir du Eureka
    // Retourne un objet de type DiscoveryClientRouteDefinitionLocator
    DiscoveryClientRouteDefinitionLocator locator(ReactiveDiscoveryClient rdc, DiscoveryLocatorProperties dlp)
    {
        return new DiscoveryClientRouteDefinitionLocator(rdc, dlp);
    }

    // Configure les règles CORS pour permettre des requêtes depuis des origines spécifiques.
    @Bean

    public CorsWebFilter corsWebFilter() {
        // Crée une nouvelle configuration CORS

        CorsConfiguration config = new CorsConfiguration();
        // Autorise l'envoi des cookies dans les requêtes CORS
        config.setAllowCredentials(true);
        // Autorise les requêtes depuis ces origines
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedOrigin("http://localhost:4300");

      // Autorise tous les en-têtes
        config.addAllowedHeader("*");
        // Autorise toutes les méthodes HTTP (GET, POST, etc.)
        config.addAllowedMethod("*");
        // Crée une source de configuration CORS basée sur les URL
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(new PathPatternParser());
        // Applique la configuration CORS à toutes les routes
        source.registerCorsConfiguration("/**", config);
       // Retourne un filtre CORS configuré
        return new CorsWebFilter(source);
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        // Désactive la protection CSRF (Cross-Site Request Forgery) autoriser l'acces sans authentification
        http.csrf().disable()
                // Commence la configuration des autorisations d'échange
                .authorizeExchange()
                // Permet l'accès à ces routes sans authentification
                .pathMatchers("/CATEGORY-SERVICE/**").permitAll()
                .pathMatchers("/COMMENT-SERVICE/**").permitAll()
                .pathMatchers("/SECURITY-SERVICE/**").permitAll()
                .pathMatchers("/RESERVATION-SERVICE/**").permitAll()
                // Toutes les autres requêtes nécessitent une authentification
                .anyExchange().authenticated()
                .and()
                // Utilise l'authentification HTTP Basic
                .httpBasic();
// Construit et retourne l'objet SecurityWebFilterChain
        return http.build();
    }



}
