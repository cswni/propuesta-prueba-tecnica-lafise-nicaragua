import React from 'react';
import { cn } from '@/lib/utils';
import { Wrench, Clock, Sparkles } from 'lucide-react';

interface WorkingProgressProps {
  title?: string;
  description?: string;
  className?: string;
}

const WorkingProgress: React.FC<WorkingProgressProps> = ({
  title = 'En Desarrollo',
  description = 'Estamos trabajando para traerte esta funcionalidad pronto.',
  className,
}) => {
  return (
    <div
      className={cn(
        'min-h-screen w-full flex items-center justify-center p-2 sm:p-4 overflow-y-auto max-h-screen',
        className
      )}
    >
      <div className="w-full max-w-md sm:max-w-2xl mx-auto text-center">
        {/* Animated Logo Container */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-md blur-xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white rounded-md p-4 sm:p-10 border border-slate-200">
            <img
              src="/src/assets/images/logo-lafise.svg"
              alt="Lafise Logo"
              className="w-32 h-16 sm:w-48 sm:h-24 mx-auto"
            />
          </div>

          {/* Floating Icons */}
          <div
            className="absolute -top-4 -right-4 bg-blue-500 text-white p-2 sm:p-3 rounded-full shadow-lg"
            style={{ animationDelay: '0.5s' }}
          >
            <Wrench className="w-6 h-6" />
          </div>
          <div
            className="absolute -bottom-4 -left-4 bg-green-500 text-white p-2 sm:p-3 rounded-full shadow-lg"
            style={{ animationDelay: '1s' }}
          >
            <Clock className="w-6 h-6" />
          </div>
          <div className="absolute top-1-right-8 bg-yellow-500 text-white p-2 rounded-full shadow-lg animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-base sm:text-xl text-slate-600 md:mx-auto leading-relaxed min-h-24">
              {description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs sm:max-w-md mx-auto">
            <div className="bg-slate-200 h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full animate-pulse"
                style={{ width: '55%' }}
              ></div>
            </div>
            <p className="text-sm text-slate-500 mt-2">Progreso: 75%</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200 transition-shadow">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800">En Desarrollo</h3>
              <p className="text-sm text-slate-600">Trabajando activamente</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200 transition-shadow">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Próximamente</h3>
              <p className="text-sm text-slate-600">Lanzamiento cercano</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200 transition-shadow">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-4 h-4 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Innovación</h3>
              <p className="text-sm text-slate-600">Nuevas funcionalidades</p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-[var(--green)] to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingProgress;
