
import { z } from 'zod';
const usersSchema = z.object({
  name: z.string().min(1, 'Ime  je obavezano'),
  email: z.string().min(1, 'Email je obavezo polje'),
  password: z.string().min(3, 'Pasword moraj imati najmanje 5 karaktera'),
  role: z.string().min(1, 'Role je obavezan'),
});
export default usersSchema;