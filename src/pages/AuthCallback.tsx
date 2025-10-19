import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  useEffect(() => {
    // Supabase gère automatiquement le callback via onAuthStateChange
    // On redirige simplement vers la racine qui gérera l'auth
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-purple-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Vérification en cours...
        </h2>
        <p className="text-white/60">
          Redirection vers votre dashboard
        </p>
      </div>
    </div>
  );
}