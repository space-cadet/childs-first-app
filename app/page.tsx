import AnimalSounds from "@/components/animal-sounds"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-purple-600 my-8">Animal Sounds!</h1>
        <AnimalSounds />
      </div>
    </main>
  )
}

