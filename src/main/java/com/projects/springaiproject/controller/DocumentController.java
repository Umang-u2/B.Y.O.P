package com.projects.springaiproject.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow frontend access
public class DocumentController {

    private final ChatClient chatClient;

    @Autowired
    private VectorStore vectorStore;

    ChatMemory chatMemory = MessageWindowChatMemory.builder().build();

    public DocumentController(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultAdvisors(MessageChatMemoryAdvisor
                        .builder(chatMemory)
                        .build())
                .build();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(@RequestParam("file") MultipartFile file) {
        try {
            Resource pdfResource = new InputStreamResource(file.getInputStream());
            
            // 1. Read PDF
            PagePdfDocumentReader pdfReader = new PagePdfDocumentReader(pdfResource);
            List<Document> documents = pdfReader.get();

            // 2. Split into chunks
            // Using default TokenTextSplitter for now, can be tuned
            TokenTextSplitter splitter = new TokenTextSplitter(); 
            List<Document> splitDocuments = splitter.apply(documents);

            // 3. Store embeddings
            vectorStore.add(splitDocuments);

            return ResponseEntity.ok("Successfully uploaded and processed " + splitDocuments.size() + " chunks.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to upload document: " + e.getMessage());
        }
    }

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Message cannot be empty");
        }

        List<Document> similarDocuments = vectorStore.similaritySearch(message);
        String contextData = similarDocuments.stream()
                .map(Document::getText)
                .collect(Collectors.joining("\n"));

        String promptText = """
                You are a helpful assistant designed to answer questions based ONLY on the provided document context.
                
                Instructions:
                1. Answer the user's question strictly using the context provided below.
                2. If the answer is not present in the context, state clearly: "I cannot find the answer in the provided document." Do not make up an answer.
                3. Do not use outside knowledge.
                4. If the context is empty, ask the user to upload a valid document.
                
                USER QUESTION:
                {message}
                
                CONTEXT:
                {contextData}
                
                Response should provide a clear answer based on the above context. 
                Make use of bullet points in your response whenever you are returing a list.
                """;

        PromptTemplate template = new PromptTemplate(promptText);

        // 3. Inject the variables
        Prompt prompt = template.create(Map.of(
                "contextData", contextData,
                "message", message
        ));

        String response = chatClient.prompt(prompt)
                .user(message)
                .advisors(QuestionAnswerAdvisor.builder(vectorStore).build())
                .call()
                .content();
        
        return ResponseEntity.ok(response);
    }
}
