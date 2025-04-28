export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center mt-12 md:mt-16 lg:mt-20 p-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-500 mb-4">
          Welcome to NotesApp
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          A simple and powerful note-taking app for your everyday thoughts.
        </p>
        <a
          href="/create"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-500 transition duration-300"
        >
          Create a New Note
        </a>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              Take Notes
            </h3>
            <p className="text-gray-600">
              Create and organize your notes with ease. Add title and content to
              each note.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              View Notes
            </h3>
            <p className="text-gray-600">
              Browse all your notes and find them easily whenever you need.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              Edit Notes
            </h3>
            <p className="text-gray-600">
              Update and modify your notes whenever needed with just a few
              clicks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
