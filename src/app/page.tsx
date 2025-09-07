"use client";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-10 flex flex-col gap-4">
        <button
          className="bg-rose-500/90 text-white p-2 rounded-md cursor-pointer"
          onClick={() => main(false)}
        >
          Run with Promise.all
        </button>
        <button
          className="bg-rose-500/90 text-white p-2 rounded-md cursor-pointer"
          onClick={() => main(true)}
        >
          Run with Promise.allAll and throw "error" in the second promise
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          onClick={() => mainSettled(false)}
        >
          Run with Promise.allSettled
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          onClick={() => mainSettled(true)}
        >
          Run with Promise.allSettled and throw "error" in the second promise
        </button>
      </div>
    </div>
  );
}

async function work(i: number, shouldThrowError: boolean) {
  console.log(`work: running ${i}`);

  await new Promise((resolve) => setTimeout(resolve, 1000 * i));
  // throw error to test
  if (i === 2 && shouldThrowError) {
    throw new Error(`work: error happened in ${i}`);
  }
  console.log(`work: done ${i}`);
  return i ** 2;
}

async function main(shouldThrowError: boolean) {
  try {
    console.log("main: running");
    const promises = [1, 2, 3, 4, 5].map((i) => work(i, shouldThrowError));
    const results = await Promise.all(promises);
    console.log("main: results", results);
  } catch (error) {
    console.log("main: error", error);
  }
}

async function mainSettled(shouldThrowError: boolean) {
  try {
    console.log("main-settled: running");
    const promises = [1, 2, 3, 4, 5].map((i) => work(i, shouldThrowError));
    const results = await Promise.allSettled(promises);

    const fulfilledResults = results
      .filter(
        (result): result is PromiseFulfilledResult<number> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);

    const rejectedResults = results
      .filter(
        (result): result is PromiseRejectedResult =>
          result.status === "rejected",
      )
      .map((result) => result.reason);

    console.log("main-settled: fulfilledResults", fulfilledResults);
    console.log("main-settled: rejectedResults", rejectedResults);
    console.log("main-settled: allResults", results);
  } catch (error) {
    console.log("main-settled: error", error);
  }
}
