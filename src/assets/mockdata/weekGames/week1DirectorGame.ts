export enum Size {
  SMALL = "küçük",
  MEDIUM = "orta",
  LARGE = "büyük",
}

export type ShelfImage = {
  name: string;
  path: string;
};

export interface ShelfItem {
  image: ShelfImage | null;
  size: Size;
  isVisible: boolean;
  coordinates: number[];
  isContainsShelfItem?: boolean;
  isContainsRowItem?: boolean;
  entryPoint?: string;
}

export interface Shelf {
  items: ShelfItem[][];
}

export interface Level {
  directorSays: ShelfItem;
  shelf: Shelf;
}

const images: ShelfImage[] = [
  {
    name: "elmayı",
    path: "Apple",
  },
  {
    name: "arabayı",
    path: "Car",
  },
  {
    name: "ineği",
    path: "Cow",
  },
  {
    name: "ördeği",
    path: "Duck",
  },
  {
    name: "traktörü",
    path: "Tractor",
  },
  {
    name: "kalemi",
    path: "Pencil",
  },
  {
    name: "anahtarı",
    path: "Key",
  },
];

function isRowContainsItem(row: ShelfItem[], item: ShelfItem) {
  if (row.length === 0 || !item.image) return false;
  return row.some(
    (i) => i.image?.path === item.image?.path && i.size === item.size
  );
}

function isShellContainsItem(shelf: Shelf, item: ShelfItem) {
  if (shelf.items.length === 0 || !item.image) return false;
  return shelf.items
    .flat()
    .some((i) => i.image?.path === item.image?.path && i.size === item.size);
}

function generateLevel() {
  const shelf: Shelf = {
    items: [],
  };
  for (let i = 0; i < 4; i++) {
    const row: ShelfItem[] = [];
    for (let j = 0; j < 4; j++) {
      const randomImage = generateRandomImageOrNull();
      const randomSize = generateRandomSize();
      const randomVisible = generateRandomVisible();

      const item: ShelfItem = {
        image: randomImage,
        size: randomSize,
        isVisible: false,
        coordinates: [i, j],
      };

      item.isContainsRowItem = isRowContainsItem(row, item);
      item.isContainsShelfItem = isShellContainsItem(shelf, item);

      if (shelf.items.length === 0 && row.length === 0) {
        row.push({ ...item, isVisible: randomVisible, entryPoint: "if" });
      } else if (
        isShellContainsItem(shelf, item) ||
        isRowContainsItem(row, item)
      ) {
        row.push({ ...item, isVisible: false, entryPoint: "else if 1" });
      } else if (!randomVisible) {
        row.push({ ...item, isVisible: randomVisible, entryPoint: "else if2" });
      } else {
        row.push({ ...item, isVisible: randomVisible, entryPoint: "else" });
      }
    }
    shelf.items.push(row);
  }
  return shelf;
}

function generateRandomImageOrNull() {
  return Math.random() > 0.3
    ? images[Math.floor(Math.random() * images.length)]
    : null;
}

function generateRandomSize() {
  const sizes = Object.values(Size);
  return sizes[Math.floor(Math.random() * sizes.length)];
}

function generateRandomVisible() {
  return Math.random() > 0.3;
}

function createDirectorSays(level: Shelf): ShelfItem {
  const randomSize = generateRandomSize();

  const visibleItems = level.items
    .flat()
    .filter((item) => item.isVisible && item.image !== null);

  return {
    image: visibleItems[Math.floor(Math.random() * visibleItems.length)].image,
    size: randomSize,
    isVisible: true,
    coordinates: [0, 0],
  };
}

function compareSize(a: Size, b: Size) {
  if (a === b) return 0;
  if (a === Size.SMALL) return -1;
  if (a === Size.MEDIUM && b === Size.LARGE) return -1;
  if (a === Size.LARGE) return 1;
  if (a === Size.MEDIUM && b === Size.SMALL) return 1;
  else return 1;
}

function findSmallest(filteredItems: ShelfItem[]) {
  let smallest = filteredItems[0];
  for (let i = 1; i < filteredItems.length; i++) {
    if (compareSize(filteredItems[i].size, smallest.size) === -1) {
      smallest = filteredItems[i];
    }
  }
  return smallest;
}

function findLargest(filteredItems: ShelfItem[]) {
  let largest = filteredItems[0];
  for (let i = 1; i < filteredItems.length; i++) {
    if (compareSize(filteredItems[i].size, largest.size) === 1) {
      largest = filteredItems[i];
    }
  }
  return largest;
}

function findMiddle(filteredItems: ShelfItem[]) {
  const sortedItems = filteredItems.sort((a, b) => compareSize(a.size, b.size));
  return sortedItems[Math.floor(sortedItems.length / 2)];
}

function createAnswer(level: Shelf, directorSays: ShelfItem): number[] {
  let answer: number[] = [];

  const filteredItems = level.items
    .flat()
    .filter(
      (item) => item.image?.path === directorSays.image?.path && item.isVisible
    );

  if (directorSays.size === Size.SMALL) {
    answer = findSmallest(filteredItems).coordinates;
  } else if (directorSays.size === Size.LARGE) {
    answer = findLargest(filteredItems).coordinates;
  } else {
    answer = findMiddle(filteredItems).coordinates;
  }

  return answer;
}

export class DirectorGame {
  levels: Level[] = [];

  constructor(size: number) {
    for (let i = 0; i < size; i++) {
      const level = generateLevel();
      const directorSays = createDirectorSays(level);
      const answer = createAnswer(level, directorSays);
      this.levels.push({
        directorSays: {
          image: directorSays.image,
          size: directorSays.size,
          isVisible: true,
          coordinates: answer,
        },
        shelf: level,
      });
    }
  }

  getLevel(index: number): Level {
    return this.levels[index];
  }
}
