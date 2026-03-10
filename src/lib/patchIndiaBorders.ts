/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Patches GeoJSON features to ensure India's borders include POK and Aksai Chin
 * per India's official position.
 */
export function patchIndiaBorders(features: any[]) {
  const indiaIdx = features.findIndex(
    (f) => f.properties.ISO_A3 === 'IND' || f.properties.ADM0_A3 === 'IND'
  );

  if (indiaIdx === -1) return features;

  const india = features[indiaIdx];

  // Ensure India's geometry is a MultiPolygon for easy merging
  if (india.geometry.type === 'Polygon') {
    india.geometry.type = 'MultiPolygon';
    india.geometry.coordinates = [india.geometry.coordinates];
  }

  const indicesToRemove: number[] = [];

  features.forEach((f, idx) => {
    if (idx === indiaIdx) return;

    const name = (f.properties.NAME || f.properties.name || '').toLowerCase();
    const adm0_a3 = (f.properties.ADM0_A3 || f.properties.adm0_a3 || '');
    const iso_a3 = (f.properties.ISO_A3 || f.properties.iso_a3 || '');

    // Identify POK or Aksai Chin / Disputed Kashmir features
    const isKashmirDisputed = name.includes('kashmir') || name.includes('jammu');
    const isAzad = name.includes('azad');
    const isAksai = name.includes('aksai');

    const isPOK = (isKashmirDisputed && (adm0_a3 === 'PAK' || iso_a3 === 'PAK')) ||
                  (adm0_a3 === 'PAK' && isAzad) ||
                  (iso_a3 === '-99' && (isKashmirDisputed || isAzad));

    const isAksaiChin = isAksai || (isKashmirDisputed && (adm0_a3 === 'CHN' || iso_a3 === 'CHN'));

    if (isPOK || isAksaiChin) {
      if (f.geometry.type === 'Polygon') {
        india.geometry.coordinates.push(f.geometry.coordinates);
      } else if (f.geometry.type === 'MultiPolygon') {
        india.geometry.coordinates.push(...f.geometry.coordinates);
      }
      indicesToRemove.push(idx);
    }
  });

  return features.filter((_, idx) => !indicesToRemove.includes(idx));
}
