const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// การเชื่อมต่อกับ MongoDB
mongoose.connect('mongodb+srv://bestphumin2547:1234@cluster0.stobj.mongodb.net/skincare?retryWrites=true&w=majority&tls=true&tlsInsecure=true')
    .then(() => console.log('เชื่อมต่อกับ MongoDB สำเร็จ'))
    .catch(err => console.log('ไม่สามารถเชื่อมต่อกับ MongoDB:', err));

// ตั้งค่าการจัดเก็บรูปภาพ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // โฟลเดอร์สำหรับเก็บรูปภาพที่อัปโหลด
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // ตั้งชื่อไฟล์ที่อัปโหลด
    }
});

const upload = multer({ storage: storage });

// สคีมาและโมเดลของผลิตภัณฑ์
const productSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    description: String,
    relatedProducts: [String],
    imageUrl: String,
    type: String,
    price: Number,
    brand: String
});

const Product = mongoose.model('Product', productSchema);

// สคีมาและโมเดลของผู้ใช้
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// เส้นทางเริ่มต้น
app.get('/', (req, res) => {
    res.send('ยินดีต้อนรับสู่เว็บไซต์ Skincare!');
});

// เส้นทางดึงข้อมูลสินค้าทั้งหมด
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล', error: err.message });
    }
});

// เส้นทางค้นหาสินค้าตามชื่อหรือแบรนด์
app.get('/api/products/search', async (req, res) => {
    try {
        const { query } = req.query;
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { brand: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการค้นหา', error: err.message });
    }
});

// เส้นทางดึงข้อมูลสินค้าตามประเภท
app.get('/api/products/type/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const products = await Product.find({ type: { $regex: type, $options: 'i' } });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลตามประเภท', error: err.message });
    }
});

// เส้นทางเพิ่มผลิตภัณฑ์ใหม่
app.post('/api/add-product', upload.single('image'), async (req, res) => {
    const { name, ingredients, description, relatedProducts, type, price, brand } = req.body;
    if (!name || !type || !price || !brand) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
    }

    const product = new Product({
        name,
        ingredients: JSON.parse(ingredients),
        description,
        relatedProducts: JSON.parse(relatedProducts),
        imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
        type,
        price,
        brand
    });

    try {
        const newProduct = await product.save();
        res.status(201).json({ message: 'เพิ่มผลิตภัณฑ์สำเร็จ', product: newProduct });
    } catch (err) {
        res.status(400).json({ message: 'ไม่สามารถเพิ่มผลิตภัณฑ์ได้', error: err.message });
    }
});

// เส้นทางอัปเดตข้อมูลผลิตภัณฑ์
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, description, relatedProducts, type, price, brand } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'ไม่พบผลิตภัณฑ์ที่ต้องการอัปเดต' });
        }

        // อัปเดตค่าที่มีการกรอกใหม่
        if (name) product.name = name;
        if (ingredients) product.ingredients = JSON.parse(ingredients);
        if (description) product.description = description;
        if (relatedProducts) product.relatedProducts = JSON.parse(relatedProducts);
        if (req.file) product.imageUrl = `/uploads/${req.file.filename}`;
        if (type) product.type = type;
        if (price) product.price = price;
        if (brand) product.brand = brand;

        const updatedProduct = await product.save();
        res.status(200).json({ message: 'อัปเดตผลิตภัณฑ์สำเร็จ', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: 'ไม่สามารถอัปเดตผลิตภัณฑ์ได้', error: err.message });
    }
});

// เส้นทางลบผลิตภัณฑ์
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'ไม่พบผลิตภัณฑ์ที่ต้องการลบ' });
        }
        res.status(200).json({ message: 'ลบผลิตภัณฑ์สำเร็จ' });
    } catch (err) {
        res.status(500).json({ message: 'ไม่สามารถลบผลิตภัณฑ์ได้', error: err.message });
    }
});

// เส้นทางการลงทะเบียน
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'ลงทะเบียนสำเร็จ', user: savedUser });
    } catch (err) {
        res.status(400).json({ message: 'ชื่อผู้ใช้งานนี้ถูกใช้แล้ว', error: err.message });
    }
});

// เส้นทางเข้าสู่ระบบ
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ' });
        } else {
            res.status(400).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
    }
});

// ตั้งค่า Static File สำหรับการเข้าถึงรูปภาพ
app.use('/uploads', express.static('uploads'));

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`เซิร์ฟเวอร์กำลังรันบนพอร์ต ${port}`);
});
