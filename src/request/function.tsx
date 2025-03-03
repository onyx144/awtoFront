const getOptionName = (id: string, options: { id: string; name: string }[]): string => {
    const optionsMap = new Map(options.map((option) => [option.id, option.name]));
    return optionsMap.get(id) || id; // Если id не найден, возвращаем сам id
  };
  
  type IdNameObject = { id: string; name: string };
  type DataObject = { [key: string]: any };
  
  const extractIdNamePairs = (obj: DataObject, map: Map<string, string> = new Map()): Map<string, string> => {
      if (Array.isArray(obj)) {
          obj.forEach((item: IdNameObject) => {
              if (item.id && item.name) {
                  map.set(item.id, item.name);
              }
          });
      } else if (typeof obj === "object" && obj !== null) {
          Object.values(obj).forEach(value => extractIdNamePairs(value, map));
      }
      return map;
  };
  const createReverseMap = <K, V>(map: Map<K, V>): Map<V, K> => {
    return new Map([...map.entries()].map(([key, value]) => [value, key]));
  };
  const getNamesByIds = (ids: string[], dataMap: Record<string, string>): string[] => {
    return ids.map(id => dataMap[id] || id);
  };
  const mapToObject = (map: Map<string, string>): Record<string, string> => {
    return Object.fromEntries(map);
  };
  
export { getOptionName , mapToObject, extractIdNamePairs , createReverseMap , getNamesByIds };