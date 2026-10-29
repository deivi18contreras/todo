import {
    crearLecturaPrincipal,
    crearLecturaDiaria,
    obtenerLecturaPorId,
    ObtenerLecturasUsuario
} from '../models/lecturasModel.js';
import { GoogleGenAI } from "@google/genai";

const IA = new GoogleGenAI({
  apiKey: "AIzaSyA_rHu7UFfYaHVOb2poMGZZ024D9to1LPg"
});

async function LecturaGeneradaIA() {
  const prompt = `
    Genera una lectura numerológica completa y profunda basada en la fecha de nacimiento 1990-04-22.
    Incluye personalidad, propósito de vida y energía espiritual del usuario.
    Estilo místico e inspirador.
  `;

  const response = await IA.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log(response.text());
}

function reducirNumero(num){
  if (num === 11 || num=== 22) return num;

  let numero = num.toString().split('').map(n => parseInt(n))
  let suma = numero.reduce((a,b)=>a + b);
  
  
  return suma
}

export async function calcularCaminoVida(fecha_nacimiento){
const fecha = new Date(fecha_nacimiento);

const year = fecha.getFullYear();
const mount = fecha.getMonth()+1;
const day = fecha.getDate();

const año = reducirNumero(year);
const mes = reducirNumero(mount);
const dia = reducirNumero(day);

const total = año + mes + dia

const caminoVida = reducirNumero(total);
console.log(caminoVida);

 
return caminoVida


}


export async function postLecturaPrincipal(req, res) {
  try {
    const {usuario_id} = req.params;
    const lecturaPrincipal = await crearLecturaPrincipal(usuario_id);
    
    if (!lecturaPrincipal.usuario_id) return res.status(404).json({error: 'Usuario no encontrado, verifica si existe'});

  const camino = calcularCaminoVida(lecturaPrincipal.usuario.fecha_nacimiento);
      
  const prompt = `
Actúa como un experto profesional en numerología pitagórica.
Recibirás un número ya calculado desde mi backend, correspondiente al Camino de Vida de una persona.
Tu tarea es generar una Lectura Principal completa, profunda, coherente y personalizada según el número recibido.
La lectura debe incluir:
Significado general del número en numerología pitagórica.
Rasgos principales de personalidad asociados al número.
Potencial espiritual o interno.
Fortalezas principales.
Retos, sombras o aprendizajes del número.
Consejos prácticos aplicables a la vida diaria.
No hables de la fórmula ni del cálculo ni mucho menos que eres IA, solo interpreta el número que te envío.

Cuando yo te envíe:
Número: ${camino}
Debes responder únicamente con la lectura completa para ese número.
  `

  const lecturaGenerada = LecturaGeneradaIA(prompt);
  res.json({
    nombre: lecturaPrincipal.usuario.nombre,
    LecturaPrincipal: lecturaGenerada
  })

  } catch (error) {
    res.status(500).json({ error: 'Error al generar Lectura' });
  }
}

export async function postLectura(req, res) {
  try {
     const {usuario_id} = req.params;
  const lecturaDiaria = await crearLecturaDiaria(usuario_id);
  
      if (!lecturaDiaria.usuario_id) return res.status(404).json({error: 'Usuario no encontrado, verifica si existe'});

      const camino = calcularCaminoVida(lecturaDiaria.usuario.fecha_nacimiento);
   
  
  const prompt = `
  Quiero que generes una lectura diaria breve pero profunda, inspirada en numerología y crecimiento personal, adaptada a la energía específica de la fecha que te daré.
La lectura debe ser:
Diferente cada día (no repitas estructura ni contenido).
Concisa (8–12 líneas).
Con tono motivador, reflexivo y espiritual, pero sin frases genéricas.
Incluye:
Energía numerológica del día (reduce la fecha y explícalo brevemente).
Un mensaje central de enfoque.
Un recordatorio emocional (disciplina, calma, enfoque, amor propio, etc.).
Una acción del día (algo concreto y aplicable).
No menciones “soy una IA”.
No uses lenguaje exagerado ni místico extremo: que suene profesional, claro y humano.
Al final, dame un resumen de 5 palabras clave del día.
La fecha que quiero analizar es: ${camino}
  `

  const lecturaGenerada = LecturaGeneradaIA(prompt);
   res.json({
    nombre: lecturaDiaria.usuario.nombre,
    LecturaPrincipal: lecturaGenerada
  })
  } catch (error) {
     res.status(500).json({ error: 'Error al generar Lectura' });
  }
}

export async function getLecturas(req, res) {
     try {
           const lecturas = await obtenerLecturaPorId(req.params.id);
           if (!lecturas) return res.status(404).json({ error: 'lectura no encontrado' });
           res.json(lecturas);
       } catch (error) {
           res.status(500).json({ error: 'Error al obtener usuario' });
       }
}

export async function getLectura(req, res) {
    try {
          const lecturaUsuario = await obtenerUsuarioPorId(req.params.usuario_id);
          if (!lecturaUsuario) return res.status(404).json({ error: 'Usuario no encontrado para mirar sus lecturas' });
          res.json(lecturaUsuario);
      } catch (error) {
          res.status(500).json({ error: 'Error al obtener usuario' });
      }
}