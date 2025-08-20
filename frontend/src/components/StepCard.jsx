import React from 'react';
import { CheckCircle, ArrowRight } from "lucide-react";

const StepCard = ({ step, index, isActive, onHover, onIconClick }) => {
  const IconComponent = step.icon;

  return (
    <div
      className={`relative p-8 rounded-2xl transition-all duration-700 transform hover:-translate-y-4 ${
        isActive
          ? 'bg-white dark:bg-slate-800 shadow-2xl scale-105'
          : 'bg-white/50 dark:bg-slate-800/50 shadow-lg hover:shadow-xl'
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(-1)}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Icon */}
      <div className="mb-6 flex justify-center">
        {onIconClick ? (
          <button
            onClick={onIconClick}
            className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bgColor} shadow-lg flex items-center justify-center transform transition-all duration-500 ${
              isActive ? 'scale-110 rotate-3' : ''
            }`}
            aria-label={step.title}
            type="button"
          >
            <IconComponent className="w-10 h-10 text-white" />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl blur-xl opacity-50 ${
                isActive ? 'opacity-75' : 'opacity-0'
              } transition-opacity duration-500`}
            />
          </button>
        ) : (
          <div
            className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bgColor} shadow-lg flex items-center justify-center transform transition-all duration-500 ${
              isActive ? 'scale-110 rotate-3' : ''
            }`}
          >
            <IconComponent className="w-10 h-10 text-white" />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl blur-xl opacity-50 ${
                isActive ? 'opacity-75' : 'opacity-0'
              } transition-opacity duration-500`}
            />
          </div>
        )}
      </div>

      {/* Step Number */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-white dark:to-gray-200 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg">
        <span className="text-white dark:text-gray-800 font-bold text-lg">{index + 1}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {step.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {step.description}
        </p>

        <div className="space-y-2">
          {step.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onIconClick) onIconClick();
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && onIconClick) {
            e.preventDefault();
            onIconClick();
          }
        }}
        aria-label={onIconClick ? `Go to ${step.title}` : undefined}
        className={`absolute bottom-6 right-6 w-10 h-10 bg-gradient-to-r ${step.bgColor} rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        } ${onIconClick ? 'cursor-pointer' : 'cursor-default'} z-20`}
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default StepCard;
