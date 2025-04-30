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
exports.sendApplicationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendApplicationEmail = (email, petName, status) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "prakashrestha2075@gmail.com",
            pass: "dalp dutv vids sldm",
        },
    });
    const subject = status === "ACCEPTED"
        ? "Your Adoption Application Has Been Approved!"
        : "Update on Your Adoption Application";
    const html = status === "ACCEPTED"
        ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #ffffff;">
          <h2 style="text-align: center; color: #4CAF50;">Congratulations! 🎉</h2>
          <p>Hi there,</p>
          <p>We’re excited to inform you that your application to adopt <strong>${petName}</strong> has been approved! 🐾</p>
          <p>Our team will contact you soon with further steps.</p>
          <p>Thank you for giving a loving home to a furry friend 💚</p>
          <hr />
          <p style="font-size: 12px; color: #999;">If you have any questions, feel free to reply to this email.</p>
        </div>
      `
        : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #ffffff;">
          <h2 style="text-align: center; color: #F44336;">We’re Sorry 😔</h2>
          <p>Hi there,</p>
          <p>Unfortunately, your application to adopt <strong>${petName}</strong> was not approved at this time.</p>
          <p>We appreciate your interest and encourage you to check out other pets looking for a loving home.</p>
          <hr />
          <p style="font-size: 12px; color: #999;">Feel free to reach out if you have any questions or want feedback.</p>
        </div>
      `;
    const mailOptions = {
        from: '"petHaven 🐾" <prakashrestha2075@gmail.com>',
        to: email,
        subject,
        html,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendApplicationEmail = sendApplicationEmail;
