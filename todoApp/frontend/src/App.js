import React from 'react';
import Auth from './Auth';
import Tasks from './Tasks';
import Notifications from './Notifications';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React App</h1>
      </header>
      <main>
        <Auth />
        <Tasks />
        <Notifications />
      </main>
      <footer>
        <p>Footer content goes here.</p>
      </footer>
    </div>
  );
}

export default App;
