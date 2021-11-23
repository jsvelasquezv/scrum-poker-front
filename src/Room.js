import React from 'react';

function Room({ connection, room, loggedUser, connectedUsers = [], votes }) {
  function handleVote(value) {
    connection.emit('vote', room.roomId, { userId: loggedUser.userId, value });
  }
  console.log(loggedUser);
  function handleReveal() {
    connection.emit('reveal', room.roomId);
  }

  return (
    <>
      <h1>{room.roomName}</h1>
      <ul>
        {connectedUsers.map(user => (
          <li key={user.userId}>
            {user.userName} - {votes[user.userId] ? 'Voted' : 'Voting'}
          </li>
        ))}
      </ul>
      <div>
        <button
          key={0}
          onClick={() => {
            handleVote(0);
          }}
        >
          0
        </button>
        <button
          key={1}
          onClick={() => {
            handleVote(1);
          }}
        >
          1
        </button>
        <button
          key={2}
          onClick={() => {
            handleVote(2);
          }}
        >
          2
        </button>
        <button
          key={3}
          onClick={() => {
            handleVote(3);
          }}
        >
          3
        </button>
        <button
          key={5}
          onClick={() => {
            handleVote(5);
          }}
        >
          5
        </button>
        <button
          key={8}
          onClick={() => {
            handleVote(8);
          }}
        >
          8
        </button>
        <button
          key={13}
          onClick={() => {
            handleVote(13);
          }}
        >
          13
        </button>
        <button
          key={21}
          onClick={() => {
            handleVote(21);
          }}
        >
          21
        </button>
        <button
          key={34}
          onClick={() => {
            handleVote(34);
          }}
        >
          34
        </button>
        <button
          key={55}
          onClick={() => {
            handleVote(55);
          }}
        >
          55
        </button>
      </div>
      {room.masterUser === loggedUser.userId ? (
        <button onClick={() => handleReveal()}>Reveal</button>
      ) : null}
    </>
  );
}

export default Room;
