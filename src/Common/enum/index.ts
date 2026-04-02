export enum UserRole {
     ADMIN = "ADMIN",
     PATIENT = "PATIENT",
     DOCTOR = "DOCTOR"
}

export enum UserStatus {
     ACTIVE = "ACTIVE",
     INACTIVE = "INACTIVE",
     VERIFIED = "VERIFIED",
     BANNED = "BANNED",
     SUSPENDED = "SUSPENDED",
     DELETED = "DELETED",
     ARCHIVED = "ARCHIVED"
}

export enum OTPStatus {
     PENDING = "PENDING",
     VERIFIED = "VERIFIED",
     EXPIRED = "EXPIRED",
     FAILED = "FAILED"
}

export enum BookingStatus {
     PENDING = "PENDING",
     PAYMENT = "PAYMENT",
     ACCEPTED = "ACCEPTED",
     REJECTED = "REJECTED"
}

export enum OrderStatus {
     PENDING = "PENDING",
     SUCCESS = "SUCCESS",
     REFUNDED = "REFUNDED",
     FAILED = "FAILED"
}
