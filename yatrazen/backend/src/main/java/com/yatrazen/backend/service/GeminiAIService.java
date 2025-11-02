package com.yatrazen.backend.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class GeminiAIService {
    @Value("${google.gemini.api.key}")
    private String apiKey;

    private final WebClient webClient;
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

    public GeminiAIService() {
        this.webClient = WebClient.builder().build();
    }

    public Mono<String> generateTripPlan(String prompt) {
        // top level json object which will be sent to gemini api, holds info of the request
        Map<String, Object> requestBody = new HashMap<>();

        // defines how ai generates the content
        Map<String, Object> generationConfig = new HashMap<>();

        generationConfig.put("temperature", 1);
        generationConfig.put("topP", 0.95);
        generationConfig.put("maxOutputTokens", 8192);
        generationConfig.put("responseMimeType", "application/json");

        Map<String, Object> content = new HashMap<>();
        Map<String, Object> part = new HashMap<>();

        part.put("text", prompt);
        content.put("parts", Arrays.asList(part));

        requestBody.put("contents", Arrays.asList(content));
        requestBody.put("generationConfig", generationConfig);

        String url = GEMINI_API_URL + "?key=" + apiKey;

        return webClient.post()
            .uri(url)
            .header("Content-Type", "application/json")
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(String.class);
    }
}
