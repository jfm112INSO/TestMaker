import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "test.csv")
    const fileContent = await fs.readFile(filePath, "utf-8")

    const lines = fileContent.trim().split("\n")
    const questions = lines
      .map((line) => {
        // Limpiar la línea de caracteres de retorno de carro
        const cleanLine = line.replace(/\r/g, "")
        const parts = cleanLine.split(";").map((part) => part.trim())

        if (parts.length < 3) return null

        const pregunta = parts[0]
        const correcta = parts[parts.length - 1]
        const opciones = parts.slice(1, -1)

        // Verificar que la respuesta correcta esté entre las opciones
        if (!opciones.includes(correcta)) {
          console.warn(`Warning: Respuesta correcta "${correcta}" no encontrada en opciones:`, opciones)
        }

        return {
          pregunta,
          opciones,
          correcta,
        }
      })
      .filter(Boolean)

    console.log(`Loaded ${questions.length} questions`)
    return NextResponse.json({ questions })
  } catch (error) {
    console.error("Error reading CSV file:", error)
    return NextResponse.json({ questions: [] }, { status: 500 })
  }
}
