export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-black mb-8">Welcome Back</h1>

        <input
          placeholder="Email"
          className="w-full mb-4 p-4 rounded-2xl bg-white/5 border border-white/10"
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full mb-6 p-4 rounded-2xl bg-white/5 border border-white/10"
        />

        <button className="luxury-btn w-full">Login</button>
      </div>
    </main>
  );
}
