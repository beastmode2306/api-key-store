import { z } from 'zod';
import { binanceKeySchema, coinbaseKeySchema } from './keySchemas';

const keySchemaValidator = z.discriminatedUnion('KeyName', [
    binanceKeySchema,
    coinbaseKeySchema,
]);

export { keySchemaValidator };
