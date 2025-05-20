const User = require('../models/User');
const jwt = require('jsonwebtoken');

//khoi tao JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

//dang ky tai khoan
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if(!fullName || !email || !password) {
        return res.status(400).json({message: ' Vui lòng điền đầy đủ thông tin'});
    }
    try {
        //kiem tra email da ton tai
        const userExists = await User.findOne({ email});
        if(userExists) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
        
    
    } catch (error) {
        console.error('Lỗi đăng ký người dùng:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

//dang nhap tai khoan
exports.loginUser = async (req, res) => {
    const { email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: 'Vui lòng điền đầy đủ thông tin'})
    }

    try{
        const user = await User.findOne( {email })
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({message: 'Email hoặc mật khẩu không đúng'})
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })

    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
}

//Lay thong tin nguoi dung
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({message: "Không tìm thấy người dùng"})
        }
    
        res.status(200).json(user)

    } catch(err) {
        console.error('Lỗi lấy thông tin người dùng:', err);
        return res.status(500).json({ message: 'Server error' });
    }


}