import React, { useState } from 'react';
import axios from './axiosInstance';

function CreateRoom({ connection, loggedUser }) {
  const [roomName, setRoomName] = useState();

  async function handleCreate() {
    const { data } = await axios.post('/rooms', {
      roomName,
      masterUser: loggedUser.userId,
    });

    connection.emit('join', data.roomId, loggedUser);
  }

  return (
    <div>
      <h3>Create room</h3>
      <input
        name="name"
        onChange={e => {
          setRoomName(e.target.value);
        }}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}

export default CreateRoom;
