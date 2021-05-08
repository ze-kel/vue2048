import b from "../../src/helpers/boardProcessing";

const X = b.EMPTY_CELL;

describe("Basic Gravity", () => {
  it("Gravity works for moving stuff", () => {
    const initial = [X, "4", X, "8"];
    const expected = ["4", "8", X, X];

    expect(b.gravity(initial)).toStrictEqual(expected);
  });
  it("Gravity works merging stuff", () => {
    const initial = ["4", "4", "8", "8"];
    const expected = ["8", "16", X, X];

    expect(b.gravity(initial)).toStrictEqual(expected);
  });
  it("Gravity works moving and merging", () => {
    const initial = ["4", X, X, "4", "2", "16", X, "16"];
    const expected = ["8", "2", "32", X, X, X, X, X];

    expect(b.gravity(initial)).toStrictEqual(expected);
  });
  it("Gravity works when merging several adjacent", () => {
    const initial = ["4", X, X, "4", "2", "16", "16", "16"];
    const expected = ["8", "2", "32", "16", X, X, X, X];

    expect(b.gravity(initial)).toStrictEqual(expected);
  });
});

describe("Moves", () => {
  it("Moves left correctly", () => {
    const initial = [
      [X, "2", "2", X],
      [X, "8", "4", "8"],
      [X, "2", "16", "16"],
      ["32", "16", "16", X],
    ];

    const expected = [
      ["4", X, X, X],
      ["8", "4", "8", X],
      ["2", "32", X, X],
      ["32", "32", X, X],
    ];

    expect(b.moveLeft(initial)).toStrictEqual(expected);
  });
  it("Moves right correctly", () => {
    const initial = [
      [X, "2", "2", X],
      ["4", "8", X, "8"],
      [X, "2", X, X],
      ["32", "16", "16", X],
    ];

    const expected = [
      [X, X, X, "4"],
      [X, X, "4", "16"],
      [X, X, X, "2"],
      [X, X, "32", "32"],
    ];

    expect(b.moveRight(initial)).toStrictEqual(expected);
  });

  it("Moves up correctly", () => {
    const initial = [
      [X, "2", "2", X],
      ["4", X, X, "8"],
      ["4", "2", "4", X],
      ["32", "16", X, X],
    ];

    const expected = [
      ["8", "4", "2", "8"],
      ["32", "16", "4", X],
      [X, X, X, X],
      [X, X, X, X],
    ];

    expect(b.moveUp(initial)).toStrictEqual(expected);
  });

  it("Moves down correctly", () => {
    const initial = [
      [X, "2", "2", X],
      ["4", X, X, "8"],
      ["4", "2", "4", X],
      ["32", X, X, X],
    ];

    const expected = [
      [X, X, X, X],
      [X, X, X, X],
      ["8", X, "2", X],
      ["32", "4", "4", "8"],
    ];

    expect(b.moveDown(initial)).toStrictEqual(expected);
  });
});

describe("Utility Function", () => {
  it("Board Sum works", () => {
    const initial = [
      [X, X, "2"],
      [X, "4", "2"],
      [X, X, X],
    ];
    expect(b.countBoardSum(initial)).toBe(8);
  });
});

describe("Adding Random Twos", () => {
  it("Correctly add twos", () => {
    let board = [
      [X, X, X],
      [X, X, X],
      [X, X, X],
    ];

    board = b.addTwoToRandomPlace(board);
    board = b.addTwoToRandomPlace(board);
    board = b.addTwoToRandomPlace(board);
    board = b.addTwoToRandomPlace(board);
    board = b.addTwoToRandomPlace(board);

    expect(b.countBoardSum(board)).toBe(10);
  });
  it("Doesn't add two if the board is full", () => {
    let board = [
      ["4", "4", "4"],
      ["4", "4", "4"],
      ["4", "4", "4"],
    ];

    board = b.addTwoToRandomPlace(board);

    expect(b.countBoardSum(board)).toBe(36);
  });
});

describe("Lose Check", () => {
  it("Return false for half empty board", () => {
    let board = [
      [X, X, X, X],
      ["2", X, "8", X],
      [X, "4", X, X],
      [X, "32", X, "16"],
    ];

    expect(b.loseCheck(board)).toBe(false);
  });

  it("Return false for full board with possible move horizontally", () => {
    let board = [
      ["4", "8", "16", "16"],
      ["2", "4", "8", "4"],
      ["128", "8", "128", "32"],
      ["16", "32", "64", "16"],
    ];

    expect(b.loseCheck(board)).toBe(false);
  });

  it("Return false for full board with possible move vertically", () => {
    let board = [
      ["4", "2", "4", "16"],
      ["2", "16", "8", "4"],
      ["128", "16", "128", "32"],
      ["16", "32", "64", "16"],
    ];

    expect(b.loseCheck(board)).toBe(false);
  });
  it("Return true for full board with no possible moves", () => {
    let board = [
      ["4", "2", "4", "16"],
      ["2", "16", "8", "4"],
      ["128", "256", "128", "32"],
      ["16", "32", "64", "16"],
    ];

    expect(b.loseCheck(board)).toBe(true);
  });
});