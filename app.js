let bt = document.querySelectorAll('button');
        let score_board = document.getElementById('score');
        let win_area = document.getElementById('win_area');
        let user = '';
        let turn = true;
        let count = 0;
        let gameover = false;
        let aiMode = false;
        const music = new Audio('neon-gaming-128925.mp3');
        const win_music = new Audio('mixkit-melodic-bonus-collect-1938.wav');
        // Function to play background music
        function playBackgroundMusic() {
            music.play();
        }
        // Function to check for a draw
        const draw_game = () => {
            if (count === 9 && !gameover) {
                score_board.innerHTML = 'GAME DRAW';
                score_board.style.fontSize = 'x-large';
                document.getElementById('draw').style.width = '5cm';
                reset_btn();
            }
        }
        // Function to reset the game
        function resetGame() {
            for (let i = 0; i < bt.length; i++) {
                bt[i].innerHTML = '';
                bt[i].disabled = false;
            }
            user = '';
            turn = true;
            count = 0;
            gameover = false;
            score_board.innerHTML = '';
            document.getElementById('bear').style.width = '0';
            document.getElementById('draw').style.width = '0';

            const resetButton = document.getElementById('reset-button');
            if (resetButton) {
                resetButton.remove();
            }
            playBackgroundMusic();
        }
        // Function to make a move (for both players and AI)
        function makeMove(e) {
            if (!gameover && e.target.innerHTML === '') {
                user = turn ? 'X' : 'O';
                e.target.innerHTML = user;
                e.target.style.color = turn ? 'red' : 'green';
                count++;
                turn = !turn;
                e.target.disabled = true;
                forWin();
                draw_game();
                if (aiMode && !gameover) {
                    makeAIMove();
                }
            }
        }
        // Function to make the AI move
        function makeAIMove() {
            setTimeout(() => {
                let emptyCells = Array.from(bt).filter(button => button.innerHTML === '');
                if (emptyCells.length > 0) {
                    const randomIndex = Math.floor(Math.random() * emptyCells.length);
                    const aiMove = emptyCells[randomIndex];
                    if (aiMove.innerHTML === '') {
                        user = turn ? 'X' : 'O';
                        aiMove.innerHTML = user;
                        aiMove.style.color = turn ? 'red' : 'green';
                        aiMove.disabled = true;
                        count++;
                        turn = !turn;
                        forWin();
                        draw_game();
                    }
                }
            }, 1000);
        }
        // Event listener for player moves
        for (let i = 0; i < bt.length; i++) {
            bt[i].addEventListener('click', makeMove);
        }
        // Function to reset the game when clicking the "RESET" button
        function reset_btn() {
            let reset = document.createElement('button');
            reset.innerHTML = 'RESET';
            reset.id = 'reset-button';
            reset.style.backgroundColor = "aliceblue";
            reset.style.color = "black";
            reset.style.fontFamily = "cursive";
            reset.onclick = resetGame;
            win_area.append(reset);
        }
        // Event listener for the "Play with AI" button
        document.getElementById('play-with-ai-link').addEventListener('click', () => {
            aiMode = true;
            resetGame();
            user = 'X';
            score_board.innerHTML = `${user} turn`;
            document.getElementById('play-with-ai-link').disabled = true;
            if (aiMode && !turn) {
                makeAIMove();
            }
        });
        // Event listener for the "2 Player Mode" button
        document.getElementById('two-player-mode-link').addEventListener('click', () => {
            aiMode = false;
            resetGame();
            user = 'X';
            score_board.innerHTML = `${user} turn`;
            document.getElementById('two-player-mode-link').disabled = true;
        });
        const forWin = () => {
            var win = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (let e of win) {
                if (
                    bt[e[0]].innerHTML === bt[e[1]].innerHTML &&
                    bt[e[2]].innerHTML === bt[e[1]].innerHTML &&
                    bt[e[0]].innerHTML !== ''
                ) {
                    win_scr();
                    music.pause();
                    gameover = true;
                    // Display the winning message
                    score_board.innerHTML = `Player "${bt[e[0]].innerHTML}" WON`;
                    // Disable further moves
                    for (let key of bt) {
                        key.disabled = true;
                    }
                    break; // Exit the loop when there's a winner
                }
            }
        };
        // Function to show the winning message and stop the game
        const win_scr = () => {
            document.getElementById('bear').style.width = '3cm';
            score_board.style.fontSize = 'x-large';
            win_music.play();
            reset_btn();
        };














