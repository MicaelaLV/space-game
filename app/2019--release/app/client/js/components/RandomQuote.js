import BaseComponent from './BaseComponent';


class RandomQuote extends BaseComponent {
  constructor(componentName){
    super(componentName);
    this.className = componentName;

  }

  init(component) {
    this.addCustomEvents(component);
  }

  addCustomEvents(component) {

    this.newQuote();
  }

  newQuote(){
    const quotes = [
      "Art calls for complete mastery of techniques, developed by reflection within the soul.",
      "The true artist has no public; he works for the sheer joy of it, with an element of playfulness, of casualness. Art reaches its greatest peak when devoid of self-consciousness. Freedom discovers man the moment he loses concern over what impression he is making or about to make.",
      "We are all more than our experiences. And less than our dreams",
      "I'm one that will cause people to scratch their heads in wonderment in search of their hollow hearts and look in their souls and wonder, Where did he come from? What is he?",
      "Another world is not only possible, she is on her way. On a quiet day, I can hear her breathing.",
      "Your true power…is to be part of all, and the only way you can be part of all is to understand it. And when there’s something you don’t understand, you have to go humbly to it…You absorb. But you have to be quiet, you have to be still to do all this.",
      "Dearly beloved We are gathered here today To get through this thing called ‘life’",
      "First winter rain even the monkey seems to want a raincoat.",
      "And I, infinitesimal being, drunk with the great starry void, likeness, image of mystery, I felt myself a pure part of the abyss, I wheeled with the stars, my heart broke loose on the wind."
    ];

    const authors = [
      "Bruce Lee",
      "Bruce Lee",
      "Nikki Giovanni, 'I am Glass'", 
      "Sun Ra", 
      "Arundhati Roy",
      "John Coltrane",
      "Prince",
      "Matsuo Bashō",
      "Pablo Neruda"
    ];

    // Get a Random Number 
    const randomNumber = Math.floor(Math.random() * quotes.length);

    // Write Random Quote + Author
    const quote = quotes[randomNumber];
    const author = " - " + authors[randomNumber];

    const quoteSpace = document.getElementsByClassName('quote')[0];
    const authorSpace = document.getElementsByClassName('author')[0];

    if (!!quoteSpace && !!authorSpace) {
      quoteSpace.innerHTML = quote;
      authorSpace.innerHTML = author;
    }

  }

}

export default RandomQuote;
