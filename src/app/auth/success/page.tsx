import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function AuthSuccessPage() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-stone-50 dark:bg-stone-900/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850 rounded-3xl p-8 sm:p-10 shadow-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Email Verified Successfully!
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
            Thank you for verifying your email. Your AaharSetu account is now fully active and you are securely signed in.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3.5 px-4 transition-all duration-300"
          >
            Continue to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
