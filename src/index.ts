interface Spell {
    name: string;
    desc: string;
    page: string;
    range: string;
    components: string;
    material: string;
    ritual: string;
    duration: string;
    concentration: string;
    casting_time: string;
    level: string;
    school: string;
    class: string;
    archetype: string;
    domains: string;
    oaths: string;
  }

const classes: string[] = ["Wizard", "Cleric", "Druid", "Sorcerer", "Bard", "Warlock", "Ranger", "Paladin"];
const levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const classButtons = document.getElementById("classSelection")!;
const classFilter: Set<string> = new Set();

classes.forEach((className: string) => {
    const button = document.createElement("button");
    button.textContent = className;
    button.classList.add("button");
    button.addEventListener("click", (event) => selectClass(event, className));
    classButtons.appendChild(button);
});

const levelButtons = document.getElementById("levelSelection")!;
const levelFilter: Set<number> = new Set();

levels.forEach((level: number) => {
    const button = document.createElement("button");
    button.textContent = level.toString();
    button.classList.add("button");
    button.addEventListener("click", (event) => selectLevel(event, level));
    levelButtons.appendChild(button);
});

function selectClass(event: Event, className: string): void {
    const button = event.target as HTMLElement;
    if (classFilter.has(className)) {
        classFilter.delete(className);
        if (button instanceof HTMLElement) button.classList.remove("button--selected");
    } else {
        classFilter.add(className);
        if (button instanceof HTMLElement) button.classList.add("button--selected");
    }
    console.log(classFilter);
}

function selectLevel(event: Event, level: number): void {
    const button = event.target as HTMLElement;
    if (levelFilter.has(level)) {
        levelFilter.delete(level);
        if (button instanceof HTMLElement) button.classList.remove("button--selected");
    } else {
        levelFilter.add(level);
        if (button instanceof HTMLElement) button.classList.add("button--selected");
    }
    console.log(levelFilter);
}

document.getElementById("loadSpells")?.addEventListener("click", () => {
    fetch('https://raw.githubusercontent.com/alterot/spellbook-ts/main/spells.json')
      .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((spellData: Spell[]) => {
        const spells = spellData; 

        const filteredSpells = spells.filter((spell: Spell) => {
            const classes = spell.class.split(', ');
            const level = parseInt(spell.level);
          
            return (
              (classFilter.size === 0 || classes.some((className: string) => classFilter.has(className))) &&
              (levelFilter.size === 0 || levelFilter.has(level))
            );
          });
  
        displaySpells(filteredSpells);
      })
      .catch(error => {
        console.error('Error:', error);
      });
});
  
  function displaySpells(spells: Spell[]) {
    const spellList = document.getElementById("spell-list")!;
    spellList.innerHTML = "";
  
    spells.forEach((spell: Spell) => {
      const spellItem = document.createElement("div");
      spellItem.classList.add("spell");
      spellItem.innerHTML = `
        <h3>${spell.name}</h3>
        <p><strong>Classes:</strong> ${spell.class}</p>
        <p><strong>Level:</strong> ${spell.level}</p>
      `;
      spellList.appendChild(spellItem);
  
      spellItem.addEventListener("click", () => {
        const spellDetails = document.createElement("div");
        spellDetails.classList.add("spell__description");
        spellDetails.innerHTML = `
          <h3>Description:</h3><p> ${spell.desc}</p>
          <p><strong>Page:</strong> ${spell.page}</p>
          <p><strong>Range:</strong> ${spell.range}</p>
          <p><strong>Components:</strong> ${spell.components}</p>
          <p><strong>Material:</strong> ${spell.material}</p>
          <p><strong>Ritual:</strong> ${spell.ritual}</p>
          <p><strong>Duration:</strong> ${spell.duration}</p>
          <p><strong>Concentration:</strong> ${spell.concentration}</p>
          <p><strong>Casting Time:</strong> ${spell.casting_time}</p>
          <p><strong>School:</strong> ${spell.school}</p>
          <button class="close-button">Close</button>
        `;
        document.body.appendChild(spellDetails);
        const spellContainer = document.getElementById("spell-container")!;
        spellContainer.classList.add("blur");
  
        const closeButton = spellDetails.querySelector(".close-button")!;
        closeButton.addEventListener("click", () => {
          spellDetails.remove();
          spellContainer.classList.remove("blur");
        }); 
      }); 
    });
  }