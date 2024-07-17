import React, { useState, useEffect } from 'react';
import ChatScreen from '../../screens/ChatScreen/index';
import { User } from '../../type/user';

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<string>(''); // Ajoutez l'état pour le nom de l'utilisateur actuel

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((fetchedUsers) => {
        if (fetchedUsers.length > 0) {
          setUsers(fetchedUsers);
        }
      })
      .catch((error) =>
        console.error(
          'Erreur lors de la récupération des utilisateurs:',
          error,
        ),
      );
  }, []);

  const handleSelect = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setSelectedUserId(user.id); // Stocker l'ID de l'utilisateur sélectionné
      setCurrentUser(user.username); // Stocker le nom de l'utilisateur actuel
      console.log('User selected:', user);
    }
  };

  const handleBack = () => {
    setSelectedUserId(null);
    setCurrentUser(''); // Réinitialiser le nom de l'utilisateur
  };

  if (selectedUserId !== null) {
    return (
      <ChatScreen
        userId={selectedUserId}
        currentUser={currentUser}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="home-container">
      <h1>Choisissez un utilisateur</h1>
      <select
        onChange={(e) => handleSelect(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>
          Choisir un utilisateur
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Home;
