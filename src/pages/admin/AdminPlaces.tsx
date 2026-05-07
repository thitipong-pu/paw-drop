import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function AdminPlaces() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '', place_type: 'Shelter',
    operating_hours: '', image_url: '', needed_items: '',
    facebook_page: '', facebook_url: ''
  });

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/admin/places?size=100`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setPlaces(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleOpenModal = (place?: any) => {
    if (place) {
      setEditingPlace(place);
      setFormData({
        name: place.name || '',
        address: place.address || '',
        phone: place.phone || '',
        place_type: place.place_type || 'Shelter',
        operating_hours: place.operating_hours || '',
        image_url: place.image_url || '',
        needed_items: place.needed_items ? place.needed_items.join(', ') : '',
        facebook_page: place.facebook_page || '',
        facebook_url: place.facebook_url || ''
      });
    } else {
      setEditingPlace(null);
      setFormData({ name: '', address: '', phone: '', place_type: 'Shelter', operating_hours: '', image_url: '', needed_items: '', facebook_page: '', facebook_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('admin_token');
      const method = editingPlace ? 'PUT' : 'POST';
      const url = editingPlace ? `${API_URL}/admin/places/${editingPlace.id}` : `${API_URL}/admin/places`;

      const payload = {
        ...formData,
        animal_types: ['dog', 'cat'], // default mock
        needed_items: formData.needed_items.split(',').map(i => i.trim()).filter(i => i),
      };

      const res = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchPlaces();
      } else {
        alert('Failed to save place');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving place');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ยืนยันการลบสถานที่นี้?')) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/admin/places/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchPlaces();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Prompt, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
          จัดการสถานที่รับบริจาค
        </h1>
        <button 
          onClick={() => handleOpenModal()}
          style={{ background: '#E8621A', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          + เพิ่มสถานที่ใหม่
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>ชื่อสถานที่</th>
              <th style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>ประเภท</th>
              <th style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>เบอร์ติดต่อ</th>
              <th style={{ padding: '12px 16px', color: '#374151', fontSize: '14px', textAlign: 'right' }}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>กำลังโหลด...</td></tr>
            ) : places.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>ไม่พบข้อมูล</td></tr>
            ) : (
              places.map(place => (
                <tr key={place.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#111827' }}>{place.name}</td>
                  <td style={{ padding: '12px 16px', color: '#6B7280' }}>{place.place_type}</td>
                  <td style={{ padding: '12px 16px', color: '#6B7280' }}>{place.phone || '-'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', gap: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleOpenModal(place)} style={{ background: '#F3F4F6', color: '#374151', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>แก้ไข</button>
                    <button onClick={() => handleDelete(place.id)} style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>ลบ</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: 'Prompt, sans-serif', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              {editingPlace ? 'แก้ไขสถานที่' : 'เพิ่มสถานที่ใหม่'}
            </h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>ชื่อสถานที่ *</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>ประเภท *</label>
                <input required value={formData.place_type} onChange={e => setFormData({...formData, place_type: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>ที่อยู่ *</label>
                <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>เวลาทำการ</label>
                <input value={formData.operating_hours} onChange={e => setFormData({...formData, operating_hours: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} placeholder="เช่น จันทร์-ศุกร์ 09:00 - 17:00" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>เบอร์โทร</label>
                <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>ลิงก์รูปภาพสถานที่ (ถ้ามี)</label>
                <input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} placeholder="https://..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>ชื่อ Facebook Page (ถ้ามี)</label>
                <input value={formData.facebook_page} onChange={e => setFormData({...formData, facebook_page: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} placeholder="เช่น มูลนิธิเพื่อสุนัขในซอย" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>ลิงก์ Facebook URL (ถ้ามี)</label>
                <input value={formData.facebook_url} onChange={e => setFormData({...formData, facebook_url: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>สิ่งที่ต้องการ (คั่นด้วยลูกน้ำ)</label>
                <input value={formData.needed_items} onChange={e => setFormData({...formData, needed_items: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} placeholder="เช่น อาหารแมว, ทรายแมว, ยารักษาเห็บหมัด" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, background: '#F3F4F6', color: '#374151', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>ยกเลิก</button>
                <button type="submit" style={{ flex: 1, background: '#E8621A', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>บันทึก</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
