export function find<T extends { id?: number | string }>(
  array: T[],
  entity: T,
) {
  for (let i = 0; i < array.length; i++) {
    // check for id first
    if (array[i].id === entity.id) {
      return i
    }

    // then just find via equality
    if (array[i] === entity) {
      return i
    }
  }
  return -1
}

export function replace<T>(array: T[], entity: T, index?: number): T[] {
  index = index ? index : find(array, entity)
  if (index > -1) {
    return [...array.slice(0, index), entity, ...array.slice(index + 1)]
  }
  return array
}

export function add<T>(array: T[], entity: T): T[] {
  return [...array, entity]
}

export function addByIndex<T>(array: T[], entity: T, index: number): T[] {
  return [...array.slice(0, index), entity, ...array.slice(index)]
}

export function addUnique<T>(array: T[], entity: T): T[] {
  const index = find(array, entity)
  if (index >= 0) {
    return array
  }
  return [...array, entity]
}

export function remove<T>(array: T[], entity: T): T[] {
  const index = find(array, entity)
  if (index > -1) {
    return [...array.slice(0, index), ...array.slice(index + 1)]
  }
  return array
}

export function removeByIndex<T>(array: T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)]
}

export function removeOrReplaceByProperty<
  T extends { [key: string]: any },
  K extends keyof T
>(array: T[], entity: T | undefined, prop: K): [T[], number] {
  if (!entity) {
    return [array, array.length]
  }

  // remove
  if (entity[prop] === false || !entity[prop]) {
    const list = remove(array, entity)
    return [list, list.length]
  }

  // or replace
  const list = replace(array, entity)
  return [list, list.length]
}
