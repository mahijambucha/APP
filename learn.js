/* Lesson content + rendering. Add or edit lessons in TRACKS below. */
const TRACKS = {
ai: { color: "var(--ai)", lessons: [
 { title: "1. What is AI?",
   body: `<p>Artificial intelligence (AI) is software that finds patterns in data and uses them to make predictions or create things, like text, images, or recommendations.</p>
   <ul><li><b>You already use it:</b> spam filters, maps, voice assistants, and video suggestions.</li><li><b>It does not think like a person.</b> It predicts what is likely based on what it has seen.</li><li><b>It can sound confident and still be wrong.</b></li></ul>`,
   quiz: { q: "Which best describes how most AI works?", opts: ["It thinks and feels like a person", "It finds patterns in data to make predictions", "It looks up every answer in a book", "It only follows fixed if-then rules"], a: 1, why: "AI systems learn patterns from lots of examples and use them to predict or generate results." },
   ch: "Name three apps or devices you used this week that might use AI. For each, guess what pattern it is looking for." },
 { title: "2. How AI learns",
   body: `<p>Many AI systems use <b>machine learning</b>. Instead of being given step-by-step rules, they are shown many examples and adjust themselves until their guesses get good.</p>
   <ul><li><b>Training data:</b> the examples the AI learns from.</li><li><b>Model:</b> what the AI ends up with after training.</li><li><b>Inference:</b> using the trained model to answer something new.</li></ul><p>Better, more varied training data usually means a better model.</p>`,
   quiz: { q: "What is training data?", opts: ["The examples an AI learns from", "A password for the AI", "The screen where you type", "A backup of your files"], a: 0, why: "Training data is the set of examples used to teach a model." },
   ch: "Try Teachable Machine (see the Directory page) and train a model to tell two objects apart. What happens when you give it only a few examples?" },
 { title: "3. Bias and fairness",
   body: `<p>AI learns from data made by people, so it can copy human mistakes and unfair patterns. This is called <b>bias</b>.</p>
   <ul><li>If a face-recognition system is trained mostly on one group, it may work worse for others.</li><li>If past hiring data favored certain people, an AI trained on it may repeat that.</li></ul><p>Ways to reduce bias: use diverse data, test with many kinds of people, and keep humans in charge of important decisions.</p>`,
   quiz: { q: "Why can an AI system be biased?", opts: ["It dislikes certain people", "It learned from data that was incomplete or unfair", "Computers are always random", "It was built too fast"], a: 1, why: "Bias usually comes from the data and choices behind the system, not from the AI having opinions." },
   ch: "Imagine an AI that picks students for a program. What kinds of data could make it unfair? Who should double-check its choices?" },
 { title: "4. Writing good prompts",
   body: `<p>A <b>prompt</b> is what you ask an AI tool to do. Clear prompts get better results.</p>
   <ul><li><b>Say the goal:</b> "Explain photosynthesis to a 6th grader."</li><li><b>Give context:</b> who it is for, what you already know.</li><li><b>Set the format:</b> a list, 3 sentences, a table.</li><li><b>Follow up:</b> ask it to simplify, add examples, or try again.</li></ul>`,
   quiz: { q: "Which prompt will probably give the best result?", opts: ["Tell me about space", "Space", "Explain black holes in 5 simple bullet points for a 10-year-old", "Write stuff"], a: 2, why: "It states the topic, the audience, and the format." },
   ch: "Rewrite the weak prompt \"help with my essay\" into a clear one that has a goal, context, and format." },
 { title: "5. Using AI responsibly",
   body: `<p>AI is a tool, and you are responsible for how you use it.</p>
   <ul><li><b>Check facts.</b> AI can make things up. Verify with trusted sources.</li><li><b>Protect privacy.</b> Do not share passwords, ID numbers, or other people's private information.</li><li><b>Be honest.</b> Follow your school or workplace rules and say when you used AI.</li><li><b>Watch for fakes.</b> Deepfakes are AI-made images, voices, or videos that look real.</li></ul>`,
   quiz: { q: "What should you do before relying on an AI answer?", opts: ["Trust it, because computers are never wrong", "Check it against a trusted source", "Share it right away", "Delete it"], a: 1, why: "AI can be wrong or invent details, so verify anything important." },
   ch: "Ask an AI tool a question you already know the answer to. Is the answer fully correct? How would you check it?" }
]},
code: { color: "var(--code)", lessons: [
 { title: "1. Variables",
   body: `<p>A <b>variable</b> is a labeled box that stores a value. In JavaScript you make one with <code>let</code> or <code>const</code>.</p>
   <ul><li><code>let score = 10;</code> can change later.</li><li><code>const name = "Sam";</code> cannot be reassigned.</li></ul>`,
   code: `let score = 10;\nscore = score + 5;\nconsole.log("Score:", score);`,
   quiz: { q: "After let x = 3; x = x + 2; what is x?", opts: ["3", "2", "5", "32"], a: 2, why: "x starts at 3, then 2 is added, so it becomes 5." },
   ch: "Change the code to store your name in a variable and print a greeting like \"Hello, Sam!\"." },
 { title: "2. Data types",
   body: `<p>Values come in different <b>types</b>.</p>
   <ul><li><b>Number:</b> <code>42</code>, <code>3.14</code></li><li><b>String (text):</b> <code>"hello"</code></li><li><b>Boolean:</b> <code>true</code> or <code>false</code></li></ul><p>Use <code>typeof</code> to check a type.</p>`,
   code: `console.log(typeof 42);\nconsole.log(typeof "hello");\nconsole.log(typeof true);\nconsole.log("5" + 5);`,
   quiz: { q: "What does \"5\" + 5 give in JavaScript?", opts: ["10", "55", "Error", "5"], a: 1, why: "The text \"5\" and the number 5 are joined as text, giving \"55\"." },
   ch: "Predict the output of each line before you run it. Then run it and see if you were right." },
 { title: "3. Conditionals",
   body: `<p><b>Conditionals</b> let code make decisions using <code>if</code>, <code>else if</code>, and <code>else</code>.</p>`,
   code: `let age = 15;\nif (age >= 18) {\n  console.log("Adult");\n} else if (age >= 13) {\n  console.log("Teen");\n} else {\n  console.log("Child");\n}`,
   quiz: { q: "Which symbol checks if two values are equal?", opts: ["=", "==="," =>", "!"], a: 1, why: "A single = assigns a value. === compares two values." },
   ch: "Change age to 8, then 30. Then add a branch that prints \"Senior\" for 65 and up." },
 { title: "4. Loops",
   body: `<p>A <b>loop</b> repeats code so you don't have to write it again and again.</p>
   <ul><li><code>for</code> loops run a set number of times.</li><li><code>while</code> loops run until a condition is false.</li></ul>`,
   code: `for (let i = 1; i <= 5; i++) {\n  console.log("Count:", i);\n}`,
   quiz: { q: "How many times does for (let i = 0; i < 3; i++) run?", opts: ["2", "3", "4", "Forever"], a: 1, why: "i is 0, 1, and 2. Then i < 3 is false, so it stops after 3 runs." },
   ch: "Change the loop to count from 1 to 10, then print only the even numbers." },
 { title: "5. Functions",
   body: `<p>A <b>function</b> is a reusable block of code. It can take inputs (parameters) and give back a result with <code>return</code>.</p>`,
   code: `function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));\nconsole.log(add(10, 20));`,
   quiz: { q: "What does return do?", opts: ["Restarts the program", "Sends a value back from the function", "Prints to the screen", "Deletes the function"], a: 1, why: "return hands a result back to whoever called the function." },
   ch: "Write a function called greet(name) that returns \"Hello, \" followed by the name. Call it with your name." }
]},
basics: { color: "var(--basics)", lessons: [
 { title: "1. Hardware",
   body: `<p>Hardware is the physical parts of a computer.</p>
   <ul><li><b>CPU:</b> the brain that does the calculations.</li><li><b>Memory (RAM):</b> short-term workspace, cleared when power is off.</li><li><b>Storage:</b> where files are kept long term.</li><li><b>Input and output:</b> keyboard, mouse, screen, speakers.</li></ul>`,
   quiz: { q: "Which part keeps your files when the computer is off?", opts: ["RAM", "Storage", "Monitor", "Mouse"], a: 1, why: "Storage (a hard drive or SSD) holds files long term. RAM is cleared when power is off." },
   ch: "Find the keyboard, mouse or trackpad, screen, and charging port on a computer near you. Which are inputs and which are outputs?" },
 { title: "2. Files and folders",
   body: `<p>Files hold your work. Folders keep files organized.</p>
   <ul><li>Give files clear names, like <code>resume-2026.docx</code>.</li><li>Use folders such as Documents, School, and Photos.</li><li>Save often, and keep a backup of important files.</li></ul><p>File extensions like <code>.pdf</code>, <code>.jpg</code>, and <code>.docx</code> tell you the type of file.</p>`,
   quiz: { q: "What does the .pdf at the end of a file name tell you?", opts: ["Who made it", "The type of file", "How old it is", "How big it is"], a: 1, why: "The extension shows the file type, which helps the computer pick the right program." },
   ch: "Create a folder called TechScale and save a practice file inside it. Then find it again using search." },
 { title: "3. The internet",
   body: `<p>The internet is a huge network of connected computers. The <b>web</b> is the pages and sites you view with a <b>browser</b> such as Chrome, Safari, or Edge.</p>
   <ul><li><b>URL:</b> a web address, like <code>example.com</code>.</li><li><b>Search engine:</b> a tool for finding pages.</li><li><b>Wi-Fi:</b> a wireless way to connect to the internet.</li></ul><p>Look for <code>https://</code> and be careful on sites you don't know.</p>`,
   quiz: { q: "What is a browser?", opts: ["A search engine", "A program for viewing websites", "A type of Wi-Fi", "An email account"], a: 1, why: "A browser is the program you use to open and view web pages." },
   ch: "Use a search engine to find a trusted source about a topic you like. How can you tell it is trustworthy?" },
 { title: "4. Passwords and safety",
   body: `<p>Strong passwords protect your accounts.</p>
   <ul><li><b>Make them long:</b> a passphrase of 4+ random words is strong and easier to remember.</li><li><b>Use a different one for each account.</b></li><li><b>Turn on two-step verification</b> when you can.</li><li><b>Beware of scams:</b> never share codes or passwords because of an urgent message.</li></ul>`,
   quiz: { q: "Which is the strongest password?", opts: ["password123", "mydog", "maple-river-lantern-cloud", "12345678"], a: 2, why: "A long passphrase of unrelated words is hard to guess and easy to remember." },
   ch: "Make up a new four-word passphrase (do not use it anywhere real). Then explain why reusing passwords is risky." },
 { title: "5. Email",
   body: `<p>Email is a way to send messages and files online.</p>
   <ul><li><b>To, Cc, Bcc:</b> who gets the message, who is copied, and who is copied privately.</li><li><b>Subject:</b> a short, clear summary.</li><li><b>Attachments:</b> files sent with the message.</li></ul><p><b>Spot phishing:</b> be careful of messages that ask for passwords, threaten you, or have strange links. When unsure, go to the website yourself instead of clicking.</p>`,
   quiz: { q: "An email says your account will be closed unless you click a link now. What should you do?", opts: ["Click it fast", "Reply with your password", "Don't click, and go to the real site yourself", "Forward it to everyone"], a: 2, why: "Urgent threats are a common phishing trick. Go to the official site directly instead." },
   ch: "Write a short, polite email to a friend with a clear subject line and a greeting. What would you leave out if the email were about something private?" }
]}};

(function () {
  const root = document.getElementById("lessons");
  if (!root) return;
  const key = root.dataset.track, T = TRACKS[key];
  root.style.setProperty("--accent", T.color);
  const saved = store.get("ts_progress_" + key, {});
  const total = T.lessons.length;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const prog = document.createElement("div");
  prog.className = "progress";
  prog.innerHTML = `<strong></strong><div class="track"><div class="fill"></div></div>`;
  root.before(prog);
  function updateProgress() {
    const n = Object.keys(saved).length;
    prog.querySelector("strong").textContent = n + " of " + total + " lessons complete";
    prog.querySelector(".fill").style.width = (n / total * 100) + "%";
  }

  T.lessons.forEach((L, i) => {
    const d = document.createElement("details");
    d.className = "lesson" + (saved[i] ? " complete" : "");
    d.innerHTML = `<summary><span>${esc(L.title)}</span><span class="done">✓ Done</span></summary>
      <div class="body">${L.body}
      ${L.code ? `<div class="box"><h4>Try it</h4><textarea class="editor" spellcheck="false" aria-label="Code editor"></textarea><button type="button" class="btn alt run">Run code</button><div class="out" aria-live="polite"></div></div>` : ""}
      <div class="box"><h4>Quick quiz</h4><p><b>${esc(L.quiz.q)}</b></p>
        ${L.quiz.opts.map((o, j) => `<label><input type="radio" name="q${key}${i}" value="${j}"> ${esc(o)}</label>`).join("")}
        <button type="button" class="btn check">Check answer</button><div class="fb" role="status"></div></div>
      <div class="box"><h4>Challenge</h4><p>${esc(L.ch)}</p></div></div>`;
    root.appendChild(d);

    if (L.code) {
      const ed = d.querySelector(".editor"), out = d.querySelector(".out");
      ed.value = L.code;
      d.querySelector(".run").onclick = () => {
        const lines = [];
        const fake = { log: (...a) => lines.push(a.map(x => typeof x === "object" ? JSON.stringify(x) : String(x)).join(" ")) };
        out.className = "out";
        try { new Function("console", ed.value)(fake); out.textContent = lines.join("\n") || "(no output. Try console.log)"; }
        catch (e) { out.classList.add("err"); out.textContent = "Error: " + e.message; }
      };
    }

    d.querySelector(".check").onclick = () => {
      const fb = d.querySelector(".fb"), pick = d.querySelector('input[type=radio]:checked');
      fb.className = "fb";
      if (!pick) { fb.classList.add("no"); fb.textContent = "Pick an answer first."; return; }
      if (+pick.value === L.quiz.a) {
        fb.classList.add("ok"); fb.textContent = "Correct! " + L.quiz.why;
        saved[i] = true; store.set("ts_progress_" + key, saved);
        d.classList.add("complete"); updateProgress();
      } else { fb.classList.add("no"); fb.textContent = "Not quite. Try again."; }
    };
  });
  updateProgress();
})();
