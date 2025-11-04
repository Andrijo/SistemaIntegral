/*
  storage-local.js
  Helper simple para usar localStorage como "stores" tipo mapa { id: entity }
  Expone global `StorageLocal` con métodos CRUD.

  Uso:
    StorageLocal.upsert('users', { id: 'user_1', name: 'Edson' })
    StorageLocal.getAllArray('users') // -> [ ... ]
    StorageLocal.delete('users', 'user_1')
*/
(function (global) {
  const LS_PREFIX = 'si:';

  function lsKey(store) {
    return LS_PREFIX + store;
  }

  function getAllMap(store) {
    const raw = localStorage.getItem(lsKey(store));
    return raw ? JSON.parse(raw) : {};
  }

  function saveAll(store, map) {
    localStorage.setItem(lsKey(store), JSON.stringify(map));
  }

  function getById(store, id) {
    const map = getAllMap(store);
    return map[id] || null;
  }

  function upsert(store, entity) {
    if (!entity) throw new Error('entity is required');
    if (!entity.id) entity.id = generateId(store);
    const map = getAllMap(store);
    map[entity.id] = entity;
    saveAll(store, map);
    return entity;
  }

  function remove(store, id) {
    const map = getAllMap(store);
    if (map[id]) {
      delete map[id];
      saveAll(store, map);
      return true;
    }
    return false;
  }

  function getAllArray(store) {
    return Object.values(getAllMap(store));
  }

  function clearStore(store) {
    localStorage.removeItem(lsKey(store));
  }

  function generateId(prefix = 'id') {
    // simple unique id: prefix + timestamp + random
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,9)}`;
  }

  global.StorageLocal = {
    getAllMap,
    saveAll,
    getById,
    upsert,
    delete: remove,
    getAllArray,
    clearStore,
    generateId,
  };
})(window);
