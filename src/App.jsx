import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null);
  const [color, setColor] = useState('#333');

  async function loadQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
      
      
    } catch (error) {
      console.error(error);
      setData({ content: "Sorry, something went wrong. Try again in a minute",
                author: "-The man at the computer"
               });
    }
      const colors = ['#2f8b78','#2ec66d','#314f6c','#b67711','#d76a5e','#7f3c9a','#c14642','#6f4b4f','#4b0b16','#aca974','#4e8a82','#5fa13b'];
      let color = colors[Math.floor(Math.random() * colors.length)]
      document.querySelector(' body').style.backgroundColor = color;
      setColor(color)
  }
  

  useEffect(() => {
    loadQuote();
  }, []);

  if(!data) return null;
  
  
  return (
    <div id="quote-box" className="quote-block">
            <div id="text" style={{color: color}}>{'"' + data.content + '"'}</div>
            <div id="author" style={{color: color}}>{'- ' + data.author}</div>
            <div id="buttons">
                <a id="tweet-quote" href={'https://twitter.com/intent/tweet?hashtags=quotes&text="' + data.content +  '" - ' + data.author} style={{backgroundColor: color}}><div className="tweet-button"></div></a>
                <button id="new-quote" onClick={loadQuote} style={{backgroundColor: color}}>New quote</button>
            </div>
        </div>
  );
}

export default App;