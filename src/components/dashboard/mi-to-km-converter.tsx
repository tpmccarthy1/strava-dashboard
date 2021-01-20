import React from 'react';
import { useState } from 'react';

export enum DistanceUnits {
    MILES,
    KILOMETERS,
}

const MiToKmConverter = ({ distanceInMeters }: { distanceInMeters: number }) => {
    const metersToMiles = (meters: number) => meters / 1609.344;
    const [convertedDistance, setConvertedDistance]: [number, Function] = useState(metersToMiles(distanceInMeters));
    const [unit, setUnit]: [DistanceUnits, Function] = useState(DistanceUnits.MILES);
    const conversionFuncMap = new Map<number, any>([
        [DistanceUnits.MILES, () => setConvertedDistance(convertedDistance * 0.6214)],
        [DistanceUnits.KILOMETERS, () => setConvertedDistance(convertedDistance / 0.6214)],
    ]);
    return (
        <div>
            {convertedDistance.toFixed(2)}
            <label>
                <input
                    type="radio"
                    value={DistanceUnits.MILES}
                    checked={unit === +DistanceUnits.MILES}
                    onChange={(e) => {
                        setUnit(DistanceUnits.MILES);
                        conversionFuncMap.get(DistanceUnits.MILES).call();
                    }}
                />
                Miles
            </label>
            <label>
                <input
                    type="radio"
                    value={DistanceUnits.KILOMETERS}
                    checked={unit === +DistanceUnits.KILOMETERS}
                    onChange={(e) => {
                        setUnit(DistanceUnits.KILOMETERS);
                        conversionFuncMap.get(DistanceUnits.KILOMETERS).call();
                    }}
                />
                KM
            </label>
        </div>
    );
};

export default MiToKmConverter;
