export enum ProgramStatus {
    FOUND = "PC01",
    CREATED = 'PC01',
    UPDATED = 'PC02',
    DELETED = 'PC03',
}

export class ProgramMessages {
    static readonly FETCHED_SUCCESSFULLY = 'Program fetched successfully';
    static readonly CREATED_SUCCESSFULLY = 'Program created successfully';
    static readonly UPDATED_SUCCESSFULLY = 'Program updated successfully';
    static readonly DELETED_SUCCESSFULLY = 'Program deleted successfully';
}
