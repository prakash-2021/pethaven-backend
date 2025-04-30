"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendVerificationEmail = (email, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "prakashrestha2075@gmail.com",
            pass: "dalp dutv vids sldm",
        },
    });
    const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;
    const mailOptions = {
        from: '"petHaven 🐾" <prakashrestha2075@gmail.com>',
        to: email,
        subject: "Verify your email address",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #ffffff;">
        <h2 style="text-align: center; color: #4CAF50;">Welcome to petHaven! 🐶🐱</h2>
        <p>Hi there,</p>
        <p>Thanks for signing up! Please confirm your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" target="_blank" style="background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">Verify Email</a>
        </div>
        <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
        <p style="word-break: break-all; color: #555;">${verificationLink}</p>
        <hr />
        <p style="font-size: 12px; color: #999;">If you did not request this email, you can safely ignore it.</p>
      </div>
    `,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendVerificationEmail = sendVerificationEmail;
