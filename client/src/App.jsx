import { useState, useEffect } from 'react';
import { getDocuments, createDocument, updateDocumentStatus } from './api';

function App() {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState('PDF');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Evraklar yüklenirken hata oluştu:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await createDocument({
        title,
        description,
        fileType,
        status: 'PENDING'
      });
      setTitle('');
      setDescription('');
      fetchDocuments();
    } catch (error) {
      console.error('Evrak eklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDocumentStatus(id, newStatus);
      fetchDocuments();
    } catch (error) {
      console.error('Durum güncellenirken hata oluştu:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📄 Docuflow - Evrak Yönetim Paneli</h1>

      {/* Yeni Evrak Ekleme Formu */}
      <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Yeni Evrak Yükle</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Evrak Başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <select value={fileType} onChange={(e) => setFileType(e.target.value)} style={{ padding: '8px' }}>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="XLSX">XLSX</option>
            <option value="PNG">PNG/JPG</option>
          </select>
        </div>
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Yükleniyor...' : 'Evrak Oluştur'}
        </button>
      </form>

      {/* Evrak Listesi */}
      <h3>Sistemdeki Evraklar</h3>
      {documents.length === 0 ? (
        <p>Henüz kayıtlı bir evrak bulunmuyor.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee', textAlign: 'left' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Evrak No</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Başlık</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Tür</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Durum</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{doc.documentNumber}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{doc.title}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{doc.fileType}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: 'white',
                    backgroundColor: doc.status === 'APPROVED' ? '#28a745' : doc.status === 'REJECTED' ? '#dc3545' : '#ffc107'
                  }}>
                    {doc.status}
                  </span>
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button onClick={() => handleStatusChange(doc.id, 'APPROVED')} style={{ marginRight: '5px' }}>Onayla</button>
                  <button onClick={() => handleStatusChange(doc.id, 'REJECTED')}>Reddet</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;