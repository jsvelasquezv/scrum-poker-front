import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import CreateRoom from './CreateRoom';
import Login from './Login';
import JoinRoom from './JoinRoom';
import Room from './Room';

const ENDPOINT = 'http://127.0.0.1:3000';

function App() {
  const [connection, setConnection] = useState();
  const [loggedUser, setLoggedUser] = useState();
  const [joinedRoom, setJoinedRoom] = useState();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    async function getUser() {
      const user = await localStorage.getItem('loggedUser');
      if (user) {
        setLoggedUser(JSON.parse(user));
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    const socket = socketIO(ENDPOINT);

    socket.on('error', (room, data) => {
      console.log(room, data.message);
    });

    socket.on('room-joined', ({ room, roomLoggedUsers }) => {
      console.log(room);
      setJoinedRoom(room);
      setConnectedUsers(roomLoggedUsers);
    });

    socket.on('vote-counted', votes => {
      setVotes(votes);
    });

    setConnection(socket);
  }, []);

  if (!loggedUser) {
    return <Login setLoggedUser={setLoggedUser} />;
  }

  return (
    <>
      <h2>User: {loggedUser.userName}</h2>
      {joinedRoom ? (
        <Room
          connection={connection}
          room={joinedRoom}
          loggedUser={loggedUser}
          connectedUsers={connectedUsers}
          votes={votes}
        />
      ) : (
        <>
          <CreateRoom connection={connection} loggedUser={loggedUser} />
          <p>Or</p>
          <JoinRoom connection={connection} loggedUser={loggedUser} />
        </>
      )}
    </>
  );
}

export default App;
