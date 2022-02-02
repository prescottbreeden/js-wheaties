const Compose = (F, G) => {
  const M = (fg) => ({
    extract: () => fg,
    map: (f) => M(fg.map((g) => g.map(f))),
  });
  M.of = (x) => M(F.of(G.of(x)));
  return M;
};

const TaskEither = Compose(Task, Either);

TaskEither.of(2)
  .map((x) => x * 10)
  .map((x) => x + 1)
  .extract()
  .fork(console.error, (either) => either.fold(console.error, console.log));
// 21
