import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  users,
  payments,
  outageReports,
  programEnrollments,
  contactSubmissions,
  type User,
  type InsertUser,
  type Payment,
  type InsertPayment,
  type OutageReport,
  type InsertOutageReport,
  type ProgramEnrollment,
  type InsertProgramEnrollment,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getPaymentsByUser(userId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;

  getOutageReportsByUser(userId: number): Promise<OutageReport[]>;
  createOutageReport(report: InsertOutageReport): Promise<OutageReport>;

  getEnrollmentsByUser(userId: number): Promise<ProgramEnrollment[]>;
  createEnrollment(enrollment: InsertProgramEnrollment): Promise<ProgramEnrollment>;

  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getPaymentsByUser(userId: number): Promise<Payment[]> {
    return db.select().from(payments).where(eq(payments.userId, userId));
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [result] = await db.insert(payments).values(payment).returning();
    return result;
  }

  async getOutageReportsByUser(userId: number): Promise<OutageReport[]> {
    return db.select().from(outageReports).where(eq(outageReports.userId, userId));
  }

  async createOutageReport(report: InsertOutageReport): Promise<OutageReport> {
    const [result] = await db.insert(outageReports).values(report).returning();
    return result;
  }

  async getEnrollmentsByUser(userId: number): Promise<ProgramEnrollment[]> {
    return db.select().from(programEnrollments).where(eq(programEnrollments.userId, userId));
  }

  async createEnrollment(enrollment: InsertProgramEnrollment): Promise<ProgramEnrollment> {
    const [result] = await db.insert(programEnrollments).values(enrollment).returning();
    return result;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [result] = await db.insert(contactSubmissions).values(submission).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
