"use strict";
var _a;
var classes = ["Wizard", "Cleric", "Druid", "Sorcerer", "Bard", "Warlock", "Ranger", "Paladin"];
var levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var classButtons = document.getElementById("classSelection");
var classFilter = new Set();
classes.forEach(function (className) {
    var button = document.createElement("button");
    button.textContent = className;
    button.classList.add("button");
    button.addEventListener("click", function (event) { return selectClass(event, className); });
    classButtons.appendChild(button);
});
var levelButtons = document.getElementById("levelSelection");
var levelFilter = new Set();
levels.forEach(function (level) {
    var button = document.createElement("button");
    button.textContent = level.toString();
    button.classList.add("button");
    button.addEventListener("click", function (event) { return selectLevel(event, level); });
    levelButtons.appendChild(button);
});
function selectClass(event, className) {
    var button = event.target;
    if (classFilter.has(className)) {
        classFilter.delete(className);
        if (button instanceof HTMLElement)
            button.classList.remove("button--selected");
    }
    else {
        classFilter.add(className);
        if (button instanceof HTMLElement)
            button.classList.add("button--selected");
    }
    console.log(classFilter);
}
function selectLevel(event, level) {
    var button = event.target;
    if (levelFilter.has(level)) {
        levelFilter.delete(level);
        if (button instanceof HTMLElement)
            button.classList.remove("button--selected");
    }
    else {
        levelFilter.add(level);
        if (button instanceof HTMLElement)
            button.classList.add("button--selected");
    }
    console.log(levelFilter);
}
(_a = document.getElementById("loadSpells")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    fetch('https://raw.githubusercontent.com/alterot/spellbook-ts/main/spells.json')
        .then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
        .then(function (spellData) {
        var spells = spellData;
        var filteredSpells = spells.filter(function (spell) {
            var classes = spell.class.split(', ');
            var level = parseInt(spell.level);
            return ((classFilter.size === 0 || classes.some(function (className) { return classFilter.has(className); })) &&
                (levelFilter.size === 0 || levelFilter.has(level)));
        });
        displaySpells(filteredSpells);
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
});
function displaySpells(spells) {
    var spellList = document.getElementById("spell-list");
    spellList.innerHTML = "";
    spells.forEach(function (spell) {
        var spellItem = document.createElement("div");
        spellItem.classList.add("spell");
        spellItem.innerHTML = "\n        <h3>".concat(spell.name, "</h3>\n        <p><strong>Classes:</strong> ").concat(spell.class, "</p>\n        <p><strong>Level:</strong> ").concat(spell.level, "</p>\n      ");
        spellList.appendChild(spellItem);
        spellItem.addEventListener("click", function () {
            var spellDetails = document.createElement("div");
            spellDetails.classList.add("spell__description");
            spellDetails.innerHTML = "\n          <h3>Description:</h3><p> ".concat(spell.desc, "</p>\n          <p><strong>Page:</strong> ").concat(spell.page, "</p>\n          <p><strong>Range:</strong> ").concat(spell.range, "</p>\n          <p><strong>Components:</strong> ").concat(spell.components, "</p>\n          <p><strong>Material:</strong> ").concat(spell.material, "</p>\n          <p><strong>Ritual:</strong> ").concat(spell.ritual, "</p>\n          <p><strong>Duration:</strong> ").concat(spell.duration, "</p>\n          <p><strong>Concentration:</strong> ").concat(spell.concentration, "</p>\n          <p><strong>Casting Time:</strong> ").concat(spell.casting_time, "</p>\n          <p><strong>School:</strong> ").concat(spell.school, "</p>\n          <button class=\"close-button\">Close</button>\n        ");
            document.body.appendChild(spellDetails);
            var spellContainer = document.getElementById("spell-container");
            spellContainer.classList.add("blur");
            var closeButton = spellDetails.querySelector(".close-button");
            closeButton.addEventListener("click", function () {
                spellDetails.remove();
                spellContainer.classList.remove("blur");
            });
        });
    });
}
