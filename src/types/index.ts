

import { z } from 'zod';

const TodoSchema = z.object({
  title: z.string().min(1, 'Naslov je obavezan'),
  priority: z.number().min(1).max(5, 'Prioritet mora biti između 1 i 5'),
  details: z.string().min(5, 'Detalji moraju imati najmanje 5 karaktera'),
  korisnik: z.string().min(1, 'Korisnik je obavezan'),
});

export default TodoSchema;

// type Todo = {
//   id: string;
//   title: string;
//   priority: number;
//   korisnik: string;
//   done: boolean;
//   details?: string; // Added optional 'details' property
// };









  // const GostSchema = z.object({
//     naziv: z.string().min(3, "Ime mora imati najmanje 3 karaktera"),
//     age: z.number().positive("Godine moraju biti pozitivan broj"),
//     email: z.string().email("Neispravan format email adrese"),
//     });
//     type Gost = z.infer<typeof GostSchema>;
//   export default GostSchema; ;

// Definišite Zod šemu za validaciju
// const productSchema = z.object({
//   naziv: z.string().min(4, 'Product naziv is required'),
//   cijena: z
//     .string()
//     .regex(/^\d+(\.\d{1,2})?$/, 'cijena must be a valid number with up to 2 decimal places'),
// });// const GostSchema = z.object({
//     naziv: z.string().min(3, "Ime mora imati najmanje 3 karaktera"),
//     age: z.number().positive("Godine moraju biti pozitivan broj"),
//     email: z.string().email("Neispravan format email adrese"),
//     });
//     type Gost = z.infer<typeof GostSchema>;
//   export default GostSchema; ;

// Definišite Zod šemu za validaciju
// const productSchema = z.object({
//   naziv: z.string().min(4, 'Product naziv is required'),
//   cijena: z
//     .string()
//     .regex(/^\d+(\.\d{1,2})?$/, 'cijena must be a valid number with up to 2 decimal places'),
// });
