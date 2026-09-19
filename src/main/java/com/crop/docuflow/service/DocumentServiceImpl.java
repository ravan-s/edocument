package com.crop.docuflow.service;

import com.crop.docuflow.entity.Document;
import com.crop.docuflow.entity.DocumentStatus;
import com.crop.docuflow.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Override
    public Document createDocument(Document document) {
        if (document.getDocumentNumber() == null || document.getDocumentNumber().isEmpty()) {
            document.setDocumentNumber("DOC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return documentRepository.save(document);
    }

    @Override
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    @Override
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evrak bulunamadı: " + id));
    }

    @Override
    public Document updateDocumentStatus(Long id, DocumentStatus status) {
        Document doc = getDocumentById(id);
        doc.setStatus(status);
        return documentRepository.save(doc);
    }
}