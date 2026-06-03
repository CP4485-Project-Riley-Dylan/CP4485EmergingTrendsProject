export default function Home() {
  return (
    <main className="flex h-screen">

      <div className="w-1/2 bg-[#0d1117] flex flex-col justify-end p-10">
        <p className="text-[#c9d1d9] text-[17px] italic font-light leading-relaxed max-w-md">
          "Take control of your money. Know where every dollar goes"
        </p>
      </div>

      <div className="w-1/2 bg-[#f5f5f7] flex items-center justify-center p-10">
        <div className="w-full max-w-sm">
          <h1 className="text-[28px] font-semibold text-[#0d1117] tracking-tight mb-2">
            Welcome back
          </h1>
          <h5 className="text-[13.5px] font-normal text-[#6e7681] leading-relaxed mb-7">
            Sign in to your account to continue tracking your finances.
          </h5>
          <button className="w-full py-2.5 px-4 bg-white border border-[#d0d7de] rounded-lg text-[14px] font-medium text-[#24292f] flex items-center justify-center gap-2.5 hover:border-[#b0b8c0] transition-colors">
            Continue with Google
          </button>
        </div>
      </div>

    </main>
  );
}