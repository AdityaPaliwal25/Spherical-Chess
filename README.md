<h1>Spherical Chess</h1>
The idea is to turn the chess board into a sphere, the sphere contains the same grid as the chess board except at the end where the squares are warped into triangles and the rules have also changed a bit:
<br></br>
<video src="https://github.com/user-attachments/assets/b6310d59-6aec-4e55-8ee2-afa682cc1c62"></video>

<h1>How to Run</h1>
The project contains two main folders, client and server. In order to run the project, first open the project in a terminal(we used VSCode's Terminal) and then run the "nodemon server.js" command from the server directory, then run the "npm run dev" command from the client directoty.
<br>
It should look something like this:
<br></br>
<img width="1606" height="311" alt="HowToRun" src="https://github.com/user-attachments/assets/3143c3cc-0154-4e96-a5f3-5ac3e1ea5fae" />
<br></br>
After running the "npm run dev" command from the client directoty, a link to a local host port will be provided which will take you to the project's enironment, you need to open the same link in another tab in order to play or interract with the board. 
<br>
The method of running the project is still very "unconventional" because it's still in test phase, we have not been able to work on it properly(mostly because we were busy with college) in order to host it somehwere.

<h1>Game Rules</h1>
The board is spherical, hence, the moves which allowed the pieces to move as far as the board permitted(like Bishops diagonal movements or Rooks vertical and horizontal movements) now can make a loop around the board. And this becomes harder to predict when playing as compared to the normal board, so here's a better representation of the board:
<br></br>
