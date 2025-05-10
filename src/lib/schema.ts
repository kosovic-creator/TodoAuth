import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

type Schema = z.infer<typeof schema>;

export { schema, type Schema };
