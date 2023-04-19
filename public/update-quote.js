const submitButton = document.getElementById('update-quote');
const newQuoteContainer = document.getElementById('new-update-quote');

submitButton.addEventListener('click', () => {
  const updateId = document.getElementById('id-update').value;
  const quoteUpdate = document.getElementById('quote-update').value;
  const personUpdate = document.getElementById('person-update').value;

  fetch(`/api/quotes?id=${updateId}&quote=${quoteUpdate}&person=${personUpdate}`, {
    method: 'PUT',
  })
  .then(response => response.json())
  .then(({quote}) => {
    const newUpdateQuote = document.createElement('div');
    newUpdateQuote.innerHTML = `
    <h3>Congrats, your quote was updated!</h3>
    
    <div class="quote-text-update">${quote.quote}</div>
    <div class="attribution-update">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newQuoteContainer.appendChild(newUpdateQuote);
  });
});
