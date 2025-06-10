// Mock data for products
export const getProductList = (priceListType = 'LGRAL') => {
  const baseProducts = [
    { reference: 'R91.5', model: 'R13', bundles: 10, weightPerUnit: 1.7 },
    { reference: 'C91.5', model: 'C43', bundles: 10, weightPerUnit: 1.7 },
    { reference: 'MIX91.5', model: 'RC33', bundles: 10, weightPerUnit: 1.7 },
    { reference: 'R1.05', model: 'R23.5', bundles: 10, weightPerUnit: 2 },
    { reference: 'C1.05', model: 'C53.5', bundles: 10, weightPerUnit: 2 },
    { reference: 'MIX1.05', model: 'RC33.5', bundles: 10, weightPerUnit: 2 },
    { reference: 'R1.22', model: 'R24', bundles: 10, weightPerUnit: 2.3 },
    { reference: 'C1.22', model: 'C54', bundles: 10, weightPerUnit: 2.3 },
    { reference: 'MIX1.22', model: 'RC34', bundles: 10, weightPerUnit: 2.3 },
    { reference: 'R1.83', model: 'R36', bundles: 10, weightPerUnit: 3.4 },
    { reference: 'R1.83A', model: 'R36-A', bundles: 10, weightPerUnit: 3.4 },
    { reference: 'C1.83', model: 'C86', bundles: 10, weightPerUnit: 3.4 },
    { reference: 'MIX1.83', model: 'CR56', bundles: 10, weightPerUnit: 3.4 },
    { reference: 'R2', model: 'R46.5', bundles: 10, weightPerUnit: 3.8 },
    { reference: 'C2', model: 'C96.5', bundles: 10, weightPerUnit: 3.8 },
    { reference: 'MIX2', model: 'RC56.5', bundles: 10, weightPerUnit: 3.8 },
    { reference: 'R2.44', model: 'R58', bundles: 10, weightPerUnit: 4.6 },
    { reference: 'C2.44', model: 'C118', bundles: 10, weightPerUnit: 4.6 },
    { reference: 'MIX2.44', model: 'RC78', bundles: 10, weightPerUnit: 4.6 },
    { reference: 'R3.05', model: 'R610', bundles: 10, weightPerUnit: 5.7 },
    { reference: 'C3.05', model: 'C1410', bundles: 10, weightPerUnit: 5.7 },
    { reference: 'MIX3.05', model: 'RC910', bundles: 10, weightPerUnit: 5.7 }
  ];

  const priceLists = {
    LGRAL: {
      'R13': { priceBlack: 1.00, priceGreen: 119.00 },
      'C43': { priceBlack: 1.00, priceGreen: 120.00 },
      'RC33': { priceBlack: 1.00, priceGreen: 120.00 },
      'R23.5': { priceBlack: 1.00, priceGreen: 140.00 },
      'C53.5': { priceBlack: 1.00, priceGreen: 141.00 },
      'RC33.5': { priceBlack: 1.00, priceGreen: 141.00 },
      'R24': { priceBlack: 1.00, priceGreen: 161.00 },
      'C54': { priceBlack: 1.00, priceGreen: 162.00 },
      'RC34': { priceBlack: 1.00, priceGreen: 162.00 },
      'R36': { priceBlack: 1.00, priceGreen: 238.00 },
      'R36-A': { priceBlack: 1.00, priceGreen: 238.00 },
      'C86': { priceBlack: 1.00, priceGreen: 239.00 },
      'CR56': { priceBlack: 1.00, priceGreen: 239.00 },
      'R46.5': { priceBlack: 1.00, priceGreen: 266.00 },
      'C96.5': { priceBlack: 1.00, priceGreen: 267.00 },
      'RC56.5': { priceBlack: 1.00, priceGreen: 267.00 },
      'R58': { priceBlack: 1.00, priceGreen: 322.00 },
      'C118': { priceBlack: 1.00, priceGreen: 323.00 },
      'RC78': { priceBlack: 1.00, priceGreen: 323.00 },
      'R610': { priceBlack: 1.00, priceGreen: 399.00 },
      'C1410': { priceBlack: 1.00, priceGreen: 400.00 },
      'RC910': { priceBlack: 1.00, priceGreen: 400.00 }
    },
    LLAM: {
      'R13': { priceBlack: 1.00, priceGreen: 102.69 },
      'C43': { priceBlack: 1.00, priceGreen: 112.05 },
      'RC33': { priceBlack: 1.00, priceGreen: 112.05 },
      'R23.5': { priceBlack: 1.00, priceGreen: 121.01 },
      'C53.5': { priceBlack: 1.00, priceGreen: 131.98 },
      'RC33.5': { priceBlack: 1.00, priceGreen: 131.98 },
      'R24': { priceBlack: 1.00, priceGreen: 139.31 },
      'C54': { priceBlack: 1.00, priceGreen: 151.93 },
      'RC34': { priceBlack: 1.00, priceGreen: 151.93 },
      'R36': { priceBlack: 1.00, priceGreen: 206.38 },
      'R36-A': { priceBlack: 1.00, priceGreen: 206.38 },
      'C86': { priceBlack: 1.00, priceGreen: 226.01 },
      'CR56': { priceBlack: 1.00, priceGreen: 226.01 },
      'R46.5': { priceBlack: 1.00, priceGreen: 230.76 },
      'C96.5': { priceBlack: 1.00, priceGreen: 251.62 },
      'RC56.5': { priceBlack: 1.00, priceGreen: 251.62 },
      'R58': { priceBlack: 1.00, priceGreen: 279.55 },
      'C118': { priceBlack: 1.00, priceGreen: 304.80 },
      'RC78': { priceBlack: 1.00, priceGreen: 304.80 },
      'R610': { priceBlack: 1.00, priceGreen: 346.63 },
      'C1410': { priceBlack: 1.00, priceGreen: 377.92 },
      'RC910': { priceBlack: 1.00, priceGreen: 377.92 }
    },
    LAR: {
      'R13': { priceBlack: 1.00, priceGreen: 96.88 },
      'C43': { priceBlack: 1.00, priceGreen: 105.71 },
      'RC33': { priceBlack: 1.00, priceGreen: 105.71 },
      'R23.5': { priceBlack: 1.00, priceGreen: 114.16 },
      'C53.5': { priceBlack: 1.00, priceGreen: 124.51 },
      'RC33.5': { priceBlack: 1.00, priceGreen: 124.51 },
      'R24': { priceBlack: 1.00, priceGreen: 131.42 },
      'C54': { priceBlack: 1.00, priceGreen: 143.33 },
      'RC34': { priceBlack: 1.00, priceGreen: 143.33 },
      'R36': { priceBlack: 1.00, priceGreen: 194.70 },
      'R36-A': { priceBlack: 1.00, priceGreen: 194.70 },
      'C86': { priceBlack: 1.00, priceGreen: 213.22 },
      'CR56': { priceBlack: 1.00, priceGreen: 213.22 },
      'R46.5': { priceBlack: 1.00, priceGreen: 217.70 },
      'C96.5': { priceBlack: 1.00, priceGreen: 237.38 },
      'RC56.5': { priceBlack: 1.00, priceGreen: 237.38 },
      'R58': { priceBlack: 1.00, priceGreen: 263.73 },
      'C118': { priceBlack: 1.00, priceGreen: 287.55 },
      'RC78': { priceBlack: 1.00, priceGreen: 287.55 },
      'R610': { priceBlack: 1.00, priceGreen: 327.01 },
      'C1410': { priceBlack: 1.00, priceGreen: 356.53 },
      'RC910': { priceBlack: 1.00, priceGreen: 356.53 }
    },
    LRECU: {
      'R13': { priceBlack: 1.00, priceGreen: 94.99 },
      'C43': { priceBlack: 1.00, priceGreen: 103.64 },
      'RC33': { priceBlack: 1.00, priceGreen: 103.64 },
      'R23.5': { priceBlack: 1.00, priceGreen: 111.93 },
      'C53.5': { priceBlack: 1.00, priceGreen: 122.07 },
      'RC33.5': { priceBlack: 1.00, priceGreen: 122.07 },
      'R24': { priceBlack: 1.00, priceGreen: 128.85 },
      'C54': { priceBlack: 1.00, priceGreen: 140.52 },
      'RC34': { priceBlack: 1.00, priceGreen: 140.52 },
      'R36': { priceBlack: 1.00, priceGreen: 190.89 },
      'R36-A': { priceBlack: 1.00, priceGreen: 190.89 },
      'C86': { priceBlack: 1.00, priceGreen: 209.04 },
      'CR56': { priceBlack: 1.00, priceGreen: 209.04 },
      'R46.5': { priceBlack: 1.00, priceGreen: 213.44 },
      'C96.5': { priceBlack: 1.00, priceGreen: 232.73 },
      'RC56.5': { priceBlack: 1.00, priceGreen: 232.73 },
      'R58': { priceBlack: 1.00, priceGreen: 258.56 },
      'C118': { priceBlack: 1.00, priceGreen: 281.92 },
      'RC78': { priceBlack: 1.00, priceGreen: 281.92 },
      'R610': { priceBlack: 1.00, priceGreen: 320.60 },
      'C1410': { priceBlack: 1.00, priceGreen: 349.54 },
      'RC910': { priceBlack: 1.00, priceGreen: 349.54 }
    }
  };

  const selectedPriceList = priceLists[priceListType] || priceLists.LGRAL;

  return baseProducts.map(product => ({
    ...product,
    priceGreen: selectedPriceList[product.model]?.priceGreen || 0,
    priceBlack: selectedPriceList[product.model]?.priceBlack || 0
  }));
};

export default {
  getProductList
};

// DONE