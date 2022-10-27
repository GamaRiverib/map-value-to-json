// @ts-check

/**
 * @typedef {object} MapValue
 * @property {Object.<string, Value>} fields
 */

/**
 * @typedef {object} LatLng
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {object} ArrayValue
 * @property {Value[]} values
 */

/**
 * @typedef {object} Value
 * @property {null} [nullValue]
 * @property {boolean} [booleanValue]
 * @property {string} [integerValue]
 * @property {number} [doubleValue]
 * @property {string} [timestampValue]
 * @property {string} [stringValue]
 * @property {string} [bytesValue]
 * @property {string} [referenceValue]
 * @property {LatLng} [geoPointValue]
 * @property {ArrayValue} [arrayValue]
 * @property {MapValue} [mapValue]
 */

/**
 * Extract the value from an object of type Value.
 * @param {Value} value 
 * @returns {any}
 */
 const getValue = (value) => {
  const k = Object.keys(value)[0];
  const v = value[k];
  switch (k) {
    case "booleanValue":
    case "doubleValue":
    case "stringValue":
    case "referenceValue":
    case "geoPointValue":
      return v;
    case "arrayValue":
      if (Array.isArray(v.values)) {
        return v.values.map((/** @type {Value} */ x) => getValue(x));
      }
      return [];
    case "nullValue":
      return null;
    case "integerValue":
      return parseInt(v);
    case "mapValue":
      return mapValueToJson(v);
    case "bytesValue":
      const buffer = Buffer.from(v, "base64");
      return buffer.toString("ascii");
  }

  return value[k];
}

/**
 * Converts an object of type MapValue to JSON.
 * @param {MapValue} map
 */
 const mapValueToJson = (map) => {
  const json = {};
  if (map && Object.keys(map).length) {
    const keys = Object.keys(map.fields);
    keys.forEach((key) => {
      const field = map.fields[key];
      json[key] = getValue(field);
    });
  }
  return json;
};

module.exports = {
  mapValueToJson,
  getValue
};