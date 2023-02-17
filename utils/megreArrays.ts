import { UserKey } from '../interfaces';

export const mergeKeys = (existingKeys: UserKey[], newKeys: UserKey[]): UserKey[] => {
    const mergedKeys = existingKeys.concat(newKeys);
    const uniqueKeys = mergedKeys.reverse().filter((key, index) => {
        return mergedKeys.findIndex((k) => k.KeyName === key.KeyName) === index;
    });
    return uniqueKeys;
};
