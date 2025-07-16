
const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-3xl w-full text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Welcome to the URL Shortener App
        </h1>
        <p className="text-lg leading-relaxed tracking-wide">
          This is a secure and efficient platform to create, manage, and share shortened URLs with ease.
          Built with modern technologies and security in mind, our application uses
          <strong> Node.js</strong> and <strong>Express</strong> on the backend, with
          <strong> MongoDB</strong> as the database. User authentication is protected
          using <strong>JWT</strong> (JSON Web Tokens), and passwords are securely hashed
          with <strong>Argon2</strong>.
        </p>
        <p className="mt-4 text-lg leading-relaxed tracking-wide">
          The frontend is developed with <strong>React.js</strong> and utilizes
          <strong> TanStack Router</strong> for seamless routing and navigation.
          Enjoy a clean, responsive user interface where you can register, log in,
          and manage your personalized shortened links.
        </p>
        <p className="mt-4 text-lg leading-relaxed tracking-wide">
          Whether you’re sharing content or tracking your URLs, our full-stack
          solution delivers both high performance and strong data protection.
        </p>
      </div>
    </div>
  );
};

export  {HomePage};
