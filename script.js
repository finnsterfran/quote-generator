const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//  Show new quote
const newQuote = () => {
    loading();
    // pick a random quote from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank, replace it 
    if (!quote.author) {
        authorText.textContent = "Unknown Source";
    } else {
        authorText.textContent = quote.author;
    }
    // check quote length to determine style
    if (quote.text.length > 60) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    complete();
    quoteText.textContent = quote.text;
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote(); 
    } catch (error) {
        alert(error);
    }
}

const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();

