export default `SELECT h.team_name as name,
SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3 ELSE 0 END) +
SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) as totalPoints,
COUNT(h.team_name) as totalGames,
SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) as totalVictories,
SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) as totalDraws,
SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) as totalLosses,
SUM(m.home_team_goals) as goalsFavor,
SUM(m.away_team_goals) as goalsOwn,
SUM(m.home_team_goals) - SUM(m.away_team_goals) as goalsBalance,
ROUND(
  SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3 
      WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) /
  ((COUNT(h.team_name) * 3)) * 100  
,2) as efficiency
from TRYBE_FUTEBOL_CLUBE.matches as m
inner join TRYBE_FUTEBOL_CLUBE.teams as h on m.home_team = h.id
WHERE m.in_progress = 0
GROUP BY h.team_name
ORDER BY 
    totalPoints DESC, 
    totalVictories DESC,
    goalsBalance DESC,
    goalsFavor DESC,
    goalsOwn DESC;`;
