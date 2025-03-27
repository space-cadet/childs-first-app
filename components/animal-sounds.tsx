"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Volume2 } from "lucide-react"

interface Animal {
  name: string
  image: string
  sound: string
  soundWord: string
  color: string
}

const animals: Animal[] = [
  {
    name: "Dog",
    image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=200&h=200&fit=crop",
    sound: "bark",
    soundWord: "Woof! Woof!",
    color: "bg-red-200 hover:bg-red-300",
  },
  {
    name: "Cat",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop",
    sound: "meow",
    soundWord: "Meow! Meow!",
    color: "bg-blue-200 hover:bg-blue-300",
  },
  {
    name: "Cow",
    image: "https://images.unsplash.com/photo-1535435734705-4f0f32e27c83?w=200&h=200&fit=crop",
    sound: "moo",
    soundWord: "Moo! Moo!",
    color: "bg-green-200 hover:bg-green-300",
  },
  {
    name: "Duck",
    image: "https://cdn.pixabay.com/photo/2017/02/28/14/37/duck-2105668_640.jpg",
    sound: "quack",
    soundWord: "Quack! Quack!",
    color: "bg-yellow-200 hover:bg-yellow-300",
  },
  {
    name: "Sheep",
    image: "https://images.unsplash.com/photo-1533415648777-407b626eb0fa?w=200&h=200&fit=crop&auto=format",
    sound: "baa",
    soundWord: "Baa! Baa!",
    color: "bg-purple-200 hover:bg-purple-300",
  },
  {
    name: "Horse",
    image: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?w=200&h=200&fit=crop",
    sound: "neigh",
    soundWord: "Neigh! Neigh!",
    color: "bg-pink-200 hover:bg-pink-300",
  },
]

// Create a speech synthesis function
const speakText = (text: string) => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9 // Slightly slower rate for clarity
    utterance.pitch = 1.2 // Slightly higher pitch for animal sounds
    window.speechSynthesis.speak(utterance)
    return true
  }
  return false
}

export default function AnimalSounds() {
  const [activeSound, setActiveSound] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [speechSupported, setSpeechSupported] = useState<boolean>(false)

  // Check if speech synthesis is supported
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSupported(true)
    }
  }, [])

  const playSound = (animal: Animal) => {
    setActiveSound(animal.soundWord)
    setIsPlaying(animal.name)

    // Use speech synthesis to "speak" the animal sound
    if (speechSupported) {
      speakText(animal.sound)
    }

    // Reset the active sound after 2 seconds
    setTimeout(() => {
      setActiveSound(null)
      setIsPlaying(null)
    }, 2000)
  }

  return (
    <>
      {!speechSupported && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
          <p className="font-bold">Note:</p>
          <p>
            Speech synthesis is not supported in your browser. You'll see the animal sounds as text, but won't hear
            them.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <motion.div key={animal.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card
              className={`overflow-hidden cursor-pointer ${animal.color} transition-colors duration-300 shadow-lg`}
              onClick={() => playSound(animal)}
            >
              <div className="p-4 flex flex-col items-center">
                <div className="w-40 h-40 relative mb-4">
                  <img
                    src={animal.image || "/placeholder.svg"}
                    alt={animal.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {isPlaying === animal.name && (
                    <motion.div
                      className="absolute top-2 right-2 bg-white rounded-full p-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    >
                      <Volume2 className="h-6 w-6 text-purple-600" />
                    </motion.div>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-center mb-2">{animal.name}</h2>

                {activeSound === animal.soundWord && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 p-3 bg-white rounded-full shadow-md"
                  >
                    <p className="text-xl font-bold text-center">{animal.soundWord}</p>
                  </motion.div>
                )}

                <Button
                  className="mt-4 text-xl py-6 px-8 rounded-full bg-white text-black hover:bg-gray-100 border-2 border-gray-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    playSound(animal)
                  }}
                >
                  Make Sound!
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  )
}

