import type { Context, Next } from "koa";
import { AnyZodObject, ZodEffects } from "zod";

export const validate =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (ctx: Context, next: Next) => {
    ctx.request.body = schema.parse(ctx.request.body);
    return next();
  };
