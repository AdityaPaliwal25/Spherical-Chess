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
<p align="center">
    <img width="263" height="263" alt="BoardLayout" src="https://github.com/user-attachments/assets/db6e857b-77b9-45f0-a589-4f357df6f697" />
    <img width="263" height="260" alt="AllPiecesPlaced" src="https://github.com/user-attachments/assets/0201add3-b2b3-4493-a854-af2cbf1bb118" />
</p>
<br></br>
The squares at the edges are triangles, which better represent an opened sphere. We will reference this representation of the board moving forward.
<br>
<h2>Pawn's Moves</h2>
The pawn can move forward a place and attack diagonally, as a normal game and it promotes when it reaches the end.
<br>
The round nature of the board doesn't affect the moves a lot, and it translates pretty much the same. 
<br></br> 
<p align="center">
<img width="266" height="260" alt="PawnMoves" src="https://github.com/user-attachments/assets/b3d0dc19-b91f-4f52-aa57-67a2b8317c93" />
</p>
<h2>Rook's Moves</h2>
<p align="center">
<img width="263" height="262" alt="RooksMoves" src="https://github.com/user-attachments/assets/1dec4f17-ca77-43b5-ba00-88e9be98a912" />
<img width="261" height="262" alt="RooksMoves3" src="https://github.com/user-attachments/assets/4064076f-208c-4591-815e-135d6e82c890" />
<img width="261" height="261" alt="RooksMoves2" src="https://github.com/user-attachments/assets/b9f382e2-a9d7-4a2f-9c4c-883d7eebc431" />
</p>
<h2>Knight's Moves</h2>
<p align="center">
<img width="261" height="261" alt="KnightsMoves2" src="https://github.com/user-attachments/assets/bbf57868-a179-404f-ad37-a1d59b263fb9" />
<img width="261" height="262" alt="KnightsMoves" src="https://github.com/user-attachments/assets/4b467aa0-c55a-4c7d-9b15-af06ab094c48" />
<img width="260" height="261" alt="KnightsMoves3" src="https://github.com/user-attachments/assets/09de10ab-e670-477b-82f1-92d8964e6012" />
</p>
<h2>Bishop's Moves</h2>
<p align="center">
<img width="261" height="260" alt="BishopsMoves3" src="https://github.com/user-attachments/assets/774b33cd-c965-4939-a148-b7932edd6c1a" />
<img width="261" height="260" alt="BishopsMoves2" src="https://github.com/user-attachments/assets/b8f7281b-3d14-47d3-aec9-76f5b46a0620" />
<img width="260" height="260" alt="BishopsMoves" src="https://github.com/user-attachments/assets/5df484ea-2a2a-4a85-888f-2f296fcdbf9c" />
</p>
<h2>Queen's Moves</h2>
<p align="center">
<img width="261" height="261" alt="QueensMoves5" src="https://github.com/user-attachments/assets/2ab1360f-3777-4cbf-9802-f6d8dc956578" />
<img width="261" height="262" alt="QueensMoves4" src="https://github.com/user-attachments/assets/b0e8058c-0542-4786-aa15-58ec8616d663" />
<img width="261" height="260" alt="QueensMoves3" src="https://github.com/user-attachments/assets/04bdfc54-48b3-45e8-ba2d-f0907d912d44" />
<img width="261" height="260" alt="QueensMoves2" src="https://github.com/user-attachments/assets/af4acc52-0a97-4390-b4f9-69469e26e7bc" />
<img width="261" height="258" alt="QueensMoves" src="https://github.com/user-attachments/assets/e0d04f9c-4fb6-4aa2-b160-9547fbe0c73d" />
</p>

<h2>King's Moves</h2>
<p align="center">
<img width="260" height="261" alt="KingsMoves2" src="https://github.com/user-attachments/assets/a5ad8d7c-fa46-4a66-b7d1-859af57a9d04" />
<img width="259" height="261" alt="KingsMoves" src="https://github.com/user-attachments/assets/e7373cd3-bcf2-453a-a42b-33603b6746e1" />
</p>