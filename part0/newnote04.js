sequenceDiagram
  participant browser
  participant server
  
  browser->>server: GET https://something
  activate server
  server-->>browser: HTML document
  deactivate server
