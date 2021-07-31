const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
var abyss = [3, 3, 'td15', ' ']

function build() {
   for(let i = 0; i < 15; i++) {
      let r = Math.floor(Math.random() * 14)
      let xcg = values[r]
      values[r] = values[i]
      values[i] = xcg
   }
}

function check() {
   let inv = 0;
   for (let i = 0; i < values.length; i++) {
      for (let j = i + 1; j < values.length; j++) {
         if (values[i] > values[j]) {
            inv++;
         }
      }
   }
   return inv % 2
}

function newgame() {

   do {
      build()
   } while(check())

   for(let i = 0; i < 15; i++) {
      document.getElementById('td' + i).textContent = values[i]
   }

   let pos = document.getElementById('tag')
   pos.onclick = function(e) {
      cellX = Math.floor((e.clientX - pos.getBoundingClientRect().x) / 100)
      cellY = Math.floor((e.clientY - pos.getBoundingClientRect().y) / 100)
      cellId = e.target.id
      cellVal = e.target.textContent

      if(Math.abs(abyss[0] - cellX) + Math.abs(abyss[1] - cellY) == 1) {
         document.getElementById(abyss[2]).textContent = cellVal
         document.getElementById(abyss[2]).classList.remove('empty')
         document.getElementById(cellId).textContent = abyss[3]
         document.getElementById(cellId).classList.add('empty')
         abyss[0] = cellX
         abyss[1] = cellY
         abyss[2] = cellId

         let score = 0;
         for(let i = 0; i < values.length; i++) {
            if (document.getElementById('td' + i).textContent == (i + 1).toString()) {
               score++;
            }
         }
         if (score == 15) {
            let a = confirm("Победа! Хотите сыграть еще?");
            if (a) {
               newgame()
            }
         }
      }
   }
}

newgame()