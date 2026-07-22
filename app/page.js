import { signInWithGoogle } from '@/lib/actions';

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">

      <div className="w-full md:w-1/2 bg-[#0d1117] flex flex-col justify-end p-6 md:p-10">
        <p className="text-[#c9d1d9] text-base sm:text-lg italic font-light leading-relaxed max-w-lg">
          "Take control of your money. Know where every dollar goes"
        </p>
      </div>

      <div className="w-full md:w-1/2 bg-[#f5f5f7] flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#0d1117] tracking-tight mb-3">
            Welcome back
          </h1>
          <h5 className="text-sm sm:text-base font-normal text-[#6e7681] leading-relaxed mb-8">
            Sign in to your account to continue tracking your finances.
          </h5>
          <form action={signInWithGoogle}>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-white border border-[#d0d7de] rounded-xl text-sm sm:text-base font-medium text-[#24292f] flex items-center justify-center gap-2.5 hover:border-[#b0b8c0] transition-colors"
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>

    </main>
  );
}