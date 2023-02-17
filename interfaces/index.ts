export type UserKey = {
    KeyName: string;
    KeyValue: any;
};

export type KeyData = {
    UserId: string;
    Keys: UserKey[];
};

export type FormattedResponse<T> = {
    message?: any;
    data: T;
};
