import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const sendMail = async (email, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMPLOYER_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  // 🎨 Styled HTML Email Template
  const htmlContent = `
  <div style="
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    padding: 30px;
    border-radius: 10px;
    max-width: 600px;
    margin: auto;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  ">
    <div style="text-align: center;">
      <h2 style="color: #333;">🎉 Welcome to the Employee Management System</h2>
      <p style="color: #555; font-size: 16px;">Your account has been successfully created!</p>
    </div>
    
    <div style="
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
      border: 1px solid #e0e0e0;
    ">
      <h3 style="color: #333; margin-bottom: 10px;">Your Login Credentials</h3>
      <p style="font-size: 16px; color: #444;">
        <strong>Email:</strong> ${email}<br/>
        <strong>Password:</strong> ${password}
      </p>
    </div>

    <div style="text-align: center; margin-top: 25px;">
      <a href="https://yourcompanywebsite.com/login"
        style="
          background-color: #007bff;
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 6px;
          display: inline-block;
          font-weight: 500;
        ">
        Login Now
      </a>
    </div>

    <p style="color: #777; font-size: 14px; margin-top: 30px; text-align: center;">
      If you did not request this account, please contact support immediately.<br/>
      <span style="color: #555;">Thank you for joining us!</span>
    </p>
  </div>
  `;

  const mailOptions = {
    from: `"Employee Management System" <${process.env.EMPLOYER_EMAIL}>`,
    to: email,
    subject: "🎉 Your Employee Account Has Been Created",
    html: htmlContent, // ✅ Styled HTML Email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log("entered");
    if (error) {
      console.log("entered 1");

      console.log("❌ Email sending failed:", error);
      return 0;
    } else {
      console.log("entered 2");

      console.log("✅ Email sent successfully:", info.response);
      return 1;
    }
  });
};
