# ChatBot

*A lab report by Dan Witte*

## In this Report

To submit your lab, fork [this repository](https://github.com/FAR-Lab/IDD-Fa18-Lab6). You'll need to upload any code you change into your fork, as well as upload a video of a friend or classmate using your chatbot.

## Make the ChatBot your own

**Describe what changes you made to the baseline chatbot here. Don't forget to push your modified code to this repository.**

I've expanded the chat bot's capability by using an NPM package that integrates with the Wolfram Alpha API. To do so I made the main bot function asynchronous and wrote a separate asynchronous function to actually manage querying the API. If the response is not able to be parsed, the bot responds with an answer indicating uncertainty. The questions were also updated to reflect the new capabilities of the chat bot. 

One convenient finding was that because this application does not rely on any of the pi's unique capabilities, I could develop locally without connecting to the pi.

## Record someone trying out your ChatBot

**Using a phone or other video device, record someone trying out your ChatBot. Upload that video to this repository and link to it here!**

[Math bot in action!](https://photos.app.goo.gl/XHryG9toxQFySFTB6)

---
Starter code by [David Goedicke](mailto:da.goedicke@gmail.com), closely based on work by [Nikolas Martelaro](mailto:nmartelaro@gmail.com) and [Captain Anonymous](https://codepen.io/anon/pen/PEVYXz), who forked original work by [Ian Tairea](https://codepen.io/mrtairea/pen/yJapwv).
