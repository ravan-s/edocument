package com.crop.docuflow.service;

import com.crop.docuflow.entity.Document;
import com.crop.docuflow.entity.DocumentStatus;

import java.util.List;

public interface DocumentService {
    Document createDocument(Document document);
    List<Document> getAllDocuments();
    Document getDocumentById(Long id);
    Document updateDocumentStatus(Long id, DocumentStatus status);
}