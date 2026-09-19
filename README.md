# 📄 Docuflow - E-Belge ve Evrak Yönetim Sistemi

Docuflow, kurum ve işletmelerin dijital evrak akışlarını yönetmek, evrak durumlarını (Beklemede, Onaylandı, Reddedildi) takip etmek ve belge arşivlemesini kolaylaştırmak amacıyla geliştirilmiş **Full-Stack** bir evrak yönetim sistemidir.

## 🛠️ Teknolojiler ve Mimariler

### **Backend**
* **Java 17** & **Spring Boot 3**
* **Spring Data JPA (Hibernate):** PostgreSQL veritabanı ORM yönetimi
* **Spring Web (REST API):** JSON tabanlı API uç noktaları
* **PostgreSQL:** İlişkisel veritabanı yönetimi

### **Frontend**
* **React 18** (Vite ile oluşturuldu)
* **Axios:** Asenkron HTTP istekleri ve API entegrasyonu
* **CSS3 / JSX:** Modüler ve responsive kullanıcı arayüzü
## 📁 Proje Yapısı

edocument/
├── src/                    # Spring Boot Backend Kaynak Kodları
│   ├── main/
│   │   ├── java/com/crop/docuflow/
│   │   │   ├── controller/ # REST API Uç Noktaları
│   │   │   ├── entity/     # Veritabanı Tablo Modelleri
│   │   │   ├── repository/ # Veritabanı Sorgu Katmanı
│   │   │   └── service/    # İş Mantığı Katmanı
│   │   └── resources/      # Veritabanı ve Uygulama Ayarları
├── client/                 # React Frontend Uygulaması
│   ├── src/
│   │   ├── api.js          # Axios API Bağlantıları
│   │   ├── App.jsx         # Evrak Yönetim Paneli Arayüzü
│   │   └── main.jsx        # React Giriş Noktası
└── pom.xml                 # Maven Bağımlılık Yönetimi
🔌 API Uç Noktaları (Endpoints)MetotUç NoktaAçıklamaGET/api/v1/documentsTüm evrakları listelerPOST/api/v1/documentsYeni bir evrak oluştururPUT/api/v1/documents/{id}/statusEvrak durumunu günceller (APPROVED, REJECTED)🚀 Kurulum ve ÇalıştırmaÖn GereksinimlerJDK 17+Node.js (v18+)PostgreSQL ServerGit1. Veritabanı AyarlarıPostgreSQL üzerinde ebelge_db adında bir veritabanı oluşturun. src/main/resources/application.properties dosyasındaki kullanıcı adı ve şifre bilgilerini kendi yerel veritabanınıza göre güncelleyin:Propertiesspring.datasource.url=jdbc:postgresql://localhost:5432/ebelge_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
2. Backend'i ÇalıştırmaProjenin ana dizininde aşağıdaki komutu çalıştırın:PowerShell.\mvnw.cmd spring-boot:run
Backend API http://localhost:8080 adresinde çalışacaktır.3. Frontend'i ÇalıştırmaYeni bir terminal sekmesi açarak client klasörüne girin ve bağımlılıkları yükleyip uygulamayı başlatın:PowerShellcd client
npm install
npm run dev
Frontend Arayüzü http://localhost:5174 adresinde çalışacaktır.
📝 Gelecek Geliştirmeler (Roadmap)
[ ] Sunucuya gerçek fiziki dosya (PDF/Image) yükleme ve indirme desteği
[ ] Evrak numarası ve başlığa göre anlık arama/filtreleme
[ ] Kullanıcı rol yönetimi (Admin, Personel)
