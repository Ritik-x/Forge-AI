import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import FormData from "form-data";
import { Buffer } from "buffer"; // make sure

import fs from "fs";
import pdfParse from "pdf-parse";

import { v2 as cloudinary } from "cloudinary";
// import { fstat } from "fs";
// import pdf from "pdf-parse";
const AI = new OpenAI({
  apiKey: process.env.GEMINI_API__KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;

    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message:
          "Free usage limit exceeded. Upgrade to premium for more requests.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content,type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      content,
      message: "Article generated successfully.",
    });
  } catch (error) {
    console.error("Error generating article:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;

    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message:
          "Free usage limit exceeded. Upgrade to premium for more requests.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content,type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      content,
      message: "Article generated successfully.",
    });
  } catch (error) {
    console.error("Error generating article:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Upgrade to premium to get benefits",
      });
    }

    // ✅ FIXED: Corrected the variable name from `form` to `formData`
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(), // ✅ FIXED: Add this line to set the correct multipart headers
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({
      success: true,
      content: secure_url,
      message: "Image generated successfully.",
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Upgrade to premium to get benefits",
      });
    }

    // Check if file exists
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded.",
      });
    }

    // Upload to Cloudinary with background removal
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')
    `;

    res.json({
      success: true,
      content: secure_url,
      message: "Background removed successfully.",
    });
  } catch (error) {
    console.error("Error removing background:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Upgrade to premium to get benefits",
      });
    }

    // Check if file exists
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded.",
      });
    }

    // Upload to Cloudinary
    const { public_id } = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')
    `;

    res.json({
      success: true,
      content: imageUrl,
      message: "Object removed successfully.",
    });
  } catch (error) {
    console.error("Error removing object:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { plan } = req;
    const resume = req.file;
    const length = 500; // or get from req.body if user specifies
    //
    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Upgrade to premium to get benefits",
      });
    }
    //
    if (!resume || !resume.path) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }
    //
    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds limit.",
      });
    }
    //
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdfParse(dataBuffer);
    //
    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement:\n\n${pdfData.text}`;
    //
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });
    //
    const content = response.choices[0].message.content;
    //
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')
    `;
    //
    res.json({
      success: true,
      content,
      message: "Resume reviewed successfully.",
    });
  } catch (error) {
    console.error("Error reviewing resume:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
//
