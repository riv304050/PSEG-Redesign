import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertPaymentSchema, insertOutageReportSchema, insertProgramEnrollmentSchema, insertContactSubmissionSchema } from "@shared/schema";

function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  app.get("/api/payments", requireAuth, async (req, res) => {
    const payments = await storage.getPaymentsByUser(req.user!.id);
    res.json(payments);
  });

  app.post("/api/payments", requireAuth, async (req, res, next) => {
    try {
      const data = insertPaymentSchema.parse({ ...req.body, userId: req.user!.id });
      const payment = await storage.createPayment(data);
      res.status(201).json(payment);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/outage-reports", requireAuth, async (req, res) => {
    const reports = await storage.getOutageReportsByUser(req.user!.id);
    res.json(reports);
  });

  app.post("/api/outage-reports", async (req, res, next) => {
    try {
      const userId = req.isAuthenticated() ? req.user!.id : null;
      const data = insertOutageReportSchema.parse({ ...req.body, userId });
      const report = await storage.createOutageReport(data);
      res.status(201).json(report);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/enrollments", requireAuth, async (req, res) => {
    const enrollments = await storage.getEnrollmentsByUser(req.user!.id);
    res.json(enrollments);
  });

  app.post("/api/enrollments", requireAuth, async (req, res, next) => {
    try {
      const data = insertProgramEnrollmentSchema.parse({ ...req.body, userId: req.user!.id });
      const enrollment = await storage.createEnrollment(data);
      res.status(201).json(enrollment);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/contact-submissions", async (req, res, next) => {
    try {
      const data = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(data);
      res.status(201).json(submission);
    } catch (err) {
      next(err);
    }
  });

  return httpServer;
}
