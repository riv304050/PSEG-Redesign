import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  accountNumber: text("account_number"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  donationAmount: decimal("donation_amount", { precision: 10, scale: 2 }),
  paymentMethod: text("payment_method").notNull(),
  status: text("status").notNull().default("completed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const outageReports = pgTable("outage_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  address: text("address").notNull(),
  issueType: text("issue_type").notNull(),
  description: text("description"),
  status: text("status").notNull().default("submitted"),
  estimatedRestoration: text("estimated_restoration"),
  crewStatus: text("crew_status").default("Dispatched"),
  suspectedCause: text("suspected_cause"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const programEnrollments = pgTable("program_enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  programName: text("program_name").notNull(),
  status: text("status").notNull().default("enrolled"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  language: text("language").notNull().default("english"),
  accountType: text("account_type").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  accountNumber: text("account_number"),
  helpTopic: text("help_topic").notNull(),
  subject: text("subject").notNull(),
  comments: text("comments").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true }).extend({
  accountType: z.string().min(1, "Account type is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  helpTopic: z.string().min(1, "Please select a topic"),
  subject: z.string().min(1, "Subject is required"),
  comments: z.string().min(1, "Comments are required"),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true, createdAt: true });
export const insertOutageReportSchema = createInsertSchema(outageReports).omit({ id: true, createdAt: true, estimatedRestoration: true, crewStatus: true, suspectedCause: true });
export const insertProgramEnrollmentSchema = createInsertSchema(programEnrollments).omit({ id: true, enrolledAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type OutageReport = typeof outageReports.$inferSelect;
export type InsertOutageReport = z.infer<typeof insertOutageReportSchema>;
export type ProgramEnrollment = typeof programEnrollments.$inferSelect;
export type InsertProgramEnrollment = z.infer<typeof insertProgramEnrollmentSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
