const muller = require('multer');


//cau hinh storage
const storage = muller.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cd) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if(allowedTypes.includes(file.mimetype)) {
        cd(null, true);
    } else {
        cb(new Error('Chỉ cho phép upload cac file hinh anh'), false);
    }
}

const upload = muller({ storage, fileFilter });

module.exports = upload;