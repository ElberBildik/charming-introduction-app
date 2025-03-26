
# YemekyApp Backend

Bu dosya, YemekyApp'in backend kısmını çalıştırmak için talimatları içerir.

## Gereksinimler

- Node.js
- MongoDB (yerel veya MongoDB Atlas)

## Kurulum

1. `.env` dosyasını düzenleyin ve MongoDB bağlantı dizesini ekleyin:
   ```
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/yemekyapp
   PORT=5000
   ```

2. Gerekli paketleri yükleyin:
   ```
   npm install
   ```

3. Backend'i başlatın:
   ```
   node start-backend.js
   ```

## API Endpointleri

- `GET /api/recipes` - Tüm tarifleri getirir
- `GET /api/recipes/:id` - ID'ye göre tarif getirir
- `GET /api/recipes/category/:category` - Kategoriye göre tarifleri getirir
- `POST /api/recipes` - Yeni tarif ekler
- `PATCH /api/recipes/:id` - Tarifi günceller
- `DELETE /api/recipes/:id` - Tarifi siler
- `POST /api/recipes/search-by-ingredients` - Malzemelere göre tarifleri arar

## Örnek Tarif Verisi

Backend'e test tarifi eklemek için aşağıdaki curl komutunu kullanabilirsiniz:

```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Menemen",
    "description": "Klasik Türk kahvaltısı",
    "category": "breakfast",
    "prepTime": 10,
    "cookTime": 15,
    "difficulty": "Kolay",
    "imageUrl": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1000",
    "ingredients": ["3 yumurta", "2 domates", "1 yeşil biber", "tuz", "karabiber"],
    "instructions": ["Domatesleri ve biberleri doğrayın", "Tavada pişirin", "Yumurtaları ekleyin", "Karıştırarak pişirin"]
  }'
```
