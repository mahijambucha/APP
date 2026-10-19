/* Directory data + rendering. Each row: name, category, description, audience, cost, url */
const D=[["Code.org","Coding","Free courses, games, and the Hour of Code for all ages.","Students and teachers","Free","https://code.org"],
["Khan Academy","Basics","Free lessons in computing, math, and more, with practice exercises.","All ages","Free","https://www.khanacademy.org/computing"],
["freeCodeCamp","Coding","Interactive lessons and projects for web development and more.","Teens and adults","Free","https://www.freecodecamp.org"],
["Scratch","Coding","Build games and animations with block-based coding.","Kids and beginners","Free","https://scratch.mit.edu"],
["Codecademy","Coding","Interactive coding courses in many languages.","Beginners and up","Free and paid","https://www.codecademy.com"],
["The Odin Project","Coding","A free, project-based web development curriculum.","Self-directed teens and adults","Free","https://www.theodinproject.com"],
["CS50 (Harvard)","Coding","Harvard's intro to computer science, free online.","Motivated beginners","Free","https://cs50.harvard.edu/x"],
["Kaggle Learn","AI","Short hands-on courses in Python, data, and machine learning.","Teens and adults","Free","https://www.kaggle.com/learn"],
["GCF Global","Basics","Tutorials on computer basics, email, and internet safety.","Adults and seniors","Free","https://edu.gcfglobal.org/en/"],
["MDN Web Docs","Coding","Trusted reference and guides for HTML, CSS, and JavaScript.","Learners and developers","Free","https://developer.mozilla.org"],
["W3Schools","Coding","Beginner-friendly web tutorials with try-it editors.","Beginners","Free (some paid extras)","https://www.w3schools.com"],
["Replit","Coding","Code in your browser with nothing to install.","Students and hobbyists","Free and paid","https://replit.com"],
["CodeCombat","Coding","Learn to code by playing a fantasy game.","Kids and teens","Free and paid","https://codecombat.com"],
["Grasshopper (Google)","Coding","Bite-size JavaScript lessons for your phone.","Beginners","Free","https://grasshopper.app"],
["Elements of AI","AI","A free course on what AI is and what it can do.","Adults and teens","Free","https://www.elementsofai.com"],
["Teachable Machine","AI","Train a simple AI model in your browser.","All ages","Free","https://teachablemachine.withgoogle.com"],
["Day of AI (MIT)","AI","Free classroom AI literacy activities.","Students and teachers","Free","https://dayofai.org"],
["Typing.com","Typing & Safety","Free typing lessons and digital literacy.","Students and adults","Free","https://www.typing.com"],
["Be Internet Awesome (Google)","Typing & Safety","Games and lessons about online safety.","Kids and families","Free","https://beinternetawesome.withgoogle.com"],
["Hour of Code","Coding","One-hour coding activities for any age.","Beginners","Free","https://hourofcode.com"]];
const cats=["All","Coding","AI","Basics","Typing & Safety"];let cat="All";
const chips=document.getElementById("chips");
cats.forEach(c=>{const b=document.createElement("button");b.type="button";b.className="chip"+(c==="All"?" on":"");b.textContent=c;b.onclick=()=>{cat=c;[...chips.children].forEach(x=>x.classList.toggle("on",x===b));draw()};chips.appendChild(b)});
function draw(){const q=document.getElementById("q").value.toLowerCase();
document.getElementById("dir").innerHTML=D.filter(d=>(cat==="All"||d[1]===cat)&&(d[0]+d[2]).toLowerCase().includes(q)).map(d=>`<div class="card"><h3>${d[0]}</h3><span class="tag">${d[1]}</span><span class="tag ${d[4]==="Free"?"free":""}">${d[4]}</span><p>${d[2]}</p><p><b>For:</b> ${d[3]}</p><p><a class="btn" style="margin-top:12px" href="${d[5]}" target="_blank" rel="noopener">Visit</a></p></div>`).join("")||"<p>No matches.</p>"}
document.getElementById("q").oninput=draw;draw();
