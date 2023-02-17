// AN EXAMPLE OF A KEY SCHEMA
// REPLACE IT WITH REAL KEY SCHEMAS LATER
import { z } from 'zod';

/* BINANCE KEY SCHEMA */
export const binanceKeySchema = z.object({
    KeyName: z.literal('Binance'),
    KeyValue: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

/* COINBASE KEY SCHEMA */
export const coinbaseKeySchema = z.object({
    KeyName: z.literal('Coinbase'),
    KeyValue: z.object({
        apiKey: z.string(),
    }),
});
