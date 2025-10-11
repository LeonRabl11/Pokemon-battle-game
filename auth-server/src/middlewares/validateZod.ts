import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Generic validator that works with any Zod schema
export function validateBody<S extends z.ZodTypeAny>(schema: S) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: 'Invalid input', issues: result.error.issues });
    }
    // Optionally attach parsed data for later middleware/controllers:
    // (req as unknown as { parsed: z.infer<S> }).parsed = result.data;
    next();
  };
}
