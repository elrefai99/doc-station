export enum UserRole {
     admin = "ADMIN",
     patient = "PATIENT",
     doctor = "DOCTOR"
}

export enum UserStatus {
     active = "ACTIVE",
     inactive = "INACTIVE",
     verified = "VERIFIED",
     banned = "BANNED",
     suspended = "SUSPENDED",
     deleted = "DELETED",
     archived = "ARCHIVED"
}

export enum OTPStatus {
     pending = "PENDING",
     verified = "VERIFIED",
     expired = "EXPIRED",
     failed = "FAILED"
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

export enum PaymentProviderType {
  PAYMOB = 'paymob',
  PAYFORT = 'payfort',
}