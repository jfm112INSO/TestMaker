"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, RotateCcw, Home, Zap } from "lucide-react"

interface Question {
  pregunta: string
  opciones: string[]
  correcta: string
}

export default function QuizPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const [loading, setLoading] = useState(true)

  const mode = searchParams.get("mode") || "normal"
  const limit = Number.parseInt(searchParams.get("limit") || "0")

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const loadQuestions = useCallback(async () => {
    try {
      const response = await fetch("/api/questions")
      const data = await response.json()

      let processedQuestions = data.questions

      // Mezclar preguntas si es modo aleatorio o super aleatorio
      if (mode === "random" || mode === "super-random") {
        processedQuestions = shuffleArray(processedQuestions)
      }

      // Si es modo super aleatorio, también mezclar las opciones de cada pregunta
      if (mode === "super-random") {
        processedQuestions = processedQuestions.map((question: Question) => ({
          ...question,
          opciones: shuffleArray(question.opciones),
        }))
      }

      if (limit > 0) {
        processedQuestions = processedQuestions.slice(0, limit)
      }

      setQuestions(processedQuestions)
      setLoading(false)
    } catch (error) {
      console.error("Error loading questions:", error)
      setLoading(false)
    }
  }, [mode, limit, shuffleArray])

  useEffect(() => {
    loadQuestions()
  }, [loadQuestions])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleContinue = () => {
    if (!selectedAnswer) return

    const currentCorrectAnswer = questions[currentQuestionIndex].correcta

    // Debug logs
    console.log("Selected answer:", `"${selectedAnswer}"`)
    console.log("Correct answer:", `"${currentCorrectAnswer}"`)
    console.log("Are they equal?", selectedAnswer === currentCorrectAnswer)
    console.log("Available options:", questions[currentQuestionIndex].opciones)

    const isCorrect = selectedAnswer === currentCorrectAnswer
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setShowResult(false)
    } else {
      setIsFinished(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setIsFinished(false)
    loadQuestions()
  }

  const goHome = () => {
    router.push("/")
  }

  const getModeDisplay = () => {
    switch (mode) {
      case "random":
        return "Aleatorio"
      case "super-random":
        return "SuperAleatorio"
      default:
        return "Normal"
    }
  }

  const getModeIcon = () => {
    if (mode === "super-random") {
      return <Zap className="w-4 h-4 text-purple-500" />
    }
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando preguntas...</p>
          {mode === "super-random" && (
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">Mezclando preguntas y opciones...</p>
          )}
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error al cargar preguntas</h2>
            <p className="text-muted-foreground mb-4">
              No se pudo cargar el archivo test.csv o no contiene preguntas válidas.
            </p>
            <Button onClick={goHome}>
              <Home className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold">¡Examen Completado!</CardTitle>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
              {getModeIcon()}
              <span>Modo: {getModeDisplay()}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {score}/{questions.length}
              </div>
              <div className="text-lg text-muted-foreground">{percentage}% de aciertos</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso</span>
                <span>{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>

            <div className="flex gap-2">
              <Button onClick={resetQuiz} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Repetir
              </Button>
              <Button onClick={goHome} className="flex-1">
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </CardTitle>
              {mode === "super-random" && (
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <Zap className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">SuperAleatorio</span>
                </div>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Puntuación: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-xl font-medium leading-relaxed">{currentQuestion.pregunta}</div>

          {!showResult ? (
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
              <div className="space-y-3">
                {currentQuestion.opciones.map((opcion, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => handleAnswerSelect(opcion)}
                  >
                    <RadioGroupItem value={opcion} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {opcion}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                {currentQuestion.opciones.map((opcion, index) => {
                  const isSelected = opcion === selectedAnswer
                  const isCorrect = opcion === currentQuestion.correcta

                  let className = "flex items-center space-x-3 p-4 border rounded-lg "

                  if (isCorrect) {
                    className += "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                  } else if (isSelected && !isCorrect) {
                    className += "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  } else {
                    className += "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }

                  return (
                    <div key={index} className={className}>
                      <div className="w-6 h-6 flex items-center justify-center">
                        {isCorrect && <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
                      </div>
                      <div className={`flex-1 ${isCorrect ? "font-semibold text-green-700 dark:text-green-300" : ""}`}>
                        {opcion}
                      </div>
                      {isCorrect && (
                        <div className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-1 rounded-full font-medium">
                          Correcta
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                {selectedAnswer === currentQuestion.correcta ? (
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    ¡Correcto! 🎉
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-medium">
                      <XCircle className="w-5 h-5" />
                      Respuesta incorrecta
                    </div>
                    <div className="text-sm text-muted-foreground">
                      La respuesta correcta está marcada en verde arriba
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            {!showResult ? (
              <Button onClick={handleContinue} disabled={!selectedAnswer} className="px-8">
                Continuar
              </Button>
            ) : (
              <Button onClick={handleNext} className="px-8">
                {currentQuestionIndex < questions.length - 1 ? "Siguiente" : "Finalizar"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
