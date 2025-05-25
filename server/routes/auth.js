const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "thien@qairline.edu.vn"
 *               password:
 *                 type: string
 *                 example: "Matkhau123!"
 *               phoneNumber:
 *                 type: string
 *                 example: "134874513223"
 *               address:
 *                 type: string
 *                 example: "123 Đường ABC, Quận 1, TP.HCM"
 *               lastName:
 *                 type: string
 *                 example: "Nguyễn"
 *               middleAndFirstName:
 *                 type: string
 *                 example: "Văn A"
 *               displayOrder:
 *                 type: integer
 *                 example: 1
 *               gender:
 *                 type: string
 *                 example: "Nam"
 *               birthDate:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: integer
 *                     example: 15
 *                   month:
 *                     type: integer
 *                     example: 8
 *                   year:
 *                     type: integer
 *                     example: 1995
 *               role:
 *                 type: string
 *                 example: "user"
 *               nationality:
 *                 type: string
 *                 example: "Việt Nam"
 *               language:
 *                 type: string
 *                 example: "Tiếng Việt"
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 */
router.post('/register', authController.register); 

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "thien@qairline.edu.vn"
 *               password:
 *                 type: string
 *                 example: "Matkhau123!"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Email hoặc mật khẩu không đúng
 *       401:
 *         description: Tài khoản chưa được xác thực hoặc bị khóa
 *       500:
 *         description: Lỗi máy chủ
 */
router.post('/login', authController.login); 

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Yêu cầu đặt lại mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "thien@qairline.edu.vn"
 *     responses:
 *       200:
 *         description: Gửi email đặt lại mật khẩu thành công
 *       400:
 *         description: Email không hợp lệ
 *       404:
 *         description: Không tìm thấy tài khoản với email này
 *       500:
 *         description: Lỗi máy chủ
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Xác thực OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "thien@qairline.edu.vn"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Xác thực OTP thành công, trả về resetToken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resetToken:
 *                   type: string
 *                   example: "someRandomResetTokenString"
 *       400:
 *         description: OTP không hợp lệ hoặc đã hết hạn
 *       404:
 *         description: Không tìm thấy yêu cầu OTP cho email này
 *       500:
 *         description: Lỗi máy chủ
 */
router.post('/verify-otp', authController.verifyOtp);

/**
 * @swagger
 * /auth/reset-password:
 *   put:
 *     summary: Đặt lại mật khẩu mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *                 example: "someRandomResetTokenString"
 *               newPassword:
 *                 type: string
 *                 example: "NewPassword123!"
 *     responses:
 *       200:
 *         description: Đặt lại mật khẩu thành công
 *       400:
 *         description: Token không hợp lệ, đã hết hạn hoặc mật khẩu mới không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 */
router.put('/reset-password', authController.resetPassword);

module.exports = router;