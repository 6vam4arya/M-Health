import React, { useState } from 'react';
import { Sun, Cloud, CloudSnow, CloudRain, RotateCw, MapPin, ChevronDown } from 'lucide-react';
import { LocationData } from '../types';

interface LocationCardProps {
  location: LocationData;
  availableLocations: LocationData[];
  onSelectLocation: (loc: LocationData) => void;
  onRefreshLocation: () => void;
  isUpdating?: boolean;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  availableLocations,
  onSelectLocation,
  onRefreshLocation,
  isUpdating = false
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const getWeatherIcon = (icon: LocationData['weatherIcon']) => {
    switch (icon) {
      case 'sun':
        return <Sun className="w-5 h-5 text-amber-500 fill-amber-400" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-slate-400 fill-slate-300" />;
      case 'snow':
        return <CloudSnow className="w-5 h-5 text-sky-400 fill-sky-200" />;
      case 'cloud-rain':
        return <CloudRain className="w-5 h-5 text-blue-400" />;
      default:
        return <Sun className="w-5 h-5 text-amber-500" />;
    }
  };

  const getRiskBadgeColor = (risk: LocationData['riskLevel']) => {
    switch (risk) {
      case 'Normal':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Severe':
        return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="relative bg-white rounded-2xl p-4 shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Location Name
          </span>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1.5 text-left group mt-0.5"
          >
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
              {location.name}
            </h2>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform" />
          </button>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-600">
              Altitude: {location.altitudeMeters.toLocaleString()} m
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadgeColor(
                location.riskLevel
              )}`}
            >
              {location.riskLevel}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1.5 bg-amber-50/80 px-2.5 py-1 rounded-xl border border-amber-100">
            {getWeatherIcon(location.weatherIcon)}
            <span className="text-sm font-bold text-slate-700 font-mono">
              {location.temperatureC}°C
            </span>
          </div>

          <button
            onClick={onRefreshLocation}
            disabled={isUpdating}
            className="flex items-center gap-1 text-[11px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 active:scale-95 px-2.5 py-1 rounded-lg border border-sky-100 transition-all"
          >
            <RotateCw className={`w-3 h-3 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>Update</span>
          </button>
        </div>
      </div>

      {/* Dropdown to switch Himalayan locations */}
      {showDropdown && (
        <div className="mt-3 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-medium">
            <span>Select Himalayan Location:</span>
            <span className="text-emerald-600">Live Simulation</span>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {availableLocations.map((loc) => {
              const isSelected = loc.id === location.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    onSelectLocation(loc);
                    setShowDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{loc.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-slate-500">{loc.altitudeMeters}m</span>
                    <span className="text-slate-400">({loc.temperatureC}°C)</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
