  participant browser
  participant server
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server->>browser: HTML document
  deactivate server
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server->> browser: the css file
  deactivate server
  
  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server ->> browser: the javaScript file
  deactivate server
  
      Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
  
  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server ->> browser: [{content: 'jep', date: '2023-01-24T13:02:29.563Z'}, ...]
  deactivate server
      Note right of browser: The browser executes the callback function that renders the notes 
      
  browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server ->> browser: GET /exampleapp/notes
    Note right of browser: The browser will send the user input to the server and reload Notes page
  deactivate server
  
   browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server->> browser: the css file
  deactivate server
  
  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server ->> browser: the javaScript file
  deactivate server
  
      Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
  
  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server ->> browser: [{newContent: 'something', date: '2023-01-24T14:02:29.563Z'}, ...]
  deactivate server
      Note right of browser: The browser executes the callback function that renders the notes 
