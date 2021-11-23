import React, { useState } from 'react';

function JoinRoom({ connection, loggedUser }) {
  const [roomId, setRoomId] = useState();

  async function handleJoin() {
    connection.emit('join', roomId, loggedUser);
  }

  return (
    <div>
      <h3>Join room</h3>
      <p>_wNOf6aAoDg6GBOc8SpnO</p>
      <input
        name="name"
        onChange={e => {
          setRoomId(e.target.value);
        }}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}

export default JoinRoom;
