SELECT
  ts.total + ts.correction as seasonPoints,
  ts.rank,
  ts.points,
  ts.daily_rank,
  CASE WHEN prev_ts.rank IS NOT NULL THEN prev_ts.rank - ts.rank ELSE 0 END AS delta
FROM teamstat ts
  LEFT JOIN teamstat prev_ts ON ts.teamid = prev_ts.teamid AND ts.date = prev_ts.date + INTERVAL '1' DAY
WHERE ts.teamid = $1 AND ts.date = CURRENT_DATE;