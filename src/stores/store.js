import { defineStore } from 'pinia';

export const mainStore = defineStore('mainStore', {
  state: () => {
    return {
      /* 
        Creation steps:
        0. Adding ingredients
        1. Ingredients in flask
        2. Flask in volcano
        3. Creation Collected
        4. Viewing Creations
      */

      // General
      creationStep: 0,
      ingredientMax: 2,
      ingredientCount: 0,

      // Mutable Arrays
      // these will change throughout lifecycle of gameplay
      ingredientList: [],
      flaskContents: [],
      volcanoContents: [],
      creationContents: [],
      creationsHoldingCell: [],
      creations: [],

      // Attributes
      foodMin: 10,
      foodMax: 100,
      foodTypes: [
        { name: 'egg', icon: 'egg', color: '#F0EAD6' },
        { name: 'carrot', icon: 'carrot', color: '#ED9121' },
        { name: 'lemon', icon: 'lemon', color: '#FAFA33' },
        { name: 'pepper', icon: 'pepper-hot', color: '#FF0000' },
        { name: 'bone', icon: 'bone', color: '#FFFFFF' },
        { name: 'apple', icon: 'apple-whole', color: '#FF0000' },
        { name: 'wheat', icon: 'wheat-awn', color: '#F5DEB3' },
        { name: 'bacon', icon: 'bacon', color: '#EE9486' },
        { name: 'person', icon: 'person', color: '#FFFF00' },
      ],
      foodMeasurement: ['grams', 'kilograms', 'ounces', 'pounds', 'tons'],
      timeIntervals: ['hourly', 'daily', 'weekly', 'monthly', 'yearly', 'once-in-a-blue-moon', 'every century', 'every millenia'],
      activityLevels: [
        { name: 'Comatose', icon: 'battery-empty', color: '#DB504A' },
        { name: 'Lazy', icon: 'battery-quarter', color: '#ED7D3A' },
        { name: 'Moderate', icon: 'battery-half', color: '#F8E16C' },
        { name: 'Active', icon: 'battery-three-quarters', color: '#26C485' },
        { name: 'iamspeed', icon: 'battery-full', color: '#540D6E' },
      ],
      sleepCycles: [
        { name: 'Night', icon: 'moon', color: '#fffff' },
        { name: 'Day', icon: 'sun', color: '#F8E16C' },
      ],
      healthMin: 10,
      healthMax: 10000000,
      staminaMin: -100,
      staminaMax: 1000,
      dexterityMin: -100,
      dexterityMax: 1000,
      rarities: [
        { name: 'Common', color: '#ffffff' },
        { name: 'Rare', color: '#56EEF4' },
        { name: 'Epic', color: '#52489C' },
        { name: 'Legendary', color: '#F8E16C' },
        { name: 'Mythic', color: '#DB504A' },
      ],
      genders: [
        { name: 'male', icon: 'mars', color: '#56EEF4' },
        { name: 'female', icon: 'venus', color: '#ff00ff' },
      ],
    };
  },
  getters: {
    remainingIngredients: (state) => state.ingredientMax - state.ingredientCount,
    latestCreation: (state) => state.creations[state.creations.length - 1],
  },
  actions: {
    // Reset Creation Process back to step 0
    // Clears all mutable arrays
    completeCreation() {
      this.creationStep = 0;
      this.ingredientCount = 0;
      this.ingredientList = [];
      this.flaskContents = [];
      this.volcanoContents = [];
      this.creationContents = [];
      this.creationsHoldingCell = [];
    },
    // Called when a user checks the box of an ingredient during creationStep=0
    addIngredient(name, icon) {
      if (this.ingredientCount >= this.ingredientMax) return; // ensure we never go above the max

      // check if ingredient is already added (somehow)
      const exists = this.ingredientList.some((item) => item.name === name);
      if (!exists) {
        this.ingredientList.push({ name, icon });
        this.ingredientCount++;

        // If we have 2 ingredients now, move on to creationStep=1
        if (this.ingredientCount == 2) this.creationStep = 1;
      }
    },
    // Called when a user unchecks a box of an ingredient during creationStep=0
    removeIngredient(name) {
      if (this.ingredientCount === 0) return; // ensure we never go below 0

      // Find the index of the ingredient by parameter name in our ingredientList (mutable) array
      const index = this.ingredientList.findIndex((item) => item.name === name);

      // If index is not -1, then the ingredient exists in ingredientList
      if (index !== -1) {
        // Go ahead and remove it
        this.ingredientList.splice(index, 1);
        this.ingredientCount--;

        // Ensure we're at creationStep=0
        this.creationStep = 0;
      }
    },
    // Called when a user clicks "Add to Flask" button
    // creationStep=1 when this is called (or at least it should!)
    addToFlask() {
      if (this.ingredientList.length != 2) return; // prevent add to flask if there are not 2 ingredients in the list

      // copy ingredientList array to flaskContents array
      // array will contain (hopefully) 2x ingredient objects
      this.flaskContents = this.ingredientList;

      // Move on to creationStep=2
      this.creationStep = 2;
    },
    // Called when a user clicks "Toss Flask" button
    // creationStep=2 when this is called
    tossFlask() {
      if (this.flaskContents.length != 2) return; // prevent tossing flask if there are not 2 ingredients in flask

      // copy flaskContents array to volcanoContents array
      this.volcanoContents = this.flaskContents;

      // empty flaskContents array now that the contents are in the volcano
      this.flaskContents = [];

      // Move on to creationStep=3
      this.creationStep = 3;
    },
    // Called when a user clicks "Complete" button
    // creationStep=3 when this is called
    collectCreation() {
      if (this.volcanoContents.length != 2) return;

      // Copy volcanoContents array to creationContents arrray
      this.creationContents = this.volcanoContents;

      // empty volcanoContents array, we do not need it at this point
      this.volcanoContents = [];

      // Call addCreation to build our combined creation
      this.addCreation();

      // Move on to creationStep=4
      this.creationStep = 4;
    },
    // Called from collectCreation() function which is a result of the user clicking the "Complete" button
    addCreation() {
      const creation = {};
      creation.icon1 = this.creationContents[0].icon;
      creation.icon2 = this.creationContents[1].icon;
      creation.ingredient1 = this.creationContents[0].name;
      creation.ingredient2 = this.creationContents[1].name;

      // Push our combined creation to the 'holding cell' where it will await attribute assignment
      this.creationsHoldingCell.push(creation);

      // Assign attributes to our combined creation
      this.generateCreationAttributes();
    },
    // Called from addCreation()
    generateCreationAttributes() {
      // Start by generating necessary stats

      // Food
      const foodType = this.getRandomNumberInclusive(0, this.foodTypes.length - 1);
      const foodQty = this.getRandomNumberInclusive(this.foodMin, this.foodMax);
      const foodMeasurement = this.getRandomNumberInclusive(0, this.foodMeasurement.length - 1);
      const foodInterval = this.getRandomNumberInclusive(0, this.timeIntervals.length - 1);

      // Activity
      const activityLevel = this.getRandomNumberInclusive(0, this.activityLevels.length - 1);
      const sleepCycle = this.getRandomNumberInclusive(0, this.sleepCycles.length - 1);

      // Stats
      const health = this.getRandomNumberInclusive(this.healthMin, this.healthMax);
      const stamina = this.getRandomNumberInclusive(this.staminaMin, this.staminaMax);
      const dexterity = this.getRandomNumberInclusive(this.dexterityMin, this.dexterityMax);

      // Other
      const rarity = this.getRandomNumberInclusive(0, this.rarities.length - 1);
      const gender = this.getRandomNumberInclusive(0, this.genders.length - 1);

      // Now lets make our creature
      const creationFromCreations = this.creationsHoldingCell[this.creationsHoldingCell.length - 1];
      const creation = {};

      // Base attributes
      creation.name = this.getComboName(creationFromCreations.ingredient1, creationFromCreations.ingredient2);
      creation.icon1 = creationFromCreations.icon1;
      creation.icon2 = creationFromCreations.icon2;
      creation.ingredient1 = creationFromCreations.ingredient1;
      creation.ingredient2 = creationFromCreations.ingredient2;
      creation.food = this.foodTypes[foodType];
      creation.foodQty = foodQty;
      creation.foodMeasurement = this.foodMeasurement[foodMeasurement];
      creation.foodInterval = this.timeIntervals[foodInterval];
      creation.activityLevel = this.activityLevels[activityLevel];
      creation.sleepCycle = this.sleepCycles[sleepCycle];
      creation.health = health;
      creation.stamina = stamina;
      creation.dexterity = dexterity;
      creation.rarity = this.rarities[rarity];
      creation.gender = this.genders[gender];
      creation.viewInfo = false;

      // Push our FULLY completed creation to our creations array
      this.creations.push(creation);

      // Empty out the creationsHoldingCell. Time has been served. Fly free, little birdspider.
      this.creationsHoldingCell = [];
    },
    // Called when a user clicks the "Info" button on a Creation card
    viewInfo(index) {
      this.creations[index].viewInfo = true;
    },
    // Called when a user clicks the "What a fine specimen" button from the view creation info panel
    unviewInfo(index) {
      this.creations[index].viewInfo = false;
    },
    // Called when a user clicks the "OMG! Throw it back!" button from the view creation info panel
    throwItBack(index) {
      // Validate that we're within bounds
      if (index <= -1 || index >= this.creations.length) return;

      // Automatically complete active creation if necessary
      this.completeCreation();

      // Ensure we are no longer viewing the info of the creature we are deleting
      this.creations[index].viewInfo = false;

      // Remove the creature from the creations array, and shift array to remove spaces in indexing
      this.creations.splice(index, 1);
    },
    // Helper function to get random number between 2 values.
    getRandomNumberInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // Helper function to generate creature combination name
    getComboName(str1, str2) {
      // Get the length of the first half of the first string
      let mid1 = Math.ceil(str1.length / 2);

      // and the length of the second half of the 2nd string
      let mid2 = Math.floor(str2.length / 2);

      // Now create our substrings of correct length
      let half1 = str1.substring(0, mid1);
      let half2 = str2.substring(mid2);

      // Combine them, lowercase the second, remove any extra spaces
      return (half1 + half2.toLowerCase()).replace(' ', '');
    },
  },
});
