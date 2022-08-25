// body
const validLoginBody = { email: 'valid_email@mail.com', password: 'teste'};
const noEmailLoginBody = { password: 'valid_password' };
const noPasswordLoginBody = { email: 'valid_email@mail.com'};
const invalidEmailLoginBody = { email: 'invalid_email', password: 'valid_password'};
const newMatchBody = {
  "homeTeam": 16, 
  "awayTeam": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

// user
const userMock = {
  id: 1, role: 'admin', username: 'fake_user', email: 'valid_email'
}

// team
const teams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  }
]

const team = {
  id: 1,
  teamName: "Avaí/Kindermann"
}

// matches

const matches = [
  {
    "id": 39,
    "homeTeam": 3,
    "homeTeamGoals": 2,
    "awayTeam": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "teamHome": {
      "teamName": "Botafogo"
    },
    "teamAway": {
      "teamName": "Napoli-SC"
    }
  },
  {
    "id": 40,
    "homeTeam": 12,
    "homeTeamGoals": 4,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Palmeiras"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
]

const matchInProgressFalse = [
  {
    "id": 39,
    "homeTeam": 3,
    "homeTeamGoals": 2,
    "awayTeam": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "teamHome": {
      "teamName": "Botafogo"
    },
    "teamAway": {
      "teamName": "Napoli-SC"
    }
  },
]

const matchInProgressTrue = [
  {
    "id": 39,
    "homeTeam": 3,
    "homeTeamGoals": 2,
    "awayTeam": 11,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Botafogo"
    },
    "teamAway": {
      "teamName": "Napoli-SC"
    }
  },
]

const newMatch = {
  "id": 49,
  "homeTeam": 1,
  "awayTeam": 3,
  "homeTeamGoals": 3,
  "awayTeamGoals": 1,
  "inProgress": true
}

export {
  validLoginBody,
  noEmailLoginBody,
  noPasswordLoginBody,
  invalidEmailLoginBody,
  newMatchBody,
  userMock,
  teams,
  team,
  matches,
  matchInProgressFalse,
  matchInProgressTrue,
  newMatch
}