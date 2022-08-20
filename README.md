<h1>My Quiz App</h1>

<h2>Description</h2>
A simple quiz app, that you can redesign for your own purposes. You can choose one of four numbers of questions and one of six categories to play with. This app also use local storage to store your best scores. There are three levels of difficulties included in that app, and that makes each of games unique. Try yourself!

I've made this app with vanilla JavaScript (ES 6), HTML and CSS, becouse i wanted to strengthen my knowledge in this particular area.

One of challenges that i had faced, was how to design a game itself. The first attempt was to use simple variables but it just look bad and not so functional. Thats why while i was refactoring a code I made a class that stores an information about game itself (gamedata file).
The public database that i used had and issue with html enteties - so i made an html parser that utilizes Web API (DOM) and returns a proper text content.

If you find this app usefull, please give me a star. I'am open for any advice how could i make this better or create new features.

<h2>Install and Run the Project</h2>
Use command terminal and type:
<code> git clone https://github.com/CTVV/ctvv.github.io.git</code>
Use command terminal in folder with this project and type:
<p><code> npm install</code></p>
<p><code> npm run webpack</code></p>
<p><code> npm run serve</code></p>
From now you can have fun playing a quiz game!
<h2>License</h2>
MIT License - Check LICENSE file

<h2>Credits</h2>
<a href="https://opentdb.com/api_config.php">Database</a> - The Open Trivia Database provides a completely free JSON API for use in programming projects. It has tons of question that you can use to redesign an app.

<a href="https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array">Shuffle Algorithm</a> - A shuffle algorithm that i had used in this particular project
