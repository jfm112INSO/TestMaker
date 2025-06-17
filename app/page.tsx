"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { BookOpen, Shuffle, Settings, Zap } from "lucide-react"

export default function HomePage() {
  const [mode, setMode] = useState("normal")
  const [questionLimit, setQuestionLimit] = useState("")
  const router = useRouter()

  const startQuiz = () => {
    const params = new URLSearchParams({
      mode,
      limit: questionLimit || "0",
    })
    router.push(`/quiz?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Quiz App</CardTitle>
          <CardDescription>Configura tu examen y pon a prueba tus conocimientos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Modo de examen
            </Label>
            <RadioGroup value={mode} onValueChange={setMode}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal" className="flex-1 cursor-pointer">
                  <div className="font-medium">Modo Normal</div>
                  <div className="text-sm text-muted-foreground">Preguntas en orden secuencial</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <RadioGroupItem value="random" id="random" />
                <Label htmlFor="random" className="flex-1 cursor-pointer">
                  <div className="font-medium flex items-center gap-2">
                    <Shuffle className="w-4 h-4" />
                    Modo Aleatorio
                  </div>
                  <div className="text-sm text-muted-foreground">Preguntas en orden aleatorio</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <RadioGroupItem value="super-random" id="super-random" />
                <Label htmlFor="super-random" className="flex-1 cursor-pointer">
                  <div className="font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      SuperAleatorio
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">Preguntas y opciones aleatorias</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit" className="text-sm font-medium">
              Límite de preguntas (opcional)
            </Label>
            <Input
              id="limit"
              type="number"
              placeholder="Ej: 10 (dejar vacío para todas)"
              value={questionLimit}
              onChange={(e) => setQuestionLimit(e.target.value)}
              min="1"
            />
            <p className="text-xs text-muted-foreground">Deja vacío para incluir todas las preguntas disponibles</p>
          </div>

          <Button onClick={startQuiz} className="w-full" size="lg">
            Comenzar Examen
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
