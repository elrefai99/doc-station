
export interface IUser {
     id?: number;
     fullname?: string;
     username?: string;
     email?: string;
     password?: string;
     code?: string;
     phone?: string;
     address?: string;
     city?: string;
     state?: string;
     zip?: string;
     role?: string;
     status?: string;
     isVerified?: boolean;
     isActive?: boolean;
     isDeleted?: boolean;
     isArchived?: boolean;
     isSuspended?: boolean;
     isLocked?: boolean;
     isExpired?: boolean;
     isExpiring?: boolean;
     isExpiredSoon?: boolean;
     updatePAssword?: string;
     createdAt?: string;
     updatedAt?: string;
     avatar?: string;
     Bio?: string;
     doctorBookings?: string;
     patientBookings?: string;
     otps?: string;
}

export interface IMedical_history {
     userId: number
     start_date: string
     images: string[]
     description: string
}

export interface ImageUploadResult {
     image: string;
     path: string;
     error?: string;
}

export interface doctor_profile {
     userId: number
     address: string
     governorateId: number
     cityId: number
     timeStart: string
     timeEnd: string
     dateFrom: string
     dateTo: string
     price: number
}
